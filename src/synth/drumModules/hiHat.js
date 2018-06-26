import SquareOscBank from "synth/basics/squareOscBank";
import VCF, { BANDPASS, HIGHPASS } from "synth/basics/vcf";
import VCA from "synth/basics/vca";
import ADGenerator, { LINEAR } from "synth/basics/ADGenerator";

const MID_FILTER_FREQ = 10000;
const HIGH_FILTER_FREQ = 8000;

export default function(audioCtx, destination, time, outputLevel, decay) {
  // audio modules
  const oscBank = new SquareOscBank(audioCtx);

  const midFilter = new VCF(BANDPASS, audioCtx);
  midFilter.frequency.value = MID_FILTER_FREQ;

  const highFilter = new VCF(HIGHPASS, audioCtx);
  highFilter.frequency.value = HIGH_FILTER_FREQ;

  const outputVCA = new VCA(audioCtx);
  outputVCA.amplitude.value = outputLevel;

  const modVCA = new VCA(audioCtx);

  // modulators
  const env = new ADGenerator(LINEAR, 0.1, decay, 0, 1);

  // audio routing
  oscBank.connect(midFilter);
  midFilter.connect(modVCA);
  modVCA.connect(highFilter);
  highFilter.connect(outputVCA);

  // modulation routing
  env.connect(modVCA.amplitude);

  // output routing
  outputVCA.connect(destination);

  // envelope/oscillator triggering
  oscBank.start(time);
  env.trigger(time);

  // cleanup
  window.setTimeout(() => {
    oscBank.stop();
    outputVCA.disconnect();
  }, time - audioCtx.currentTime + 1000);

  return outputVCA;
}
