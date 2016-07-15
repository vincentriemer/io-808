import { connect } from 'react-redux';
import {
  onBasicVariationChange,
  onStartStopButtonClick,
  onIFVariationChange,
  onTapButtonClick,
  onPreScaleChange
} from '../../actionCreators';

import BasicVariationSwitch from '../../components/basicVariationSwitch/basicVariationSwitch';
import Button from '../../components/button/button';
import IFVariationSwitch from '../../components/IFVariationSwtich/IFVariationSwitch';
import PreScaleSwitch from '../../components/preScaleSwitch/preScaleSwitch';
import PartLights from '../../components/partLights';

export const ConnectedBasicVariationSwitch = (() => {
  // TODO: properly infer state of aActive and bActive
  const mapStateToProps = (state) => ({
    position: state.basicVariation,
    aActive: false,
    bActive: false
  });

  const mapDispatchToProps = (dispatch) => ({
    onChange: (position) => dispatch(onBasicVariationChange(position))
  });

  return connect(mapStateToProps, mapDispatchToProps)(BasicVariationSwitch);
})();

export const ConnectedStartStopButton = (() => {
  const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(onStartStopButtonClick())
  });

  return connect(null, mapDispatchToProps)(Button);
})();

export const ConnectedIFVariationSwitch = (() => {
  const mapStateToProps = (state) => ({
    position: state.IFVariation
  });

  const mapDispatchToProps = (dispatch) => ({
    onChange: (position) => dispatch(onIFVariationChange(position))
  });

  return connect(mapStateToProps, mapDispatchToProps)(IFVariationSwitch);
})();

export const ConnectedTapButton = (() => {
  const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(onTapButtonClick())
  });

  return connect(null, mapDispatchToProps)(Button);
})();

export const ConnectedPreScaleSwitch = (() => {
  const mapStateToProps = (state) => ({
    position: state.preScaleSwitch
  });

  const mapDispatchToProps = (dispatch) => (() => ({
    onChange: (position) => dispatch(onPreScaleChange(position))
  }));

  return connect(mapStateToProps, mapDispatchToProps)(PreScaleSwitch);
})();

export const ConnectedPartLights = (() => {
  // TODO: properly infer state of firstActive and secondActive
  const mapStateToProps = (state) => ({
    firstActive: false,
    secondActive: false
  });

  return connect(null, mapStateToProps)(PartLights);
})();