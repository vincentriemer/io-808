import { createSelector } from 'reselect';

import {
  MODE_PATTERN_CLEAR, MODE_FIRST_PART, MODE_SECOND_PART,
  FIRST_PART, SECOND_PART
} from 'constants';

import { getSelectedMode, getClearPressed } from 'selectors/common';

export default createSelector([getSelectedMode, getClearPressed],
  (selectedMode, clearPressed) => {
    switch (selectedMode) {
      case MODE_PATTERN_CLEAR:
        return clearPressed ? SECOND_PART : FIRST_PART;
      case MODE_FIRST_PART:
        return FIRST_PART;
      case MODE_SECOND_PART:
        return SECOND_PART;
      default:
        return FIRST_PART;
    }
  }
)