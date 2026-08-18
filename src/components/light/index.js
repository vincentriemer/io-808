import React from "react";
import * as stylex from "@stylexjs/stylex";

import { tokens } from "theme/variables.stylex";

const size = 18;
const innerPadding = 4;

const styles = stylex.create({
  outer: {
    position: "relative",
    backgroundColor: tokens.lightBezel,
    width: size,
    height: size,
    borderRadius: "50%",
    pointerEvents: "none"
  },
  inner: {
    position: "absolute",
    left: innerPadding,
    right: innerPadding,
    top: innerPadding,
    bottom: innerPadding,
    borderRadius: "50%"
  },
  inactive: {
    backgroundColor: tokens.lightInactive
  },
  active: {
    backgroundColor: tokens.lightActive,
    transition: "opacity 0.1s"
  },
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
});

const Light = props => {
  const { active } = props;
  return (
    <div {...stylex.props(styles.outer)}>
      <div {...stylex.props(styles.inner, styles.inactive)} />
      <div
        {...stylex.props(
          styles.inner,
          styles.active,
          active ? styles.visible : styles.hidden
        )}
      />
    </div>
  );
};

export default Light;
