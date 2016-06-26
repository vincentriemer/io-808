import {
  TOGGLE_PLAYBACK,
  TICK,
  INSTRUMENT_CHANGE
} from './actionTypes';

export const togglePlayback = () => ({
  type: TOGGLE_PLAYBACK
});

export const tick = () => ({
  type: TICK
});

export const instrumentChange = (type, controlName, value) => ({
  type: INSTRUMENT_CHANGE,
  payload: {
    type, controlName, value
  }
});
