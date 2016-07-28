import WebAudioModule from 'synth/webAudioModule';

@WebAudioModule
export default class VCA {
  constructor(audioCtx) {
    this.gain = audioCtx.createGain();

    // set initial gain value
    this.gain.gain.value = 0;

    // set WebAudioModule requirements
    this.input = this.gain;
    this.output = this.gain;

    // make amplitude parameter available for connection
    this.amplitude = this.gain.gain;
  }
}