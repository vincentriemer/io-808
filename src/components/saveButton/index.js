import React from "react";

import Octicon from "react-octicon";

import Button from "components/button";

import { PERSISTANCE_FILTER } from "store-constants";
import { buttonColor, darkGrey } from "theme/variables";

const styles = {
  button: {
    borderRadius: 4,
    backgroundColor: buttonColor,
    marginLeft: 5,
    marginRight: 5
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: darkGrey,
    transform: "scale(0.7)"
  }
};

const SaveButton = props => {
  const { storeState, size = 50 } = props;

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

    fileSaverPromise.then(({ saveAs }) => {
      if (opId === saveOpCounter.current) {
        saveAs(saveData, "io808.json");
      }
    });
  }, [storeState]);

  return (
    <Button
      style={{ ...styles.button, width: size, height: size }}
      disabled={storeState.playing}
      onClick={handlePress}
    >
      <Octicon
        title="Save"
        style={{ ...styles.icon, width: size, height: size }}
        name="desktop-download"
        mega
      />
    </Button>
  );
};

export default SaveButton;
