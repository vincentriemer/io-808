// curve taken from http://stackoverflow.com/a/16887640/3105183
import WebAudioModule from 'synth/webAudioModule';

const WS_CURVE = (() => {
  const curve = new Float32Array(65536);
  for (let i=0; i<32768; i++)
    curve[i] = 0.0;
  for (let i=32768; i<65536; i++)
    curve[i] = (i/32768) - 1;
  return curve;
})();

@WebAudioModule
export default class HalfWaveRectifier {
  constructor (audioCtx) {
    this.waveshaper = audioCtx.createWaveShaper();
    this.waveshaper.curve = WS_CURVE;

    this.input = this.waveshaper;
    this.output = this.waveshaper;
  }
}

