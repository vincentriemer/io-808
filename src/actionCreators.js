import {
  INSTRUMENT_CHANGE,
  MASTER_VOLUME_CHANGE,
  BASIC_VARIATION_CHANGE,
  START_STOP_BUTTON_CLICK,
  IF_VARIATION_CHANGE,
  TAP_BUTTON_CLICK,
  PRE_SCALE_CHANGE,
  STEP_BUTTON_CLICK,
  AUTO_FILL_IN_CHANGE,
  FINE_TEMPO_CHANGE,
  INSTRUMENT_TRACK_CHANGE,
  MODE_CHANGE,
  TEMPO_CHANGE,
  TICK,
  BLINK_TICK,
  CLEAR_DOWN,
  CLEAR_UP,
  CLEAR_DRAG_START,
  CLEAR_DRAG_END,
  CLEAR_DRAG_DROP,
  STATE_LOAD
} from 'actionTypes';

export const onAutoFillInChange = (value) => ({
  type: AUTO_FILL_IN_CHANGE,
  payload: value
});

export const onFineTempoChange = (value) => ({
  type: FINE_TEMPO_CHANGE,
  payload: value
});

export const onInstrumentTrackChange = (value) => ({
  type: INSTRUMENT_TRACK_CHANGE,
  payload: value
});

export const onModeChange = (value) => ({
  type: MODE_CHANGE,
  payload: value
});

export const onTempoChange = (value) => ({
  type: TEMPO_CHANGE,
  payload: value
});

export const onInstrumentChange = (type, controlName, value) => ({
  type: INSTRUMENT_CHANGE,
  payload: {
    type, controlName, value
  }
});

export const onMasterVolumeChange = (value) => ({
  type: MASTER_VOLUME_CHANGE,
  payload: value
});

export const onBasicVariationChange = (position) => ({
  type: BASIC_VARIATION_CHANGE,
  payload: position
});

export const onStartStopButtonClick = () => ({
  type: START_STOP_BUTTON_CLICK
});

export const onIFVariationChange = (position) => ({
  type: IF_VARIATION_CHANGE,
  payload: position
});

export const onTapButtonClick = () => ({
  type: TAP_BUTTON_CLICK
});

export const onPreScaleChange = (position) => ({
  type: PRE_SCALE_CHANGE,
  payload: position
});

export const onStepButtonClick = (index) => ({
  type: STEP_BUTTON_CLICK,
  payload: index
});

export const onTick = () => ({
  type: TICK
});

export const onBlinkTick = () => ({
  type: BLINK_TICK
});

export const onClearDown = () => ({
  type: CLEAR_DOWN
});

export const onClearUp = () => ({
  type: CLEAR_UP
});

export const onClearDragStart = () => ({
  type: CLEAR_DRAG_START
});

export const onClearDragEnd = () => ({
  type: CLEAR_DRAG_END
});

export const onClearDragDrop = (length) => ({
  type: CLEAR_DRAG_DROP,
  payload: length
});

export const onStateLoad = (loadedState) => ({
  type: STATE_LOAD,
  payload: loadedState
});