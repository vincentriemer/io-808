import { TOGGLE_PLAYBACK, TICK } from './actionTypes';

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
    default:
      return state;
  }
}
