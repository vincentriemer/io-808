import WebAudioModule from "synth/webAudioModule";

class Limiter {
  constructor(audioCtx) {
    this.limiter = audioCtx.createDynamicsCompressor();
    this.limiter.threshold.value = 0.0;
    this.limiter.knee.value = 0.0;
    this.limiter.ratio.value = 20.0;
    this.limiter.attack.value = 0.005;
    this.limiter.release.value = 0.005;

    this.input = this.limiter;
    this.output = this.limiter;
  }
}

export default WebAudioModule(Limiter);
