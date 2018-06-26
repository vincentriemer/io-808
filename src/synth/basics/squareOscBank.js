import WebAudioModule from "synth/webAudioModule";
import VCO, { SQUARE } from "synth/basics/vco";
import VCA from "synth/basics/vca";

const OSC_FREQUENCIES = [263, 400, 421, 474, 587, 845];
const OSC_AMPLITUDE = 0.3;

const DEFAULT_OSC_CONFIG = [true, true, true, true, true, true];

class SquareOSCBank {
  constructor(audioCtx, oscConfig = DEFAULT_OSC_CONFIG) {
    this.output = new VCA(audioCtx);
    this.output.amplitude.value = 1;

    this.oscBank = OSC_FREQUENCIES.map((freq, index) => {
      if (oscConfig[index]) {
        const osc = new VCO(SQUARE, audioCtx);
        osc.frequency.value = freq;

        const vca = new VCA(audioCtx);
        vca.amplitude.value = OSC_AMPLITUDE;

        osc.connect(vca);
        vca.connect(this.output);

        return { osc, vca };
      } else {
        return null;
      }
    }).filter(x => !!x);
  }

  start(time) {
    this.oscBank.forEach(({ osc }) => {
      osc.start(time);
    });
  }

  stop() {
    this.oscBank.forEach(({ osc }) => {
      osc.stop();
    });
  }
}

export default WebAudioModule(SquareOSCBank);
