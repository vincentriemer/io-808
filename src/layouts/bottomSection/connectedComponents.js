import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onBasicVariationChange,
  onStartStopButtonClick,
  onIFVariationChange,
  onTapButtonClick,
  onPreScaleChange,
  onStepButtonClick,
  onClearDragDrop,
  onClearDragEnter,
  onClearDragExit
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
  MODE_MANUAL_PLAY
} from "store-constants";

export const ConnectedBasicVariationSwitch = props => {
  const position = useSelector(state => state.basicVariationPosition);
  const lightState = useSelector(basicVariationSelector);

  const dispatch = useDispatch();
  const onChange = React.useCallback(
    position => dispatch(onBasicVariationChange(position)),
    [dispatch]
  );

  return (
    <BasicVariationSwitch
      {...props}
      position={position}
      lightState={lightState}
      onChange={onChange}
    />
  );
};

export const ConnectedStartStopButton = props => {
  const { requestInit } = React.useContext(AudioCtxContext);

  const disabled = useSelector(
    state => state.selectedMode === MODE_PATTERN_CLEAR
  );

  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    requestInit();
    dispatch(onStartStopButtonClick());
  }, [dispatch, requestInit]);

  return <Button {...props} disabled={disabled} onClick={onClick} />;
};

export const ConnectedIFVariationSwitch = props => {
  const position = useSelector(state => state.introFillVariationPosition);

  const dispatch = useDispatch();
  const onChange = React.useCallback(
    position => dispatch(onIFVariationChange(position)),
    [dispatch]
  );

  return (
    <IFVariationSwitch {...props} position={position} onChange={onChange} />
  );
};

export const ConnectedTapButton = props => {
  const disabled = useSelector(state => {
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
  });

  const dispatch = useDispatch();
  const onClick = React.useCallback(() => dispatch(onTapButtonClick()), [
    dispatch
  ]);

  return <Button {...props} disabled={disabled} onClick={onClick} />;
};

export const ConnectedPreScaleSwitch = props => {
  const position = useSelector(() => 2);

  const dispatch = useDispatch();
  const onChange = React.useCallback(
    position => dispatch(onPreScaleChange(position)),
    [dispatch]
  );

  return <PreScaleSwitch {...props} position={position} onChange={onChange} />;
};

export const ConnectedPartLights = props => {
  const currentPart = useSelector(getCurrentPart);
  return <PartLights {...props} currentPart={currentPart} />;
};

export const ConnectedStepButtons = [];
for (let i = 0; i < 16; i++) {
  const selector = StepButtonSelectorFactory(i);
  const ConnectedStepButton = props => {
    const active = useSelector(selector);
    const dropable = useSelector(state => state.clearDragging);

    const dispatch = useDispatch();
    const onClick = React.useCallback(() => dispatch(onStepButtonClick(i)), [
      dispatch
    ]);
    const onDrop = React.useCallback(() => dispatch(onClearDragDrop(i + 1)), [
      dispatch
    ]);
    const onDragEnter = React.useCallback(() => dispatch(onClearDragEnter(i)), [
      dispatch
    ]);
    const onDragExit = React.useCallback(() => dispatch(onClearDragExit()), [
      dispatch
    ]);

    return (
      <StepButton
        {...props}
        active={active}
        dropable={dropable}
        onClick={onClick}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragExit={onDragExit}
      />
    );
  };
  ConnectedStepButtons.push(ConnectedStepButton);
}
