import React from "react";

import Guides from "components/guides";

import { ring } from "theme/mixins";
import {
  darkBlack,
  slightlyDarkerBlack,
  drumHandle,
  stencilOrange
} from "theme/variables";

const guideSize = 6;
const styles = {
  guides: {
    width: guideSize,
    height: guideSize,
    borderRadius: "50%",
    backgroundColor: darkBlack
  },
  wrapper: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: darkBlack
  },
  lowerHandle: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 8,
    height: 15,
    backgroundColor: drumHandle,
    opacity: 0.6
  },
  handle: {
    position: "absolute",
    top: "8.5%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 5,
    height: 15,
    backgroundColor: stencilOrange,
    borderRadius: 1
  }
};

const SelectorKnobInner = React.memo(
  props => {
    const { size } = props;
    const guides =
      size > 90 ? (
        <Guides num={60} distance={size / 2 - 9.5} guideStyle={styles.guides} />
      ) : null;
    const spokes =
      size > 60 ? <div style={ring(size - 20, slightlyDarkerBlack)} /> : null;
    return (
      <div style={{ ...styles.wrapper, width: size, height: size }}>
        {spokes}
        {guides}
        <div style={styles.lowerHandle} />
        <div
          style={{
            ...ring(size - 30, drumHandle),
            ...(size < 60 ? { width: size - 8, height: size - 8 } : {})
          }}
        />
        <div style={styles.handle} />
      </div>
    );
  },
  () => true
);

export default SelectorKnobInner;
