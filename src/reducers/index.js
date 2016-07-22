import {
  INSTRUMENT_CHANGE,
  MASTER_VOLUME_CHANGE,
  BASIC_VARIATION_CHANGE,
  IF_VARIATION_CHANGE,
  AUTO_FILL_IN_CHANGE,
  FINE_TEMPO_CHANGE,
  INSTRUMENT_TRACK_CHANGE,
  MODE_CHANGE,
  TEMPO_CHANGE,
  TAP_BUTTON_CLICK,
  STEP_BUTTON_CLICK,
  START_STOP_BUTTON_CLICK,
  TICK,
  BLINK_TICK,
  CLEAR_DOWN,
  CLEAR_UP
} from 'actionTypes';

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART, MODE_SECOND_PART,
  MODE_TO_PART_MAPPING,
  FIRST_PART, SECOND_PART,
  A_VARIATION, B_VARIATION
} from 'constants';

import stepClickReducer from 'reducers/stepClick';
import clearReducer from 'reducers/clear';

export default function(state, { type, payload }) {
  switch(type) {
    case INSTRUMENT_CHANGE:
      const {type: instrumentType, controlName, value} = payload;
      return state.setIn(['instrumentState', instrumentType, controlName], value);

    case STEP_BUTTON_CLICK:
      return stepClickReducer(state, payload);

    case START_STOP_BUTTON_CLICK:
      if (state.selectedMode === MODE_PATTERN_CLEAR) {
        // start/stop button doesn't do anything if in `pattern clear` mode
        return state;
      } else {
        let newState = state;
        if (!state.playing)
          newState = newState.set('currentStep', -1);
        return newState.set('playing', !state.playing);
      }
    case MASTER_VOLUME_CHANGE:
      return state.set('masterVolume', payload);

    case BASIC_VARIATION_CHANGE:
      return state.set('basicVariationPosition', payload);

    case IF_VARIATION_CHANGE:
      return state.set('introFillVariationPosition', payload);

    case TEMPO_CHANGE:
      return state.set('tempo', payload);

    case FINE_TEMPO_CHANGE:
      return state.set('fineTempo', payload);

    case AUTO_FILL_IN_CHANGE:
      return state.set('autoFillInPosition', payload);

    case INSTRUMENT_TRACK_CHANGE:
      return state.set('selectedInstrumentTrack', payload);

    case MODE_CHANGE:
      return state.merge({
        selectedMode: payload,
        playing: false,
        currentPart: [MODE_FIRST_PART,MODE_SECOND_PART].includes(payload) ?
          MODE_TO_PART_MAPPING[payload] : FIRST_PART
      });

    case TICK:
      return state.set('currentStep', state.currentStep + 1);

    case BLINK_TICK:
      return state.set('blinkState', !state.blinkState);

    case CLEAR_DOWN:
    case CLEAR_UP:
      return clearReducer(state, type);

    default:
      return state;
  }
}