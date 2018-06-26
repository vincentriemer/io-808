import { createSelector } from "reselect";

import {
  MODE_PATTERN_CLEAR,
  A_VARIATION,
  B_VARIATION,
  BOTH_VARIATIONS
} from "store-constants";

import {
  getSelectedMode,
  getPlaying,
  getCurrentStep,
  getCurrentPattern,
  getIntroFillVariationPosition,
  getCurrentVariation
} from "selectors/common";

const getBasicVariationPosition = state => state.basicVariationPosition;
const getPartLengths = state => state.patternLengths;
const getClearPressed = state => state.clearPressed;

const variationMap = [A_VARIATION, BOTH_VARIATIONS, B_VARIATION];

export default createSelector(
  [
    getPlaying,
    getSelectedMode,
    getCurrentStep,
    getCurrentPattern,
    getCurrentVariation,
    getPartLengths,
    getBasicVariationPosition,
    getClearPressed,
    getIntroFillVariationPosition
  ],
  (
    playing,
    selectedMode,
    currentStep,
    currentPattern,
    currentVariation,
    rhythmLengths,
    basicVariationPosition,
    clearPressed,
    introFillVariation
  ) => {
    // if current pattern is an intro/fillin lights should reflect switch position
    if (currentPattern >= 12) {
      if (selectedMode === MODE_PATTERN_CLEAR && !clearPressed) {
        return null; // no variation lights active
      } else {
        return introFillVariation;
      }
    }

    if (playing) {
      return currentVariation;
    } else {
      if (selectedMode === MODE_PATTERN_CLEAR && !clearPressed) {
        return null; // no variation lights active
      } else {
        return variationMap[basicVariationPosition];
      }
    }
  }
);
