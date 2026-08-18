import React from "react";
import * as stylex from "@stylexjs/stylex";

import Octicon from "react-octicon";

import Button from "components/button";

import { PERSISTANCE_FILTER } from "store-constants";
import { tokens } from "theme/variables.stylex";

const styles = stylex.create({
  button: {
    borderRadius: 4,
    backgroundColor: tokens.buttonColor,
    marginLeft: 5,
    marginRight: 5
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: tokens.darkGrey,
    transform: "scale(0.7)"
  }
});

const SaveButton = props => {
  const { storeState, xstyle, iconXstyle } = props;

  const saveOpCounter = React.useRef(0);
  const handlePress = React.useCallback(() => {
    const opId = ++saveOpCounter.current;
    const fileSaverPromise = import("file-saver");

    // only save properties defined by persistance filter
    const saveObj = {};
    PERSISTANCE_FILTER.forEach(key => {
      saveObj[key] = storeState[key];
    });

    const saveString = JSON.stringify(saveObj);
    const saveData = new Blob([saveString], {
      type: "text/plain;charset=utf-8"
    });

    fileSaverPromise.then(res => {
      const { saveAs } = res.default;
      if (opId === saveOpCounter.current) {
        saveAs(saveData, "io808.json");
      }
    });
  }, [storeState]);

  return (
    <Button
      xstyle={[styles.button, xstyle]}
      disabled={storeState.playing}
      onClick={handlePress}
    >
      <Octicon
        title="Save"
        {...stylex.props(styles.icon, iconXstyle)}
        name="desktop-download"
        mega
      />
    </Button>
  );
};

export default SaveButton;
