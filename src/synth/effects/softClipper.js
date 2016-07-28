// inspired by https://github.com/nick-thompson/neuro/blob/master/lib/effects/WaveShaper.js
import WebAudioModule from 'synth/webAudioModule';

import VCA from 'synth/basics/vca';

const softClippingCurve = (() => {
  const n = 65536;
  const curve = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const x = (i - (n / 2)) / (n / 2);
    curve[i] = Math.tanh(x);
  }

  return curve;
})();

@WebAudioModule
export default class SoftClipper {
  constructor (drive, audioCtx) {
    this.gain = new VCA(audioCtx);
    this.gain.amplitude.value = drive;

    this.waveshaper = audioCtx.createWaveShaper();
    this.waveshaper.curve = softClippingCurve;
    this.waveshaper.oversample = '2x';

    this.gain.connect(this.waveshaper);

    this.input = this.gain.gain;
    this.output = this.waveshaper;
  }
}
