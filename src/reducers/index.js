import {
  INSTRUMENT_CHANGE,
  MASTER_VOLUME_CHANGE,
  BASIC_VARIATION_CHANGE,
  IF_VARIATION_CHANGE,
  AUTO_FILL_IN_CHANGE,
  FINE_TEMPO_CHANGE,
  INSTRUMENT_TRACK_CHANGE,
  MODE_CHANGE,
  TEMPO_CHANGE,
  TAP_BUTTON_CLICK,
  STEP_BUTTON_CLICK,
  START_STOP_BUTTON_CLICK,
  TICK,
  BLINK_TICK,
  CLEAR_DOWN,
  CLEAR_UP,
  CLEAR_DRAG_START,
  CLEAR_DRAG_END,
  CLEAR_DRAG_ENTER,
  CLEAR_DRAG_EXIT,
  CLEAR_DRAG_DROP,
  STATE_LOAD,
  RESET
} from 'actionTypes';

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART, MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  MODE_TO_PART_MAPPING,
  FIRST_PART, SECOND_PART,
  A_VARIATION, B_VARIATION,
  AUTO_FILL_IN_MAPPING
} from 'constants';

import initialState from 'initialState';

// sub-reducers
import stepClickReducer from 'reducers/stepClick';
import clearReducer from 'reducers/clear';

// selectors
import patternLengthSelector from 'selectors/patternLength';
import pendingPatternLengthSelector from 'selectors/pendingPatternLength';

import { patternLengthKey } from 'helpers';

function getNextVariation(currentVariation, basicVariationPosition) {
  switch (basicVariationPosition) {
    case 0:
      return A_VARIATION;
      break;
    case 1:
      return currentVariation === A_VARIATION ? B_VARIATION : A_VARIATION;
      break;
    case 2:
      return B_VARIATION;
  }
}

function isMeasureAutoFill (state, measure) {
  const autoFillInValue = AUTO_FILL_IN_MAPPING[state.autoFillInPosition];
  return measure !== 0 && autoFillInValue && measure % autoFillInValue === 0;
}

function nextMeasure (state) {
  const nextVariation = getNextVariation(state.currentVariation, state.basicVariationPosition);

  const stateUpdate = {
    currentStep: 0,
    currentPart: FIRST_PART,
    currentVariation: nextVariation
  };

  if (state.fillScheduled) {
    return state.merge({
      ...stateUpdate,
      // if a fill has been scheduled then the next pattern should be the selected fill pattern
      currentPattern: state.selectedPlayFillPattern + 12,
      // clear out the fill schedule
      fillScheduled: false
    })
  } else {
    stateUpdate.currentPattern = state.selectedPlayPattern;

    // move to the next scheduled pattern
    if (state.currentPattern < 12) {
      // add auto fill ins
      if (isMeasureAutoFill(state, state.currentMeasure + 1)) {
        stateUpdate.currentPattern = state.selectedPlayFillPattern + 12
      }

      // pattern is a basic rhythm so increment the currentMeasure
      return state.merge({
        ...stateUpdate,
        currentMeasure: state.currentMeasure + 1
      });
    } else {
      // pattern is a fill in so don't increment the currentMeasure
      return state.merge(stateUpdate);
    }
  }
}
export default function(state, { type, payload }) {
  switch(type) {
    case INSTRUMENT_CHANGE:
      const {type: instrumentType, controlName, value} = payload;
      return state.setIn(['instrumentState', instrumentType, controlName], value);

    case STEP_BUTTON_CLICK:
      return stepClickReducer(state, payload);

    case START_STOP_BUTTON_CLICK:
      let newState = state;
      switch(state.selectedMode) {
        case MODE_PATTERN_CLEAR:
          return state;

        case MODE_FIRST_PART:
        case MODE_SECOND_PART:
          if (!state.playing) {
            newState = newState.merge({
              currentStep: -1,
              currentVariation: state.basicVariationPosition > 1 ? B_VARIATION : A_VARIATION,
              currentPattern: state.selectedPattern
            });
          }

          return newState.merge({
            playing: !state.playing,
            currentPart: FIRST_PART
          });

        case MODE_MANUAL_PLAY:
          if (!state.playing) {
            newState = newState.merge({
              currentStep: -1,
              currentVariation: state.basicVariationPosition > 1 ? B_VARIATION : A_VARIATION,
              currentPattern: state.fillScheduled ? state.selectedPlayFillPattern + 12 : state.selectedPlayPattern,
              currentMeasure: 0,
              fillScheduled: false
            });
          }

          return newState.merge({
            playing: !state.playing,
            currentPart: FIRST_PART
          });

        default:
          return state;
      }

    case MASTER_VOLUME_CHANGE:
      return state.set('masterVolume', payload);

    case BASIC_VARIATION_CHANGE:
      return state.set('basicVariationPosition', payload);

    case IF_VARIATION_CHANGE:
      return state.set('introFillVariationPosition', payload);

    case TEMPO_CHANGE:
      return state.set('tempo', payload);

    case FINE_TEMPO_CHANGE:
      return state.set('fineTempo', payload);

    case AUTO_FILL_IN_CHANGE:
      return state.set('autoFillInPosition', payload);

    case INSTRUMENT_TRACK_CHANGE:
      return state.set('selectedInstrumentTrack', payload);

    case MODE_CHANGE:
      const additionalStateChanges = {};

      return state.merge({
        ...additionalStateChanges,
        selectedMode: payload,
        playing: false
      });

    case TICK:
      const currentPatternLength = patternLengthSelector(state);

      // go to next part/measure
      if (state.currentStep + 1 >= currentPatternLength) {
        switch(state.selectedMode) {
          case MODE_FIRST_PART:
            return state.merge({
              currentStep: 0,
              currentPart: FIRST_PART,
              currentVariation: getNextVariation(state.currentVariation, state.basicVariationPosition)
            });
          case MODE_SECOND_PART:
            let nextPart = FIRST_PART;
            let nextVariation = state.currentVariation;

            if (state.currentPart === FIRST_PART) {
              // go to second part if it has a patternLength > 0
              const secondPartLength = state.patternLengths[patternLengthKey(state.currentPattern, SECOND_PART)];

              if (secondPartLength !== 0)
                nextPart = SECOND_PART;
              else // second part has zero length so go back to first part with the next variation
                nextVariation = getNextVariation(state.currentVariation, state.basicVariationPosition);

            } else { // second part has finished so go back to first part with next variation
              nextVariation = getNextVariation(state.currentVariation, state.basicVariationPosition);
            }

            return state.merge({
              currentStep: 0,
              currentPart: nextPart,
              currentVariation: nextVariation
            });

          case MODE_MANUAL_PLAY:
            if (state.currentPart === FIRST_PART) {
              // go to second part if it has a patternLength > 0
              const secondPartLength = state.patternLengths[patternLengthKey(state.currentPattern, SECOND_PART)];

              if (secondPartLength !== 0) {
                return state.merge({
                  currentStep: 0,
                  currentPart: SECOND_PART
                });
              } else {
                return nextMeasure(state);
              }
            } else {
              return nextMeasure(state);
            }
        }
      }

      return state.merge({
        currentStep: state.currentStep + 1
      });

    case BLINK_TICK:
      return state.set('blinkState', !state.blinkState);

    case CLEAR_DOWN:
    case CLEAR_UP:
    case CLEAR_DRAG_START:
    case CLEAR_DRAG_END:
      return clearReducer(state, type);

    case TAP_BUTTON_CLICK:
      switch (state.selectedMode) {
        case MODE_MANUAL_PLAY:
          return state.set('fillScheduled', !state.fillScheduled);
        default:
          return state;
      }

    case CLEAR_DRAG_DROP:
      const track = state.currentPattern;
      const part = MODE_TO_PART_MAPPING[state.selectedMode];

      if (part === FIRST_PART) {
        return state
          .setIn(['patternLengths', patternLengthKey(track, FIRST_PART)], payload)
          .setIn(['patternLengths', patternLengthKey(track, SECOND_PART)], 0);
      } else if (part === SECOND_PART) {
        return state
          .setIn(['patternLengths', patternLengthKey(track, SECOND_PART)], payload);
      } else {
        return state;
      }

    case CLEAR_DRAG_ENTER:
      return state.merge({ pendingPatternLength: payload + 1 });

    case CLEAR_DRAG_EXIT:
      return state.merge({
        pendingPatternLength: pendingPatternLengthSelector(state)
      });

    case STATE_LOAD:
      return state.merge(payload);

    case RESET:
      return state.merge(initialState);

    default:
      return state;
  }
}