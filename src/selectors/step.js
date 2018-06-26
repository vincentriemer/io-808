import { createSelector } from "reselect";

import { MODE_FIRST_PART, MODE_SECOND_PART } from "store-constants";

import { getCurrentStep, getSelectedMode } from "selectors/common";
import patternLengthSelector from "selectors/patternLength";

export default createSelector(
  [getCurrentStep, getSelectedMode, patternLengthSelector],
  (currentStep, mode, patternLength) => {
    switch (mode) {
      // case MODE_FIRST_PART:
      // case MODE_SECOND_PART:
      //   return currentStep % patternLength;
      default:
        return currentStep;
    }
  }
);
