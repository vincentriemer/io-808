import { connect } from 'react-redux';
import {
  onBasicVariationChange,
  onStartStopButtonClick,
  onIFVariationChange,
  onTapButtonClick,
  onPreScaleChange,
  onStepButtonClick
} from 'actionCreators';

// Components
import BasicVariationSwitch from 'components/basicVariationSwitch';
import Button from 'components/button';
import IFVariationSwitch from 'components/IFVariationSwtich';
import PreScaleSwitch from 'components/preScaleSwitch';
import PartLights from 'components/partLights';
import StepButton from 'components/stepButton';

// Selectors
import StepButtonSelectorFactory from 'selectors/stepButton';
import currentPartSelector from 'selectors/currentPart';
import basicVariationSelector from 'selectors/basicVariation';

// Constants
import {FIRST_PART, SECOND_PART, MODE_PATTERN_CLEAR} from 'constants';

export const ConnectedBasicVariationSwitch = (() => {
  // TODO: properly infer state of aActive and bActive
  const mapStateToProps = (state) => ({
    position: state.basicVariationPosition,
    lightState: basicVariationSelector(state)
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

  const mapStateToProps = (state) => ({
    disabled: state.selectedMode === MODE_PATTERN_CLEAR
  });

  return connect(mapStateToProps, mapDispatchToProps)(Button);
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

  const mapStateToProps = (state) => ({
    disabled: state.selectedMode === MODE_PATTERN_CLEAR
  });

  return connect(mapStateToProps, mapDispatchToProps)(Button);
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
  const mapStateToProps = (state) => ({
    currentPart: currentPartSelector(state)
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