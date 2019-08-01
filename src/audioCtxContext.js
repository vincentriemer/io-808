import React from "react";

import WAAClock from "waaclock";

let audioCtx = undefined;
let clock = undefined;

function triggerSilentAudio(audioCtx) {
  const buffer = audioCtx.createBuffer(1, 1, 22050);
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);

  if (source.start) {
    source.start(0);
  } else if (source.play) {
    source.play(0);
  } else if (source.noteOn) {
    source.noteOn(0);
  }
}

const AudioCtxContext = React.createContext({
  getAudioContext: () => audioCtx,
  getClock: () => clock,
  requestInit: () => {
    if (audioCtx == null || clock == null) {
      // Fix up for prefixing
      const AudioContext = window.AudioContext || window.webkitAudioContext;

      audioCtx = new AudioContext();
      triggerSilentAudio(audioCtx);

      clock = new WAAClock(audioCtx, { toleranceEarly: 0.09 });
    }
  }
});

export default AudioCtxContext;
