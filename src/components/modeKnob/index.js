import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { grey } from "theme/variables";
import { ring } from "theme/mixins";

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  controlWrapper: {
    position: "relative"
  },
  knobWrapper: ring("100%"),
  guides: {
    width: 5,
    height: 5,
    backgroundColor: grey,
    borderRadius: "50%"
  }
};

const ModeKnob = props => {
  const { value, onChange, size = 100 } = props;
  return (
    <div style={{ ...styles.wrapper, width: size, height: size }}>
      <div style={{ ...styles.controlWrapper, width: size, height: size }}>
        <Guides
          num={6}
          distance={size * 0.58}
          hideCount={6}
          guideStyle={styles.guides}
        />
        <div style={styles.knobWrapper}>
          <Knob
            value={value}
            onChange={onChange}
            size={size}
            bufferSize={150}
            min={0}
            max={5}
            step={1}
          >
            <SelectorKnobInner size={size} />
          </Knob>
        </div>
      </div>
    </div>
  );
};

export default ModeKnob;
