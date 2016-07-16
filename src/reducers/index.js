import { combineReducers } from 'redux';

import instrumentState from './instrumentState';
import masterVolume from './masterVolume';
import basicVariation from './basicVariation';
import IFVariation from './IFVariation';
import preScaleSwitch from './preScaleSwitch';
import autoFillIn from './autoFillIn';
import mode from './mode';
import instrument_track from './instrument_track';
import tempo from './tempo';
import fineTempo from './fineTempo';

export default function(state, action) {
  switch (action.type) {
    default:
      return combineReducers({
        instrumentState,
        masterVolume,
        basicVariation,
        IFVariation,
        preScaleSwitch,
        autoFillIn,
        mode,
        instrument_track,
        tempo,
        fineTempo
      })(state, action);
  }
}