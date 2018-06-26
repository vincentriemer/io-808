import React from "react";

import WAAClock from "waaclock";

let audioCtx = undefined;
let clock = undefined;

const { Provider, Consumer } = React.createContext({
  getAudioContext: () => audioCtx,
  getClock: () => clock,
  requestInit: () => {
    if (audioCtx == null || clock == null) {
      // Fix up for prefixing
      const AudioContext = window.AudioContext || window.webkitAudioContext;

      audioCtx = new AudioContext();
      clock = new WAAClock(audioCtx, { toleranceEarly: 0.09 });
    }
  },
});

export default { Provider, Consumer };
