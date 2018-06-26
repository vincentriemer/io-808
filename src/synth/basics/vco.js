import WebAudioModule from "synth/webAudioModule";

// oscillator types
export const SINE = "sine";
export const SQUARE = "square";
export const SAW = "sawtooth";
export const TRIANGLE = "triangle";
export const WHITE_NOISE = "whitenoise";
export const PINK_NOISE = "pinknoise";

// Adapted from https://developer.tizen.org/documentation/articles/advanced-web-audio-api-usage
function createWhiteNoiseOsc(audioCtx) {
  // Create noise buffer information
  const buffer = audioCtx.createBuffer(1, 44100, 44100);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() - 0.5) * 2;
  }
  // Create source node
  const source = audioCtx.createBufferSource();
  source.loop = true;
  source.buffer = buffer;

  return source;
}

// create a pink noise buffer using Paul Kellet's refined method
function createPinkNoiseOsc(audioCtx) {
  let b0, b1, b2, b3, b4, b5, b6;
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
  const buffer = audioCtx.createBuffer(1, 44100, 44100);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11;
    b6 = white * 0.115926;
  }
  // create source node using pink noise buffer
  const source = audioCtx.createBufferSource();
  source.loop = true;
  source.buffer = buffer;
  return source;
}

class VCO {
  constructor(type, audioCtx) {
    this.type = type;

    switch (type) {
      case WHITE_NOISE:
        this.oscillator = createWhiteNoiseOsc(audioCtx);
        break;
      case PINK_NOISE:
        this.oscillator = createPinkNoiseOsc(audioCtx);
        break;
      case SINE:
      case SQUARE:
      case SAW:
      case TRIANGLE:
        this.oscillator = audioCtx.createOscillator();
        this.oscillator.type = type;
        this.oscillator.frequency.value = 440;
        break;
      default:
        throw new Error(`Invalid oscillator type provided: ${type}`);
    }

    // make parameters available for automation
    this.frequency = this.oscillator.frequency;

    // WebAudioModule hooks
    this.output = this.oscillator;
  }

  start(time) {
    this.oscillator.start(time);
  }

  stop() {
    this.oscillator.stop();
  }
}

export default WebAudioModule(VCO);
