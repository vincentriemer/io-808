import React from "react";
import Switch from "components/switch";

import { slightlyDarkerBlack, drumSwitchHandle } from "theme/variables";

const borderRadius = 2;
const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inner: {
    backgroundColor: drumSwitchHandle,
    borderRadius: borderRadius
  },
  outer: {
    backgroundColor: slightlyDarkerBlack,
    borderRadius: borderRadius
  }
};

const DrumSwitch = props => {
  return (
    <div style={styles.wrapper}>
      <Switch
        {...props}
        direction="vertical"
        numPositions={2}
        thickness={22}
        length={50}
        padding={4}
        innerThickness={22}
        outerStyle={styles.outer}
        innerStyle={styles.inner}
      />
    </div>
  );
};

export default DrumSwitch;
