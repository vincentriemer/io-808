import React from "react";
import { connect } from "react-redux";
import {
  onBasicVariationChange,
  onStartStopButtonClick,
  onIFVariationChange,
  onTapButtonClick,
  onPreScaleChange,
  onStepButtonClick,
  onClearDragDrop,
  onClearDragEnter,
  onClearDragExit,
} from "actionCreators";
import AudioCtxContext from "audioCtxContext";

// Components
import BasicVariationSwitch from "components/basicVariationSwitch";
import Button from "components/button";
import IFVariationSwitch from "components/IFVariationSwtich";
import PreScaleSwitch from "components/preScaleSwitch";
import PartLights from "components/partLights";
import StepButton from "components/stepButton";

// Selectors
import StepButtonSelectorFactory from "selectors/stepButton";
import basicVariationSelector from "selectors/variation";
import { getCurrentPart } from "selectors/common";

// Constants
import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  FIRST_PART,
  SECOND_PART,
} from "store-constants";

export const ConnectedBasicVariationSwitch = (() => {
  const mapStateToProps = state => ({
    position: state.basicVariationPosition,
    lightState: basicVariationSelector(state),
  });

  const mapDispatchToProps = dispatch => ({
    onChange: position => dispatch(onBasicVariationChange(position)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(BasicVariationSwitch);
})();

export const ConnectedStartStopButton = (() => {
  const mapDispatchToProps = (dispatch, { requestInit }) => ({
    onClick: () => {
      requestInit();
      dispatch(onStartStopButtonClick());
    },
  });

  const mapStateToProps = state => ({
    disabled: state.selectedMode === MODE_PATTERN_CLEAR,
  });

  const ConnectedButton = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Button);

  return rootProps => (
    <AudioCtxContext.Consumer>
      {({ requestInit }) => (
        <ConnectedButton requestInit={requestInit} {...rootProps} />
      )}
    </AudioCtxContext.Consumer>
  );
})();

export const ConnectedIFVariationSwitch = (() => {
  const mapStateToProps = state => ({
    position: state.introFillVariationPosition,
  });

  const mapDispatchToProps = dispatch => ({
    onChange: position => dispatch(onIFVariationChange(position)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(IFVariationSwitch);
})();

export const ConnectedTapButton = (() => {
  const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(onTapButtonClick()),
  });

  const mapStateToProps = state => ({
    disabled: (() => {
      switch (state.selectedMode) {
        case MODE_PATTERN_CLEAR:
          return true;
        case MODE_FIRST_PART:
        case MODE_SECOND_PART:
          return !state.playing;
        case MODE_MANUAL_PLAY:
          return false;
        default:
          return true;
      }
    })(),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Button);
})();

export const ConnectedPreScaleSwitch = (() => {
  const mapStateToProps = state => ({
    position: 2,
  });

  const mapDispatchToProps = dispatch => ({
    onChange: position => dispatch(onPreScaleChange(position)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PreScaleSwitch);
})();

export const ConnectedPartLights = (() => {
  const mapStateToProps = state => ({
    currentPart: getCurrentPart(state),
  });

  return connect(
    mapStateToProps,
    null
  )(PartLights);
})();

export const ConnectedStepButtons = (() => {
  const buttons = [];

  for (let i = 0; i < 16; i++) {
    const selector = StepButtonSelectorFactory(i);

    const mapStateToProps = state => ({
      active: selector(state),
      dropable: state.clearDragging,
    });

    const mapDispatchToProps = dispatch => ({
      onClick: () => dispatch(onStepButtonClick(i)),
      onDrop: () => dispatch(onClearDragDrop(i + 1)),
      onDragEnter: () => dispatch(onClearDragEnter(i)),
      onDragExit: () => dispatch(onClearDragExit()),
    });

    buttons.push(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(StepButton)
    );
  }

  return buttons;
})();
