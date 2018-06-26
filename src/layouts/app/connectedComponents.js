import { connect } from "react-redux";
import React from "react";

// Action Creators
import { onStateLoad, onReset } from "actionCreators";

// Components
import SaveButton from "components/saveButton";
import LoadButton from "components/loadButton";
import Button from "components/button";

import { buttonColor, darkGrey } from "theme/variables";
import { labelGreyLarge } from "theme/mixins";

export const ConnectedSaveButton = (() => {
  const mapStateToProps = state => ({
    storeState: state
  });

  return connect(mapStateToProps)(SaveButton);
})();

export const ConnectedLoadButton = (() => {
  const mapStateToProps = state => ({
    playing: state.playing
  });

  const mapDispatchToProps = dispatch => ({
    onLoadedState: loadedState => dispatch(onStateLoad(loadedState))
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoadButton);
})();

export const ConnectedResetButton = (() => {
  const mapStateToProps = state => ({
    disabled: state.playing
  });

  const mapDispatchToProps = dispatch => ({
    onClick: () => {
      if (confirm("Are you sure you want to reset your sequencer?"))
        dispatch(onReset());
    }
  });

  const component = ({ size, ...rest }) => (
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
        alignItems: "center"
      }}
    >
      Reset
    </Button>
  );

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
})();
