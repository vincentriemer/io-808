import WebAudioModule from "synth/webAudioModule";

import VCA from "synth/basics/vca";

import SoftClipper from "synth/effects/softClipper";
import HalfWaveRectifier from "synth/effects/halfWaveRectifier";

class SwingVCA {
  constructor(audioCtx) {
    this.rectifier = new HalfWaveRectifier(audioCtx);
    this.clipper = new SoftClipper(3, audioCtx);
    this.vca = new VCA(audioCtx);

    this.rectifier.connect(this.clipper);
    this.clipper.connect(this.vca);

    this.amplitude = this.vca.amplitude;

    this.input = this.rectifier.input;
    this.output = this.vca.output;
  }
}

export default WebAudioModule(SwingVCA);
