import { createSelector } from "reselect";

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY
} from "store-constants";

import {
  getCurrentPattern,
  getSelectedMode,
  getSelectedPattern
} from "selectors/common";

export default createSelector(
  [getCurrentPattern, getSelectedMode, getSelectedPattern],
  (currentPattern, mode, selectedPattern) => {
    switch (mode) {
      case MODE_PATTERN_CLEAR:
      case MODE_FIRST_PART:
      case MODE_SECOND_PART:
        return selectedPattern;
      case MODE_MANUAL_PLAY:
      default:
        return currentPattern;
    }
  }
);
