import { createSelector } from 'reselect';

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY
} from 'constants';

import { stepKey } from 'helpers';

import {
  getCurrentStep,
  getPlaying,
  getSelectedMode,
  getCurrentPattern,
  getSteps,
  getSelectedInstrumentTrack,
  getIntroFillVariationPosition,
  getFillScheduled,
  getSelectedPlayPattern,
  getSelectedPlayFillPattern,
  getSelectedPattern
} from 'selectors/common';

import currentPartSelector from 'selectors/currentPartDisplay';
import basicVariationSelector from 'selectors/variation';
import patternLengthSelector from 'selectors/patternLength';

const getBlinkState = (state) => state.blinkState;

// returns a boolean value determining if the step button light is on or not
export default (stepNumber) => {
  return createSelector([
      getPlaying, getCurrentPattern, getSelectedMode, basicVariationSelector, getCurrentStep, getBlinkState,
      getSelectedInstrumentTrack, getSteps, currentPartSelector, getIntroFillVariationPosition, patternLengthSelector,
      getFillScheduled, getSelectedPlayPattern, getSelectedPlayFillPattern, getSelectedPattern
    ], (
      playing, currentPattern, selectedMode, basicVariation, currentStep, blinkState, selectedInstrument, steps,
      currentPart, introFillVariation, patternLength, fillScheduled, selectedPlayPattern, selectedPlayFillPattern,
      selectedPattern
    ) => {
      let currentVariation = currentPattern < 12 ? basicVariation : introFillVariation;

      // SEQUENCER IS PLAYING
      if (playing) {
        switch (selectedMode) {
          case MODE_FIRST_PART:
          case MODE_SECOND_PART:
            const currentStepKey = stepKey(currentPattern, selectedInstrument, currentPart, currentVariation, stepNumber);
            const sequencerValue = steps[currentStepKey];
            return currentStep === stepNumber ? !sequencerValue : sequencerValue;
          case MODE_MANUAL_PLAY:
            const isCurrentPattern = currentPattern === stepNumber;
            const isCurrentStep = currentStep === stepNumber;

            return isCurrentPattern ? isCurrentPattern && !isCurrentStep : isCurrentStep;
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
            return (selectedPattern === stepNumber) && blinkState;
          case MODE_MANUAL_PLAY:
            if (stepNumber < 12) {
              if (fillScheduled) {
                return selectedPlayPattern === stepNumber;
              } else {
                return (selectedPlayPattern === stepNumber) && blinkState;
              }
            } else {
              const selectedStep = selectedPlayFillPattern + 12;
              if (fillScheduled) {
                return (selectedStep === stepNumber) && blinkState;
              } else {
                return selectedStep === stepNumber;
              }
            }
          default:
            return false;
        }
      }
    }
  )
}