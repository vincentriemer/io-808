import {
  INSTRUMENT_CHANGE,
  MASTER_VOLUME_CHANGE,
  BASIC_VARIATION_CHANGE,
  START_STOP_BUTTON_CLICK,
  IF_VARIATION_CHANGE,
  TAP_BUTTON_CLICK,
  PRE_SCALE_CHANGE
} from './actionTypes';

export const onInstrumentChange = (type, controlName, value) => ({
  type: INSTRUMENT_CHANGE,
  payload: {
    type, controlName, value
  }
});

export const onMasterVolumeChange = (value) => ({
  type: MASTER_VOLUME_CHANGE,
  value
});

export const onBasicVariationChange = (position) => ({
  type: BASIC_VARIATION_CHANGE,
  position
});

export const onStartStopButtonClick = () => ({
  type: START_STOP_BUTTON_CLICK
});

export const onIFVariationChange = (position) => ({
  type: IF_VARIATION_CHANGE,
  position
});

export const onTapButtonClick = () => ({
  type: TAP_BUTTON_CLICK
});

export const onPreScaleChange = (position) => ({
  type: PRE_SCALE_CHANGE,
  position
});
