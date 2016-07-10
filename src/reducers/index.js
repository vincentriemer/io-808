import { combineReducers } from 'redux';

import instrumentState from './instrumentState';
import masterVolume from './masterVolume';
import basicVariation from './basicVariation';
import IFVariation from './IFVariation';
import preScaleSwitch from './preScaleSwitch';

export default function(state, action) {
  switch (action.type) {
    default:
      return combineReducers({
        instrumentState,
        masterVolume,
        basicVariation,
        IFVariation,
        preScaleSwitch
      })(state, action);
  }
}