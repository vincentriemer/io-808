import { createSelector } from 'reselect';

import { patternLengthKey } from 'helpers';
import { getCurrentPattern, getPatternLengths, getCurrentPart } from 'selectors/common';

export default createSelector(
  [getCurrentPattern, getCurrentPart, getPatternLengths],
  (currentPattern, currentPart, patternLengths) => {
    return patternLengths[patternLengthKey(currentPattern, currentPart)];
  });


