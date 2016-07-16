import {INSTRUMENT_TRACK_CHANGE} from '../actionTypes';

const initalState = 0;

export default (state=initalState, { type: actionType, value }) => {
  if (actionType === INSTRUMENT_TRACK_CHANGE) {
    return value;
  }
  return state;
}
