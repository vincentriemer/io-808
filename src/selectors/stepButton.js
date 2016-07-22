import { createSelector } from 'reselect';

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,

  A_VARIATION, B_VARIATION
} from 'constants';

import { stepKey } from 'helpers';

import {
  getCurrentStep,
  getCurrentVariation,
  getPlaying,
  getSelectedMode,
  getSelectedRhythm
} from 'selectors/common';

const getBlinkState = (state) => state.blinkState;

const getSequencerValueFactory = (stepNumber) => (state) => {
  const { selectedRhythm, currentPart, currentVariation, selectedInstrumentTrack } = state;
  const key = stepKey(selectedRhythm, selectedInstrumentTrack, currentPart, currentVariation, stepNumber);
  return state.steps[key];
};

// returns a boolean value determining if the step button light is on or not
export default (stepNumber) => {
  return createSelector(
    [
      getPlaying,
      getSelectedRhythm,
      getSelectedMode,
      getCurrentVariation,
      getCurrentStep,
      getBlinkState,
      getSequencerValueFactory(stepNumber)
    ],
    (
      playing,
      selectedRhythm,
      selectedMode,
      currentVariation,
      currentStep,
      blinkState,
      sequencerValue
    ) => {
      // SEQUENCER IS PLAYING
      if (playing) {
        switch (selectedMode) {
          case MODE_FIRST_PART:
          case MODE_SECOND_PART:
            if (currentStep % 16 === stepNumber) {
              return !sequencerValue;
            } else {
              return sequencerValue;
            }
          default:
            return false;
        }
      }
      // SEQUENCER IS NOT PLAYING
      else {
        switch (selectedMode) {
          case MODE_PATTERN_CLEAR:
          case MODE_FIRST_PART:
          case MODE_SECOND_PART:
            return (selectedRhythm === stepNumber) && blinkState;
          default:
            return false;
        }
      }
    }
  )
}