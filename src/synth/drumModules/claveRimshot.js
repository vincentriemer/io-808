import VCO, { TRIANGLE, SINE } from "synth/basics/vco";
import VCF, { BANDPASS, HIGHPASS } from "synth/basics/vcf";
import VCA from "synth/basics/vca";
import SwingVCA from "synth/basics/swingVCA";
import ADGenerator, { EXPONENTIAL, LINEAR } from "synth/basics/ADGenerator";

import { equalPower } from "helpers";

const RIM_CLAVE_FREQ = 1750;
const CLAVE_FREQ = 2450;
const RIM_FREQ = 480;

export default function(audioCtx, destination, time, { level, selector }) {
  // parameters
  const outputLevel = equalPower(level);

  const outputVCA = new VCA(audioCtx);
  outputVCA.amplitude.value = outputLevel;

  // rimshot modules
  const rimOsc = new VCO(SINE, audioCtx);
  rimOsc.frequency.value = RIM_FREQ;

  const rimBandFilter = new VCF(BANDPASS, audioCtx);
  rimBandFilter.frequency.value = RIM_FREQ;

  const rimHighFilter = new VCF(HIGHPASS, audioCtx);
  rimHighFilter.frequency.value = RIM_FREQ;

  const swingVCA = new SwingVCA(audioCtx);
  const swingEnv = new ADGenerator(LINEAR, 0.11, 10, 0, 1.7);

  // clave modules
  const claveOsc = new VCO(TRIANGLE, audioCtx);
  let claveFilter = null;
  // 0 = clave, 1 = rimshot
  if (selector === 0) {
    claveOsc.frequency.value = CLAVE_FREQ;
    claveFilter = new VCF(BANDPASS, audioCtx);
  } else {
    claveOsc.frequency.value = RIM_CLAVE_FREQ;
    claveFilter = new VCF(HIGHPASS, audioCtx);
  }
  claveFilter.frequency.value = CLAVE_FREQ;

  const claveVCA = new VCA(audioCtx);
  const claveEnv = new ADGenerator(EXPONENTIAL, 0.11, 40, 0, 0.7);

  // audio routing
  rimOsc.connect(rimBandFilter);
  rimBandFilter.connect(swingVCA);

  claveOsc.connect(claveFilter);
  claveFilter.connect(claveVCA);
  claveVCA.connect(swingVCA);

  swingVCA.connect(rimHighFilter);

  // 0 = clave, 1 = rimshot
  if (selector === 0) {
    claveVCA.connect(outputVCA);
  } else {
    rimHighFilter.connect(outputVCA);
  }

  // modulation routing
  swingEnv.connect(swingVCA.amplitude);
  claveEnv.connect(claveVCA.amplitude);

  // output routing
  outputVCA.connect(destination);

  // triggering
  claveOsc.start(time);
  rimOsc.start(time);
  claveEnv.trigger(time);
  swingEnv.trigger(time);

  // cleanup
  window.setTimeout(() => {
    claveOsc.stop();
    outputVCA.disconnect();
  }, time - audioCtx.currentTime + 1000);

  return outputVCA;
}
