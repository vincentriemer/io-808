import { connect } from 'react-redux';
import {
  onBasicVariationChange,
  onStartStopButtonClick,
  onIFVariationChange,
  onTapButtonClick,
  onPreScaleChange,
  onStepButtonClick
} from '../../actionCreators';

// Components
import BasicVariationSwitch from '../../components/basicVariationSwitch/basicVariationSwitch';
import Button from '../../components/button/button';
import IFVariationSwitch from '../../components/IFVariationSwtich/IFVariationSwitch';
import PreScaleSwitch from '../../components/preScaleSwitch/preScaleSwitch';
import PartLights from '../../components/partLights';
import StepButton from '../../components/stepButton';

// Selectors
import StepButtonSelectorFactory from '../../selectors/stepButton';

// Constants
import {FIRST_PART, SECOND_PART} from '../../constants';

export const ConnectedBasicVariationSwitch = (() => {
  // TODO: properly infer state of aActive and bActive
  const mapStateToProps = (state) => ({
    position: state.basicVariationPosition,
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
    position: state.introFillVariationPosition
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
    position: 2
  });

  const mapDispatchToProps = (dispatch) => ({
    onChange: (position) => dispatch(onPreScaleChange(position))
  });

  return connect(mapStateToProps, mapDispatchToProps)(PreScaleSwitch);
})();

export const ConnectedPartLights = (() => {
  // TODO: properly infer state of firstActive and secondActive
  const mapStateToProps = (state) => ({
    firstActive: state.currentPart === FIRST_PART,
    secondActive: state.currentPart === SECOND_PART
  });

  return connect(mapStateToProps, null)(PartLights);
})();

export const ConnectedStepButtons = (() => {
  const buttons = [];

  for(let i = 0; i < 16; i++) {
    const selector = StepButtonSelectorFactory(i);

    const mapStateToProps = (state) => ({
      active: selector(state)
    });

    const mapDispatchToProps = (dispatch) => ({
      onClick: () => dispatch(onStepButtonClick(i))
    });

    buttons.push(connect(mapStateToProps, mapDispatchToProps)(StepButton));
  }

  return buttons;
})();