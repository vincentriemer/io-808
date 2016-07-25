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
  getSelectedRhythm,
  getSteps,
  getSelectedInstrumentTrack,
  getIntroFillVariationPosition
} from 'selectors/common';

import currentPartSelector from 'selectors/currentPart';
import basicVariationSelector from 'selectors/basicVariation';

const getBlinkState = (state) => state.blinkState;

// returns a boolean value determining if the step button light is on or not
export default (stepNumber) => {
  return createSelector([
      getPlaying, getSelectedRhythm, getSelectedMode, basicVariationSelector, getCurrentStep, getBlinkState,
      getSelectedInstrumentTrack, getSteps, currentPartSelector, getIntroFillVariationPosition
    ], (
      playing, selectedRhythm, selectedMode, basicVariation, currentStep, blinkState, selectedInstrument, steps,
      currentPart, introFillVariation
    ) => {
      let currentVariation = selectedRhythm < 12 ? [A_VARIATION,,B_VARIATION][basicVariation] : introFillVariation;

      // SEQUENCER IS PLAYING
      if (playing) {
        switch (selectedMode) {
          case MODE_FIRST_PART:
          case MODE_SECOND_PART:
            const currentStepKey = stepKey(selectedRhythm, selectedInstrument, currentPart, currentVariation, stepNumber);
            const sequencerValue = steps[currentStepKey];
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