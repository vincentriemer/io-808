import {MODE_CHANGE} from '../actionTypes';

const initalState = 0;

export default (state=initalState, { type: actionType, value }) => {
  if (actionType === MODE_CHANGE) {
    return value;
  }
  return state;
}
