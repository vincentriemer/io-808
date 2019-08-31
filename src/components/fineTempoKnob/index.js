import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { grey } from "theme/variables";
import { ring, labelGreyNormal, labelGreySmall } from "theme/mixins";

const labelHeight = 20;

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  labelWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  label: labelGreyNormal,
  controlWrapper: {
    position: "relative"
  },
  guides: {
    width: 4,
    height: 4,
    backgroundColor: grey,
    borderRadius: "50%"
  },
  knobWrapper: ring("75%"),
  knobLabelWrapper: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 20,
    width: "150%",
    bottom: "-23%",
    left: "50%",
    transform: "translateX(-50%)"
  },
  knobLabel: {
    ...labelGreySmall,
    width: 35
  }
};

const FineTempoKnob = props => {
  const { value, onChange, size = 72 } = props;
  const knobSize = Math.ceil(size * 0.75);
  return (
    <div style={{ ...styles.wrapper, width: size, height: size + labelHeight }}>
      <div style={styles.labelWrapper}>
        <div style={styles.label}>FINE</div>
      </div>
      <div style={{ ...styles.controlWrapper, width: size, height: size }}>
        <Guides
          num={11}
          distance={size * 0.48}
          hideCount={1}
          guideStyle={styles.guides}
        />
        <div style={styles.knobWrapper}>
          <Knob
            value={value}
            onChange={onChange}
            bufferSize={300}
            min={-6.75}
            max={6.75}
            step={0.1}
            size={knobSize}
          >
            <SelectorKnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
      <div style={styles.knobLabelWrapper}>
        <div style={{ ...styles.knobLabel, textAlign: "right" }}>SLOW</div>
        <div style={{ ...styles.knobLabel, textAlign: "left" }}>FAST</div>
      </div>
    </div>
  );
};

export default FineTempoKnob;
