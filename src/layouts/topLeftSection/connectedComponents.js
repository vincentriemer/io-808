import { connect } from 'react-redux';
import {
  onModeChange,
  onInstrumentTrackChange,
  onAutoFillInChange,
  onTempoChange,
  onFineTempoChange,
  onClearDown,
  onClearUp
} from 'actionCreators';

import ClearButton from 'components/clearButton'
import ModeKnob from 'components/modeKnob';
import InstrumentSelectorKnob from 'components/instrumentSelectorKnob';
import AutoFillInKnob from 'components/autoFillInKnob';
import TempoKnob from 'components/tempoKnob';
import FineTempoKnob from 'components/fineTempoKnob';

export const ConnectedClearButton = (() => {
  const mapDispatchToProps = (dispatch) => ({
    onMouseDown: () => dispatch(onClearDown()),
    onMouseUp: () => dispatch(onClearUp())
  });
  return connect(null, mapDispatchToProps)(ClearButton);
})();

export const ConnectedModeKnob = (() => {
  const mapStateToProps = (state) => ({
    value: state.selectedMode
  });
  const mapDispatchToProps = (dispatch) => ({
    onChange: (value) => dispatch(onModeChange(value))
  });
  return connect(mapStateToProps, mapDispatchToProps)(ModeKnob);
})();

export const ConnectedInstrumentSelectorKnob = (() => {
  const mapStateToProps = (state) => ({
    value: state.selectedInstrumentTrack
  });
  const mapDispatchToProps = (dispatch) => ({
    onChange: (value) => dispatch(onInstrumentTrackChange(value))
  });
  return connect(mapStateToProps, mapDispatchToProps)(InstrumentSelectorKnob);
})();

export const ConnectedAutoFillInKnob = (() => {
  const mapStateToProps = (state) => ({
    value: state.autoFillInPosition
  });
  const mapDispatchToProps = (dispatch) => ({
    onChange: (value) => dispatch(onAutoFillInChange(value))
  });
  return connect(mapStateToProps, mapDispatchToProps)(AutoFillInKnob);
})();

export const ConnectedTempoKnob = (() => {
  const mapStateToProps = (state) => ({
    value: state.tempo
  });
  const mapDispatchToProps = (dispatch) => ({
    onChange: (value) => dispatch(onTempoChange(value))
  });
  return connect(mapStateToProps, mapDispatchToProps)(TempoKnob);
})();

export const ConnectedFineTempoKnob = (() => {
  const mapStateToProps = (state) => ({
    value: state.fineTempo
  });
  const mapDispatchToProps = (dispatch) => ({
    onChange: (value) => dispatch(onFineTempoChange(value))
  });
  return connect(mapStateToProps, mapDispatchToProps)(FineTempoKnob);
})();
