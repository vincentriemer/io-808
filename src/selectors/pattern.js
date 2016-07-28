import { createSelector } from 'reselect';

import { MODE_FIRST_PART, MODE_SECOND_PART } from 'constants';

import { getSelectedRhythm, getSelectedMode } from 'selectors/common';

export default createSelector(
  [getSelectedRhythm, getSelectedMode],
  (selectedRhythm, mode) => {
    switch(mode) {
      case MODE_FIRST_PART:
      case MODE_SECOND_PART:
      default:
        return selectedRhythm;
    }
  }
);