import { connect } from 'react-redux';
import {
  onClearClick,
  onModeChange,
  onInstrumentTrackChange,
  onAutoFillInChange,
  onTempoChange,
  onFineTempoChange
} from 'actionCreators';

import Button from 'components/button';
import ModeKnob from 'components/modeKnob';
import InstrumentSelectorKnob from 'components/instrumentSelectorKnob';
import AutoFillInKnob from 'components/autoFillInKnob';
import TempoKnob from 'components/tempoKnob';
import FineTempoKnob from 'components/fineTempoKnob';

export const ConnectedClearButton = (() => {
  const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(onClearClick())
  });
  return connect(null, mapDispatchToProps)(Button);
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
