import { useSelector, useDispatch } from "react-redux";
import React from "react";

// Action Creators
import { onStateLoad, onReset } from "actionCreators";

// Components
import SaveButton from "components/saveButton";
import LoadButton from "components/loadButton";
import Button from "components/button";

import { buttonColor, darkGrey } from "theme/variables";
import { labelGreyLarge } from "theme/mixins";

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

  const { size, ...rest } = props;

  return (
    <Button
      {...rest}
      style={{
        ...labelGreyLarge,
        color: darkGrey,
        width: "auto",
        height: size,
        padding: 7,
        borderRadius: 4,
        backgroundColor: buttonColor,
        marginLeft: 5,
        marginRight: 5,
        display: "flex",
        alignItems: "center",
        cursor: "pointer"
      }}
      onClick={onClick}
      disabled={disabled}
    >
      Reset
    </Button>
  );
};
