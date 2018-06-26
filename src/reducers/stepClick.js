import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  MODE_TO_PART_MAPPING,
  FIRST_PART,
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
    currentPart,
  } = state;

  const currentVariation = basicVariationSelector(state);

  if (playing) {
    switch (selectedMode) {
      case MODE_FIRST_PART:
      case MODE_SECOND_PART:
        const selectedPart = MODE_TO_PART_MAPPING[selectedMode];
        const key = stepKey(
          currentPattern,
          selectedInstrumentTrack,
          selectedPart,
          currentVariation,
          stepNumber
        );
        return state.setIn(["steps", key], !state.steps[key]);
      case MODE_MANUAL_PLAY:
        if (stepNumber < 12) {
          if (currentPart === FIRST_PART && currentStep < 4) {
            // change pattern immediately
            return state.merge({
              selectedPlayPattern: stepNumber,
              currentPattern: stepNumber,
            });
          } else {
            // change the selected basic rhythm
            return state.set("selectedPlayPattern", stepNumber);
          }
        } else {
          // change the selected fill pattern
          return state.set("selectedPlayFillPattern", stepNumber - 12);
        }
      default:
        return state;
    }
  } else {
    switch (selectedMode) {
      case MODE_PATTERN_CLEAR:
      case MODE_FIRST_PART:
      case MODE_SECOND_PART:
        return state.set("selectedPattern", stepNumber);
      case MODE_MANUAL_PLAY:
        if (stepNumber < 12) {
          return state.set("selectedPlayPattern", stepNumber);
        } else {
          return state.set("selectedPlayFillPattern", stepNumber - 12);
        }
      default:
        return state;
    }
  }
};
