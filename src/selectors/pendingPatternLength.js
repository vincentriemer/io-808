import { createSelector } from "reselect";

import { MODE_TO_PART_MAPPING } from "store-constants";
import { patternLengthKey } from "helpers";
import {
  getCurrentPattern,
  getPatternLengths,
  getSelectedMode
} from "selectors/common";

export default createSelector(
  [getCurrentPattern, getPatternLengths, getSelectedMode],
  (currentPattern, patternLengths, selectedMode) => {
    const currentPart = MODE_TO_PART_MAPPING[selectedMode];
    return patternLengths[patternLengthKey(currentPattern, currentPart)];
  }
);
