import { AUTO_FILL_IN_CHANGE } from '../actionTypes';

const initalState = 0;

export default (state=initalState, { type: actionType, value }) => {
  if (actionType === AUTO_FILL_IN_CHANGE) {
    return value;
  }
  return state;
}
