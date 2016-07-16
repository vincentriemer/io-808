import {TEMPO_CHANGE} from '../actionTypes';

const initalState = 111;

export default (state=initalState, { type: actionType, value }) => {
  if (actionType === TEMPO_CHANGE) {
    return value;
  }
  return state;
}
