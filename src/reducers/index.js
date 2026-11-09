import produce from "immer";

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
  PRE_SCALE_CHANGE,
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
} from "actionTypes";

import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  MODE_RHYTHM_TRACK_PLAY,
  MODE_RHYTHM_TRACK_COMPOSE,
  MODE_TO_PART_MAPPING,
  FIRST_PART,
  SECOND_PART,
  A_VARIATION,
  B_VARIATION,
  AUTO_FILL_IN_MAPPING,
  RHYTHM_TRACK_MEASURES,
  PERSISTANCE_FILTER
} from "store-constants";

import { cloneInitialState } from "initialState";
import { quantizedStep } from "stepClock";
import { stepKey, patternLengthKey } from "helpers";
import basicVariationSelector from "selectors/variation";

// sub-reducers
import stepClickReducer from "reducers/stepClick";
import clearReducer from "reducers/clear";

// selectors
import patternLengthSelector from "selectors/patternLength";
import pendingPatternLengthSelector from "selectors/pendingPatternLength";

function getNextVariation(currentVariation, basicVariationPosition) {
  switch (basicVariationPosition) {
    case 0:
      return A_VARIATION;
    case 1:
      return currentVariation === A_VARIATION ? B_VARIATION : A_VARIATION;
    case 2:
      return B_VARIATION;
  }
}

function isMeasureAutoFill(state, measure) {
  const autoFillInValue = AUTO_FILL_IN_MAPPING[state.autoFillInPosition];
  return measure !== 0 && autoFillInValue && measure % autoFillInValue === 0;
}

function variationForPattern(state, pattern) {
  if (pattern >= 12) {
    return state.introFillVariationPosition === 0 ? A_VARIATION : B_VARIATION;
  }
  return state.basicVariationPosition > 1 ? B_VARIATION : A_VARIATION;
}

function trackList(state) {
  const tracks = state.rhythmTracks || [];
  return tracks[state.selectedInstrumentTrack] || [];
}

function nextPlayMeasure(state) {
  const list = trackList(state);
  if (!list.length) {
    return produce(state, draft => {
      draft.playing = false;
    });
  }
  const nextIndex = (state.currentMeasure + 1) % list.length;
  const nextPattern = list[nextIndex];
  return produce(state, draft => {
    draft.currentStep = 0;
    draft.currentPart = FIRST_PART;
    draft.currentMeasure = nextIndex;
    draft.currentPattern = nextPattern;
    draft.currentVariation =
      nextPattern >= 12
        ? variationForPattern(state, nextPattern)
        : getNextVariation(state.currentVariation, state.basicVariationPosition);
  });
}

function nextComposeMeasure(state) {
  const list = trackList(state);
  if (list.length >= RHYTHM_TRACK_MEASURES) {
    return produce(state, draft => {
      draft.playing = false;
    });
  }
  const advanced = nextMeasure(state);
  return produce(advanced, draft => {
    const tracks = (state.rhythmTracks || []).map(item => item.slice());
    const track = state.selectedInstrumentTrack;
    const recorded = (tracks[track] || []).slice();
    recorded.push(advanced.currentPattern);
    tracks[track] = recorded;
    draft.rhythmTracks = tracks;
  });
}

function nextMeasure(state) {
  const nextVariation = getNextVariation(
    state.currentVariation,
    state.basicVariationPosition
  );

  const stateUpdate = {
    currentStep: 0,
    currentPart: FIRST_PART,
    currentVariation: nextVariation
  };

  if (state.fillScheduled) {
    return produce(state, draft => {
      Object.assign(draft, {
        ...stateUpdate,
        // if a fill has been scheduled then the next pattern should be the selected fill pattern
        currentPattern: state.selectedPlayFillPattern + 12,
        // clear out the fill schedule
        fillScheduled: false
      });
    });
  } else {
    stateUpdate.currentPattern = state.selectedPlayPattern;

    // move to the next scheduled pattern
    if (state.currentPattern < 12) {
      // add auto fill ins
      if (isMeasureAutoFill(state, state.currentMeasure + 1)) {
        stateUpdate.currentPattern = state.selectedPlayFillPattern + 12;
      }

      // pattern is a basic rhythm so increment the currentMeasure
      return produce(state, draft => {
        Object.assign(draft, {
          ...stateUpdate,
          currentMeasure: state.currentMeasure + 1
        });
      });
    } else {
      // pattern is a fill in so don't increment the currentMeasure
      return produce(state, draft => {
        Object.assign(draft, stateUpdate);
      });
    }
  }
}
export default function(state, { type, payload }) {
  switch (type) {
    case INSTRUMENT_CHANGE: {
      const { type: instrumentType, controlName, value } = payload;
      return produce(state, draft => {
        draft.instrumentState[instrumentType][controlName] = value;
      });
    }

    case STEP_BUTTON_CLICK: {
      return stepClickReducer(state, payload);
    }

    case START_STOP_BUTTON_CLICK: {
      return produce(state, draft => {
        switch (state.selectedMode) {
          case MODE_PATTERN_CLEAR: {
            break;
          }

          case MODE_FIRST_PART:
          case MODE_SECOND_PART: {
            if (!state.playing) {
              draft.currentStep = -1;
              draft.currentVariation =
                state.basicVariationPosition > 1 ? B_VARIATION : A_VARIATION;
              draft.currentPattern = state.selectedPattern;
            }

            draft.playing = !state.playing;
            draft.currentPart = FIRST_PART;
            break;
          }

          case MODE_MANUAL_PLAY:
          case MODE_RHYTHM_TRACK_COMPOSE: {
            if (!state.playing) {
              const pattern = state.fillScheduled
                ? state.selectedPlayFillPattern + 12
                : state.selectedPlayPattern;
              draft.currentStep = -1;
              draft.currentVariation = variationForPattern(state, pattern);
              draft.currentPattern = pattern;
              draft.currentMeasure = 0;
              draft.fillScheduled = false;
              if (state.selectedMode === MODE_RHYTHM_TRACK_COMPOSE) {
                const tracks = (state.rhythmTracks || []).map(item =>
                  item.slice()
                );
                tracks[state.selectedInstrumentTrack] = [pattern];
                draft.rhythmTracks = tracks;
              }
            }

            draft.playing = !state.playing;
            draft.currentPart = FIRST_PART;
            break;
          }

          case MODE_RHYTHM_TRACK_PLAY: {
            const list = trackList(state);
            if (!state.playing) {
              if (!list.length) break;
              const pattern = list[0];
              draft.currentStep = -1;
              draft.currentVariation = variationForPattern(state, pattern);
              draft.currentPattern = pattern;
              draft.currentMeasure = 0;
              draft.fillScheduled = false;
            }

            draft.playing = !state.playing;
            draft.currentPart = FIRST_PART;
            break;
          }

          default: {
            break;
          }
        }
      });
    }

    case MASTER_VOLUME_CHANGE: {
      return produce(state, draft => {
        draft.masterVolume = payload;
      });
    }

    case BASIC_VARIATION_CHANGE: {
      return produce(state, draft => {
        draft.basicVariationPosition = payload;
      });
    }

    case IF_VARIATION_CHANGE: {
      return produce(state, draft => {
        draft.introFillVariationPosition = payload;
      });
    }

    case TEMPO_CHANGE: {
      return produce(state, draft => {
        draft.tempo = payload;
      });
    }

    case FINE_TEMPO_CHANGE: {
      return produce(state, draft => {
        draft.fineTempo = payload;
      });
    }

    case PRE_SCALE_CHANGE: {
      return produce(state, draft => {
        draft.preScalePosition = payload;
      });
    }

    case AUTO_FILL_IN_CHANGE: {
      return produce(state, draft => {
        draft.autoFillInPosition = payload;
      });
    }

    case INSTRUMENT_TRACK_CHANGE: {
      return produce(state, draft => {
        draft.selectedInstrumentTrack = payload;
      });
    }

    case MODE_CHANGE: {
      return produce(state, draft => {
        draft.selectedMode = payload;
        draft.playing = false;
      });
    }

    case TICK: {
      const currentPatternLength = patternLengthSelector(state);

      // go to next part/measure
      if (state.currentStep + 1 >= currentPatternLength) {
        switch (state.selectedMode) {
          case MODE_FIRST_PART: {
            return produce(state, draft => {
              draft.currentStep = 0;
              draft.currentPart = FIRST_PART;
              draft.currentVariation = getNextVariation(
                state.currentVariation,
                state.basicVariationPosition
              );
            });
          }

          case MODE_SECOND_PART: {
            let nextPart = FIRST_PART;
            let nextVariation = state.currentVariation;

            if (state.currentPart === FIRST_PART) {
              // go to second part if it has a patternLength > 0
              const secondPartLength =
                state.patternLengths[
                  patternLengthKey(state.currentPattern, SECOND_PART)
                ];

              if (secondPartLength !== 0) nextPart = SECOND_PART;
              // second part has zero length so go back to first part with the next variation
              else
                nextVariation = getNextVariation(
                  state.currentVariation,
                  state.basicVariationPosition
                );
            } else {
              // second part has finished so go back to first part with next variation
              nextVariation = getNextVariation(
                state.currentVariation,
                state.basicVariationPosition
              );
            }

            return produce(state, draft => {
              draft.currentStep = 0;
              draft.currentPart = nextPart;
              draft.currentVariation = nextVariation;
            });
          }

          case MODE_MANUAL_PLAY:
          case MODE_RHYTHM_TRACK_COMPOSE:
          case MODE_RHYTHM_TRACK_PLAY: {
            if (state.currentPart === FIRST_PART) {
              const secondPartLength =
                state.patternLengths[
                  patternLengthKey(state.currentPattern, SECOND_PART)
                ];

              if (secondPartLength !== 0) {
                return produce(state, draft => {
                  draft.currentStep = 0;
                  draft.currentPart = SECOND_PART;
                });
              } else if (state.selectedMode === MODE_RHYTHM_TRACK_COMPOSE) {
                return nextComposeMeasure(state);
              } else if (state.selectedMode === MODE_RHYTHM_TRACK_PLAY) {
                return nextPlayMeasure(state);
              } else {
                return nextMeasure(state);
              }
            } else if (state.selectedMode === MODE_RHYTHM_TRACK_COMPOSE) {
              return nextComposeMeasure(state);
            } else if (state.selectedMode === MODE_RHYTHM_TRACK_PLAY) {
              return nextPlayMeasure(state);
            } else {
              return nextMeasure(state);
            }
          }
        }
      }

      return produce(state, draft => {
        draft.currentStep = state.currentStep + 1;
      });
    }

    case BLINK_TICK: {
      return produce(state, draft => {
        draft.blinkState = !state.blinkState;
      });
    }

    case CLEAR_DOWN:
    case CLEAR_UP:
    case CLEAR_DRAG_START:
    case CLEAR_DRAG_END: {
      return clearReducer(state, type);
    }

    case TAP_BUTTON_CLICK: {
      switch (state.selectedMode) {
        case MODE_MANUAL_PLAY:
        case MODE_RHYTHM_TRACK_COMPOSE: {
          return produce(state, draft => {
            draft.fillScheduled = !state.fillScheduled;
          });
        }
        case MODE_FIRST_PART:
        case MODE_SECOND_PART: {
          if (!state.playing) return state;
          const length = patternLengthSelector(state);
          if (!(length > 0)) return state;
          const step = quantizedStep(state.currentStep, length);
          const part = MODE_TO_PART_MAPPING[state.selectedMode];
          const variation = basicVariationSelector(state);
          if (part == null || variation == null) return state;
          if (!isFinite(step) || step < 0 || step > 15) return state;
          const key = stepKey(
            state.currentPattern,
            state.selectedInstrumentTrack,
            part,
            variation,
            step
          );
          if (state.steps[key]) return state;
          return produce(state, draft => {
            draft.steps[key] = true;
          });
        }
        default: {
          return state;
        }
      }
    }

    case CLEAR_DRAG_DROP: {
      const track = state.currentPattern;
      const part = MODE_TO_PART_MAPPING[state.selectedMode];

      if (part === FIRST_PART) {
        return produce(state, draft => {
          draft.patternLengths[patternLengthKey(track, FIRST_PART)] = payload;
          draft.patternLengths[patternLengthKey(track, SECOND_PART)] = 0;
        });
      } else if (part === SECOND_PART) {
        return produce(state, draft => {
          draft.patternLengths[patternLengthKey(track, SECOND_PART)] = payload;
        });
      } else {
        return state;
      }
    }

    case CLEAR_DRAG_ENTER: {
      return produce(state, draft => {
        draft.pendingPatternLength = payload + 1;
      });
    }

    case CLEAR_DRAG_EXIT: {
      return produce(state, draft => {
        draft.pendingPatternLength = pendingPatternLengthSelector(state);
      });
    }

    case STATE_LOAD: {
      return produce(state, draft => {
        PERSISTANCE_FILTER.forEach(key => {
          if (payload[key] == null) return;
          draft[key] = payload[key];
        });
      });
    }

    case RESET: {
      return cloneInitialState();
    }

    default: {
      return state;
    }
  }
}
