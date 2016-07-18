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
  PRE_SCALE_CHANGE,
  STEP_BUTTON_CLICK,
  CLEAR_CLICK,
  START_STOP_BUTTON_CLICK
} from '../actionTypes';

import {
  MODE_FIRST_PART, MODE_SECOND_PART,
  MODE_TO_PART_MAPPING, FIRST_PART
} from '../constants';

import stepClickReducer from './stepClick';

export default function(state, { type, payload }) {
  switch(type) {
    case INSTRUMENT_CHANGE:
      const {type: instrumentType, controlName, value} = payload;
      return state.setIn(['instrumentState', instrumentType, controlName], value);

    case STEP_BUTTON_CLICK:
      return stepClickReducer(state, payload);

    case START_STOP_BUTTON_CLICK:
      return state.set('playing', !state.playing);

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
          MODE_TO_PART_MAPPING[payload]: FIRST_PART
      });

    default:
      return state;
  }
}