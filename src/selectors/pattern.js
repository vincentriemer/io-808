import { createSelector } from 'reselect';

import { MODE_FIRST_PART, MODE_SECOND_PART } from 'constants';

import { getCurrentPattern, getSelectedMode } from 'selectors/common';

export default createSelector(
  [getCurrentPattern, getSelectedMode],
  (currentPattern, mode) => {
    switch(mode) {
      case MODE_FIRST_PART:
      case MODE_SECOND_PART:
      default:
        return currentPattern;
    }
  }
);