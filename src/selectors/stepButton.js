import { createSelector } from 'reselect';

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,

  A_VARIATION, B_VARIATION
} from 'constants';

import { stepKey, trackLengthKey } from 'helpers';

import {
  getCurrentStep,
  getPlaying,
  getSelectedMode,
  getSelectedRhythm,
  getSteps,
  getSelectedInstrumentTrack,
  getIntroFillVariationPosition
} from 'selectors/common';

import currentPartSelector from 'selectors/currentPart';
import basicVariationSelector from 'selectors/variation';
import patternLengthSelector from 'selectors/patternLength';

const getBlinkState = (state) => state.blinkState;

// returns a boolean value determining if the step button light is on or not
export default (stepNumber) => {
  return createSelector([
      getPlaying, getSelectedRhythm, getSelectedMode, basicVariationSelector, getCurrentStep, getBlinkState,
      getSelectedInstrumentTrack, getSteps, currentPartSelector, getIntroFillVariationPosition, patternLengthSelector
    ], (
      playing, selectedRhythm, selectedMode, basicVariation, currentStep, blinkState, selectedInstrument, steps,
      currentPart, introFillVariation, patternLength
    ) => {
      let currentVariation = selectedRhythm < 12 ? basicVariation : introFillVariation;

      // SEQUENCER IS PLAYING
      if (playing) {
        switch (selectedMode) {
          case MODE_FIRST_PART:
          case MODE_SECOND_PART:
            const currentStepKey = stepKey(selectedRhythm, selectedInstrument, currentPart, currentVariation, stepNumber);
            const sequencerValue = steps[currentStepKey];
            if (currentStep % patternLength === stepNumber) {
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