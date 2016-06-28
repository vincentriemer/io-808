import { combineReducers } from 'redux';

import instrumentState from './instrumentState';
import masterVolume from './masterVolume';

export default function(state, action) {
  switch (action.type) {
    default:
      return combineReducers({
        instrumentState,
        masterVolume
      })(state, action);
  }
}