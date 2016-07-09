import { combineReducers } from 'redux';

import instrumentState from './instrumentState';
import masterVolume from './masterVolume';
import basicVariation from './basicVariation';

export default function(state, action) {
  switch (action.type) {
    default:
      return combineReducers({
        instrumentState,
        masterVolume,
        basicVariation
      })(state, action);
  }
}