import VCO, { SINE } from 'synth/basics/vco';
import VCF, { LOWPASS } from 'synth/basics/vcf';
import VCA from 'synth/basics/vca';
import ADGenerator, { EXPONENTIAL, LINEAR } from 'synth/basics/ADGenerator';
import PulseTrigger from 'synth/basics/pulseTrigger';
import SoftClipper from 'synth/effects/softClipper';
import {equalPower} from 'helpers';

const FREQ_AMT = 50;
const START_FREQ = 48;

export default function (audioCtx, destination, time, {level, tone, decay}) {
  // parameters
  const outputLevel = equalPower(level);
  const vcfFreq = 200 + tone * 20;
  const decayTime = decay * 5 + 50;

  // audio modules
  const vco = new VCO(SINE, audioCtx);
  vco.frequency.value = START_FREQ;

  const vcf = new VCF(LOWPASS, audioCtx);
  vcf.frequency.value = vcfFreq;
  vcf.Q.value = 1;

  const click = new PulseTrigger(audioCtx);

  const vca = new VCA(audioCtx);
  vca.amplitude.value = 0;

  const outputVCA = new VCA(audioCtx);
  outputVCA.amplitude.value = outputLevel + 0.4;

  const softClipper = new SoftClipper(0.6, audioCtx);

  // envelopes
  const oscEnv = new ADGenerator(EXPONENTIAL, 0, decayTime, START_FREQ, FREQ_AMT);
  const ampEnv = new ADGenerator(LINEAR, 2, decayTime, 0.0, 1.0);

  // module routing
  vco.connect(vca);
  click.connect(vca);
  vca.connect(vcf);
  vcf.connect(softClipper);
  softClipper.connect(outputVCA);

  // envelope routing
  oscEnv.connect(vco.frequency);
  ampEnv.connect(vca.amplitude);

  // output routing
  outputVCA.connect(destination);

  // envelope/oscillator triggering
  vco.start(time);
  ampEnv.trigger(time);
  oscEnv.trigger(time);
  click.trigger(time, audioCtx);

  // cleanup
  window.setTimeout(() => {
    vco.oscillator.stop();
    vcf.disconnect();
  }, (time - audioCtx.currentTime) + 1000);

  return outputVCA;
}