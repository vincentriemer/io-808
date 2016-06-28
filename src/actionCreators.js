import {
  INSTRUMENT_CHANGE,
  MASTER_VOLUME_CHANGE
} from './actionTypes';

export const onInstrumentChange = (type, controlName, value) => ({
  type: INSTRUMENT_CHANGE,
  payload: {
    type, controlName, value
  }
});

export const onMasterVolumeChange = (value) => ({
  type: MASTER_VOLUME_CHANGE, value
});
