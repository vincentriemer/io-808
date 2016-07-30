import { MODE_PATTERN_CLEAR, A_VARIATION, B_VARIATION, FIRST_PART, SECOND_PART, MODE_TO_PART_MAPPING } from 'constants';
import { CLEAR_DOWN, CLEAR_UP, CLEAR_DRAG_START, CLEAR_DRAG_END, CLEAR_DRAG_DROP } from 'actionTypes';
import { stepKey, patternLengthKey } from 'helpers';

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

          // is a basic rhythm
          if (state.currentPattern < 12) {
            if (state.basicVariationPosition <= 1)
              variationsToClear.push(A_VARIATION);
            if (state.basicVariationPosition >= 1)
              variationsToClear.push(B_VARIATION);
          }
          // is a intro/fill in
          else {
            if (state.introFillVariationPosition === 0) {
              variationsToClear.push(A_VARIATION);
            } else {
              variationsToClear.push(B_VARIATION);
            }
          }

          stateUpdate.steps = {};
          variationsToClear.forEach(variation => {
            [FIRST_PART, SECOND_PART].forEach(part => {
              for (let stepNumber = 0; stepNumber < 16; stepNumber++) {
                for (let instrument = 0; instrument < 12; instrument++ ) {
                  const key = stepKey(state.currentPattern, instrument, part, variation, stepNumber);
                  stateUpdate.steps[key] = false;
                }
              }
            });
          });

          return state.merge(stateUpdate, { deep: true });
        default:
          return state;
      }

    case CLEAR_DRAG_START:
      return state.set('clearDragging', true);

    case CLEAR_DRAG_END:
      return state.set('clearDragging', false);

    default:
      return state;
  }
}
