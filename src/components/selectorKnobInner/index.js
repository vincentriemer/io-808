import React from "react";
import * as stylex from "@stylexjs/stylex";

import Guides from "components/guides";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const guideSize = 6;
const styles = stylex.create({
  guides: {
    width: guideSize,
    height: guideSize,
    borderRadius: "50%",
    backgroundColor: tokens.darkBlack
  },
  wrapper: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: tokens.darkBlack
  },
  spokes: {
    backgroundColor: tokens.slightlyDarkerBlack
  },
  innerRing: {
    backgroundColor: tokens.drumHandle
  },
  lowerHandle: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 8,
    height: 15,
    backgroundColor: tokens.drumHandle,
    opacity: 0.6
  },
  handle: {
    position: "absolute",
    top: "8.5%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 5,
    height: 15,
    backgroundColor: tokens.stencilOrange,
    borderRadius: 1
  }
});

const SelectorKnobInner = React.memo(
  props => {
    const { xstyle, spokesXstyle, innerRingXstyle, guideDistance } = props;
    const guides =
      guideDistance != null ? (
        <Guides num={60} distance={guideDistance} guideStyle={styles.guides} />
      ) : null;
    const spokes =
      spokesXstyle != null ? (
        <div {...stylex.props(themeStyles.ring, styles.spokes, spokesXstyle)} />
      ) : null;
    return (
      <div {...stylex.props(styles.wrapper, xstyle)}>
        {spokes}
        {guides}
        <div {...stylex.props(styles.lowerHandle)} />
        <div
          {...stylex.props(themeStyles.ring, styles.innerRing, innerRingXstyle)}
        />
        <div {...stylex.props(styles.handle)} />
      </div>
    );
  },
  () => true
);

export default SelectorKnobInner;
