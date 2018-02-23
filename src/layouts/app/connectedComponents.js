import { connect } from "react-redux";
import React from "react";

// Action Creators
import { onStateLoad, onReset, onLinkChange } from "actionCreators";

// Components
import SaveButton from "components/saveButton";
import LoadButton from "components/loadButton";
import Button from "components/button";

import { buttonColor, darkGrey } from "theme/variables";
import { labelGreyLarge } from "theme/mixins";
import InstrumentLabel from "components/instrumentLabel";

const createButton = name => {
  return ({ size, ...rest }) => (
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
      {name}
    </Button>
  );
};

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

  return connect(mapStateToProps, mapDispatchToProps)(LoadButton);
})();

export const ConnectedAbletonLinkButton = (() => {
  const mapStateToProps = state => ({
    tempo: state.tempo
  });

  const mapDispatchToProps = dispatch => ({
    onClick: () => {
      dispatch(onLinkChange());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(
    createButton("Ablteon Link")
  );
})();

export const ConnectedAbletonLabel = (() => {
  const mapStateToProps = state => ({
    label: [Math.round(state.tempo).toString()],
    isLinkEnabled: state.isLinkEnabled
  });

  return connect(mapStateToProps)(({ isLinkEnabled, ...rest }) => {
    if (isLinkEnabled) {
      return <InstrumentLabel {...rest} />;
    } else {
      return null;
    }
  });
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

  return connect(mapStateToProps, mapDispatchToProps)(createButton("Reset"));
})();
