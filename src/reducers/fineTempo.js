import {FINE_TEMPO_CHANGE} from '../actionTypes';

const initalState = 0;

export default (state=initalState, { type: actionType, value }) => {
  if (actionType === FINE_TEMPO_CHANGE) {
    return value;
  }
  return state;
}
