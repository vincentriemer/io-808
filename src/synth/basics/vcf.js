import WebAudioModule from 'synth/webAudioModule';

// filter types
export const LOWPASS = 'lowpass';
export const HIGHPASS = 'highpass';
export const BANDPASS = 'bandpass';

@WebAudioModule
export default class VCF {
  constructor(type, audioCtx) {
    this.filter = audioCtx.createBiquadFilter();

    // set vcf default values
    this.filter.frequency.value = 400;
    this.filter.Q.value = 1;

    // set vcf type given to constructor
    this.filter.type = type;

    // set WebAudioModule requirements
    this.input = this.filter;
    this.output = this.filter;

    // make paramters available for connection
    this.frequency = this.filter.frequency;
    this.Q = this.filter.Q;
  }
}