import { MODE_PATTERN_CLEAR, A_VARIATION, B_VARIATION, FIRST_PART, SECOND_PART } from 'constants';
import { CLEAR_DOWN, CLEAR_UP } from 'actionTypes';
import { stepKey } from 'helpers';

export default (state, type) => {
  switch (type) {
    case CLEAR_DOWN:
      if (state.selectedMode === MODE_PATTERN_CLEAR)
        return state.set('clearPressed', true);
      else
        return state;

    case CLEAR_UP:
      switch(state.selectedMode) {
        case MODE_PATTERN_CLEAR:
          const stateUpdate = {};
          stateUpdate.clearPressed = false;

          const variationsToClear = [];
          if (state.basicVariationPosition <= 1)
            variationsToClear.push(A_VARIATION);
          if (state.basicVariationPosition >= 1)
            variationsToClear.push(B_VARIATION);

          stateUpdate.steps = {};
          variationsToClear.forEach(variation => {
            [FIRST_PART, SECOND_PART].forEach(part => {
              for (let stepNumber = 0; stepNumber < 16; stepNumber++) {
                const key = stepKey(state.selectedRhythm, state.selectedInstrumentTrack, part, variation, stepNumber);
                stateUpdate.steps[key] = false;
              }
            });
          });

          return state.merge(stateUpdate, { deep: true });
        default:
          return state;
      }
    default:
      return state;
  }
}
