/**
 * @flow
 * Created by vincentriemer on 1/21/17.
 */

import Sampler from 'synth/basics/sampler';
import VCA from 'synth/basics/vca';
import {equalPower} from 'helpers';

// import bdSampleURL from './samples/BD/BD5050.WAV';

export default function (audioCtx, destination, time, buffer, {level}) {
  // parameters
  const outputLevel = equalPower(level);

  // audio modules
  const sampler = new Sampler(audioCtx, buffer);

  const outputVCA = new VCA(audioCtx);
  outputVCA.amplitude.value = outputLevel;

  // module routing
  sampler.connect(outputVCA);

  // output routing
  outputVCA.connect(destination);

  // triggering
  sampler.start(time);

  // cleanup
  window.setTimeout(() => {
    outputVCA.disconnect();
  }, (time - audioCtx.currentTime) + 1000);

  return outputVCA;
}

