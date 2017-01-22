/**
 * @flow
 * Created by vincentriemer on 1/21/17.
 */

import WebAudioModule from 'synth/webAudioModule';

@WebAudioModule
export default class Sampler {
  constructor (audioCtx, buffer) {
    this.bufferSource = audioCtx.createBufferSource();
    this.bufferSource.buffer = buffer;

    // set WebAudioModule requirements
    this.output = this.bufferSource;
  }

  start (time) {
    this.bufferSource.start(time);
  }
}