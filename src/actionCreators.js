import {
  INSTRUMENT_CHANGE,
  MASTER_VOLUME_CHANGE,
  BASIC_VARIATION_CHANGE,
  START_STOP_BUTTON_CLICK,
  IF_VARIATION_CHANGE,
  TAP_BUTTON_CLICK,
  PRE_SCALE_CHANGE,
  STEP_BUTTON_CLICK,
  CLEAR_CLICK,
  AUTO_FILL_IN_CHANGE,
  FINE_TEMPO_CHANGE,
  INSTRUMENT_TRACK_CHANGE,
  MODE_CHANGE,
  TEMPO_CHANGE
} from './actionTypes';

export const onAutoFillInChange = (value) => ({
  type: AUTO_FILL_IN_CHANGE,
  value
});

export const onFineTempoChange = (value) => ({
  type: FINE_TEMPO_CHANGE,
  value
});

export const onInstrumentTrackChange = (value) => ({
  type: INSTRUMENT_TRACK_CHANGE,
  value
});

export const onModeChange = (value) => ({
  type: MODE_CHANGE,
  value
});

export const onTempoChange = (value) => ({
  type: TEMPO_CHANGE,
  value
});

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

export const onStepButtonClick = (index) => ({
  type: STEP_BUTTON_CLICK,
  index
});

export const onClearClick = () => ({
  type: CLEAR_CLICK
});
