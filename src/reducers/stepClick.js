import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  MODE_RHYTHM_TRACK_PLAY,
  MODE_RHYTHM_TRACK_COMPOSE,
} from '../constants';

import { stepKey } from '../helpers';

// should return only updated properties
export default (state, stepNumber) => {
  const {
    playing, selectedMode, selectedRhythm,
    currentPart, currentVariation, selectedInstrumentTrack
  } = state;

  if (playing) {
    switch (selectedMode) {
      case MODE_FIRST_PART:
      case MODE_SECOND_PART:
        const key = stepKey(selectedRhythm, selectedInstrumentTrack, currentPart, currentVariation, stepNumber);
        return state.setIn(['steps', key], !state.steps[key]);
      default:
        return {};
    }
  } else {
    switch (selectedMode) {
      case MODE_FIRST_PART:
      case MODE_SECOND_PART:
        return state.set('selectedRhythm', stepNumber);
      default:
        return {};
    }
  }
}