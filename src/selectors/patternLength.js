import { createSelector } from 'reselect';

import { trackLengthKey } from 'helpers';
import { getSelectedRhythm, getPatternLengths } from 'selectors/common';
import getCurrentPart from 'selectors/currentPart';

export default createSelector(
  [getSelectedRhythm, getCurrentPart, getPatternLengths],
  (selectedPattern, currentPart, patternLengths) => {
    return patternLengths[trackLengthKey(selectedPattern, currentPart)];
  });


