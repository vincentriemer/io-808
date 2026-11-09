import { useSelector, useDispatch } from "react-redux";
import React from "react";
import * as stylex from "@stylexjs/stylex";

// Action Creators
import { onStateLoad, onReset } from "actionCreators";

// Components
import SaveButton from "components/saveButton";
import LoadButton from "components/loadButton";
import Button from "components/button";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const styles = stylex.create({
  resetButton: {
    color: tokens.darkGrey,
    width: "auto",
    padding: 7,
    borderRadius: 4,
    backgroundColor: tokens.buttonColor,
    marginLeft: 5,
    marginRight: 5,
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  }
});

export const ConnectedSaveButton = props => {
  const storeState = useSelector(state => state);
  return <SaveButton storeState={storeState} {...props} />;
};

export const ConnectedLoadButton = props => {
  const playing = useSelector(state => state.playing);

  const dispatch = useDispatch();
  const onLoadedState = React.useCallback(
    loadedState => dispatch(onStateLoad(loadedState)),
    [dispatch]
  );

  return (
    <LoadButton {...props} playing={playing} onLoadedState={onLoadedState} />
  );
};

export const ConnectedResetButton = props => {
  const disabled = useSelector(state => state.playing);

  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    if (confirm("Are you sure you want to reset your sequencer?")) {
      dispatch(onReset());
    }
  }, [dispatch]);

  return (
    <Button
      {...props}
      xstyle={[
        themeStyles.labelBase,
        themeStyles.labelGreyLarge,
        styles.resetButton,
        props.xstyle
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      Reset
    </Button>
  );
};
