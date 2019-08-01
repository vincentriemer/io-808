import produce from "immer";
import {
  MODE_PATTERN_CLEAR,
  A_VARIATION,
  B_VARIATION,
  FIRST_PART,
  SECOND_PART
} from "store-constants";
import {
  CLEAR_DOWN,
  CLEAR_UP,
  CLEAR_DRAG_START,
  CLEAR_DRAG_END
} from "actionTypes";
import { stepKey } from "helpers";

import pendingPatternLengthSelector from "selectors/pendingPatternLength";

export default (state, type) => {
  switch (type) {
    case CLEAR_DOWN: {
      if (state.selectedMode === MODE_PATTERN_CLEAR) {
        return produce(state, draft => {
          draft.clearPressed = true;
        });
      } else {
        return state;
      }
    }

    case CLEAR_UP: {
      switch (state.selectedMode) {
        case MODE_PATTERN_CLEAR: {
          return produce(state, draft => {
            draft.clearPressed = false;

            const variationsToClear = [];

            // is a basic rhythm
            if (state.selectedPattern < 12) {
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

            draft.steps = {};

            variationsToClear.forEach(variation => {
              [FIRST_PART, SECOND_PART].forEach(part => {
                for (let stepNumber = 0; stepNumber < 16; stepNumber++) {
                  for (let instrument = 0; instrument < 12; instrument++) {
                    const key = stepKey(
                      state.selectedPattern,
                      instrument,
                      part,
                      variation,
                      stepNumber
                    );
                    draft.steps[key] = false;
                  }
                }
              });
            });
          });
        }
        default: {
          return state;
        }
      }
    }

    case CLEAR_DRAG_START: {
      return produce(state, draft => {
        draft.clearDragging = true;
        draft.pendingPatternLength = pendingPatternLengthSelector(state);
      });
    }

    case CLEAR_DRAG_END: {
      return produce(state, draft => {
        draft.clearDragging = false;
      });
    }

    default: {
      return state;
    }
  }
};
