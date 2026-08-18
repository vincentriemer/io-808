import React from "react";
import * as stylex from "@stylexjs/stylex";
import Switch from "components/switch";

import { tokens } from "theme/variables.stylex";

const borderRadius = 2;
const styles = stylex.create({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inner: {
    width: 14,
    height: 22,
    backgroundColor: tokens.drumSwitchHandle,
    borderRadius: borderRadius
  },
  outer: {
    width: 22,
    height: 50,
    padding: 4,
    backgroundColor: tokens.slightlyDarkerBlack,
    borderRadius: borderRadius
  },
  position0: {
    transform: "translateY(0px)"
  },
  position1: {
    transform: "translateY(20px)"
  }
});

const positionXstyles = [styles.position0, styles.position1];

const DrumSwitch = props => {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <Switch
        {...props}
        direction="vertical"
        outerXstyle={styles.outer}
        handleXstyle={styles.inner}
        positionXstyles={positionXstyles}
      />
    </div>
  );
};

export default DrumSwitch;
