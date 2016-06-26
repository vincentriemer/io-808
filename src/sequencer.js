import { createStore } from 'redux';

import { ACCENT, BASS_DRUM, SNARE_DRUM, LOW_CONGA_LOW_TOM, MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM, CLAVES_RIMSHOT, MARACAS_HANDCLAP, COWBELL, CYMBAL,
  OPEN_HIHAT, CLSD_HIHAT } from './constants';
import reducer from './reducer';

function emptyLaneFactory() {
  return Array.apply(null, Array(16)).map(() => false);
}

let initialState = {
  currentTick: -1,
  playing: false,
  tempo: 120,
  instrumentState: {
    [ACCENT]: {
      level: 100
    },
    [BASS_DRUM]: {
      level: 100,
      tone: 50,
      decay: 50
    },
    [SNARE_DRUM]: {
      level: 100,
      tone: 50,
      snappy: 50
    },
    [LOW_CONGA_LOW_TOM]: {
      level: 100,
      tuning: 50,
      switch: 1
    },
    [MID_CONGA_MID_TOM]: {
      level: 100,
      tuning: 50,
      switch: 1
    },
    [HI_CONGA_HI_TOM]: {
      level: 100,
      tuning: 50,
      switch: 1
    },
    [CLAVES_RIMSHOT]: {
      level: 100,
      switch: 1
    },
    [MARACAS_HANDCLAP]: {
      level: 100,
      switch: 1
    },
    [COWBELL]: {
      level: 100
    },
    [CYMBAL]: {
      level: 100,
      tone: 50,
      decay: 50
    },
    [OPEN_HIHAT]: {
      level: 100,
      decay: 50
    },
    [CLSD_HIHAT]: {
      level: 100
    }
  }
};

const store = createStore(reducer, initialState
  , window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default store;
