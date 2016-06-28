import {MASTER_VOLUME_CHANGE} from '../actionTypes';

export default (state=100, action) => {
  switch(action.type) {
    case MASTER_VOLUME_CHANGE:
      return action.value;
    default:
      return state;
  }
}
