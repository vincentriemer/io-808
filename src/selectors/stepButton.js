import { createSelector } from 'reselect';

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,

  A_VARIATION, B_VARIATION
} from '../constants';

import { stepKey } from '../helpers';

const getPlaying = (state) => state.playing;
const getSelectedRhythm = (state) => state.selectedRhythm;
const getSelectedMode = (state) => state.selectedMode;
const getCurrentVariation = (state) => state.currentVariation;
const getCurrentStep = (state) => state.currentStep;

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
      getSequencerValueFactory(stepNumber)
    ],
    (
      playing,
      selectedRhythm,
      selectedMode,
      currentVariation,
      currentStep,
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
            return selectedRhythm === stepNumber;
          default:
            return false;
        }
      }
    }
  )
}