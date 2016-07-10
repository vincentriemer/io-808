import {PRE_SCALE_CHANGE} from '../actionTypes';

const initialState = 0;

export default (state=initialState, { type, position }) => {
  if (type === PRE_SCALE_CHANGE) {
    return position;
  } else {
    return state;
  }
};