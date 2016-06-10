import { createStore } from 'redux';

import { BASS_DRUM, SNARE_DRUM, LOW_CONGA_LOW_TOM, MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM, CLAVES_RIMSHOT, MARACAS_HANDCLAP, COWBELL, CYMBAL,
  OPEN_HIHAT, CLSD_HIHAT } from './constants';
import reducer from './reducer';

function emptyLaneFactory() {
  return Array.apply(null, Array(16)).map(() => false);
}

function sequencerLanesInit() {
  return [
    BASS_DRUM,
    SNARE_DRUM,
    LOW_CONGA_LOW_TOM,
    MID_CONGA_MID_TOM,
    HI_CONGA_HI_TOM,
    CLAVES_RIMSHOT,
    MARACAS_HANDCLAP,
    COWBELL,
    CYMBAL,
    OPEN_HIHAT,
    CLSD_HIHAT
  ].reduce((prev, moduleName) => {
    prev[moduleName] = emptyLaneFactory();
    return prev;
  }, {});
}

let initialState = {
  currentTick: -1,
  playing: false,
  tempo: 120,
  lanes: sequencerLanesInit()
};

const store = createStore(reducer, initialState,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default store;
