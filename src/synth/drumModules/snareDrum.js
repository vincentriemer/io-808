import VCO, { SINE, WHITE_NOISE } from 'synth/basics/vco';
import VCF, { HIGHPASS } from 'synth/basics/vcf';
import VCA from 'synth/basics/vca';
import ADGenerator, { LINEAR, EXPONENTIAL } from 'synth/basics/ADGenerator';
import {equalPower} from 'helpers';
var highOscFreq = 478;
var lowOscFreq = 238;
export default function (audioCtx, destination, time, { level, tone, snappy }) {
  tone = tone == 0 ? 1 : tone;
  // parameters
  const outputLevel = equalPower(level);
  const noiseVCFFreq = 300;
  const snappyEnvAmt = snappy / 10;
  var oscVCFFreq = (function(){
      var freq = 20;
      freq = freq * tone 
      return freq;
    })();
  // audio modules
  const highOsc = new VCO(SINE, audioCtx);
  highOsc.frequency.value = highOscFreq;

  const lowOsc = new VCO(SINE, audioCtx);
  lowOsc.frequency.value = lowOscFreq;

  const noiseOsc = new VCO(WHITE_NOISE, audioCtx);

  const noiseVCF = new VCF(HIGHPASS, audioCtx);
  noiseVCF.frequency.value = noiseVCFFreq;
  
  const oscVCF = new VCF(HIGHPASS, audioCtx);
  oscVCF.frequency.value = oscVCFFreq;

  const oscVCA = new VCA(audioCtx);
  const noiseVCA = new VCA(audioCtx);

  const outputVCA = new VCA(audioCtx);
  outputVCA.amplitude.value = outputLevel;

  // envelopes
  const noiseEnv = new ADGenerator(EXPONENTIAL, 0.1, 100, 0, snappyEnvAmt*.5);
  const snappyEnv = new ADGenerator(EXPONENTIAL, 0.1, 80, 0, tone);

  // module routing
  highOsc.connect(oscVCA);
  lowOsc.connect(oscVCA);
  oscVCA.connect(outputVCA);
  oscVCF.connect(oscVCF);
  noiseOsc.connect(noiseVCF);
  noiseVCF.connect(noiseVCA);
  noiseVCA.connect(outputVCA);

  // modulation routing
  noiseEnv.connect(noiseVCA.amplitude);
  snappyEnv.connect(oscVCA.amplitude);

  // output routing
  outputVCA.connect(destination);

  // envelope/oscillator triggering
  highOsc.start(time);
  lowOsc.start(time);
  noiseOsc.start(time);
  noiseEnv.trigger(time);
  snappyEnv.trigger(time);

  // cleanup
  window.setTimeout(() => {
    highOsc.stop();
    lowOsc.stop();
    outputVCA.disconnect();
  }, (time - audioCtx.currentTime) + 1000);

  return outputVCA;
}
