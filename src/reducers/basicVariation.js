import {BASIC_VARIATION_CHANGE} from '../actionTypes';

const initialState = {
  position: 0,
  aActive: false,
  bActive: false
};

export default (state=initialState, { type: actionType, position }) => {
  if (actionType === BASIC_VARIATION_CHANGE) {
    return {
      ...state,
      position
    };
  }
  return state;
}