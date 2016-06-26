import { TOGGLE_PLAYBACK, TICK, INSTRUMENT_CHANGE } from './actionTypes';

export default function(state, action) {
  switch (action.type) {
    case TOGGLE_PLAYBACK:
      if (state.playing) {
        return {
          ...state,
          playing: false,
          currentTick: -1
        }
      } else {
        return {
          ...state,
          playing: true
        }
      }
    case TICK:
      return {
        ...state,
        currentTick: state.currentTick + 1
      }
    case INSTRUMENT_CHANGE:
      const { type, controlName, value } = action.payload;
      return {
        ...state,
        instrumentState: {
          ...state.instrumentState,
          [type]: {
            ...state.instrumentState[type],
            [controlName]: value
          }
        }
      };
    default:
      return state;
  }
}
