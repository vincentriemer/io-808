import produce from "immer";

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  MODE_TO_PART_MAPPING,
  FIRST_PART
} from "store-constants";

import { stepKey } from "../helpers";

import basicVariationSelector from "selectors/variation";

export default (state, stepNumber) => {
  const {
    playing,
    selectedMode,
    currentPattern,
    selectedInstrumentTrack,
    currentStep,
    currentPart
  } = state;

  const currentVariation = basicVariationSelector(state);

  if (playing) {
    switch (selectedMode) {
      case MODE_FIRST_PART:
      case MODE_SECOND_PART: {
        const selectedPart = MODE_TO_PART_MAPPING[selectedMode];
        const key = stepKey(
          currentPattern,
          selectedInstrumentTrack,
          selectedPart,
          currentVariation,
          stepNumber
        );
        return produce(state, draft => {
          draft.steps[key] = !state.steps[key];
        });
      }
      case MODE_MANUAL_PLAY: {
        if (stepNumber < 12) {
          if (currentPart === FIRST_PART && currentStep < 4) {
            // change pattern immediately
            return produce(state, draft => {
              draft.selectedPlayPattern = stepNumber;
              draft.currentPattern = stepNumber;
            });
          } else {
            // change the selected basic rhythm
            return produce(state, draft => {
              draft.selectedPlayPattern = stepNumber;
            });
          }
        } else {
          // change the selected fill pattern
          return produce(state, draft => {
            draft.selectedPlayFillPattern = stepNumber - 12;
          });
        }
      }
      default: {
        return state;
      }
    }
  } else {
    switch (selectedMode) {
      case MODE_PATTERN_CLEAR:
      case MODE_FIRST_PART:
      case MODE_SECOND_PART: {
        return produce(state, draft => {
          draft.selectedPattern = stepNumber;
        });
      }
      case MODE_MANUAL_PLAY: {
        return produce(state, draft => {
          if (stepNumber < 12) {
            draft.selectedPlayPattern = stepNumber;
          } else {
            draft.selectedPlayFillPattern = stepNumber - 12;
          }
        });
      }
      default: {
        return state;
      }
    }
  }
};
