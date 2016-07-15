import {BASIC_VARIATION_CHANGE} from '../actionTypes';

const initialState = 0;

export default (state=initialState, { type: actionType, position }) => {
  if (actionType === BASIC_VARIATION_CHANGE) {
    return position;
  }
  return state;
}