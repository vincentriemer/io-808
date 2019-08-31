import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { grey } from "theme/variables";
import { labelGreySmall, labelGreyLarge, ring } from "theme/mixins";

const labelHeight = 33;

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  controlWrapper: {
    position: "relative"
  },
  labelGuide: labelGreySmall,
  dotGuide: {
    width: 5,
    height: 5,
    backgroundColor: grey,
    borderRadius: "50%"
  },
  labelWrapper: {
    position: "relative",
    top: -30,
    height: labelHeight,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  measuresLabel: labelGreySmall,
  autoLabel: {
    position: "relative",
    top: -2,
    ...labelGreyLarge
  }
};

const guideValues = [
  <div style={{ transform: "translateX(-15px)" }}>MANUAL</div>,
  16,
  12,
  8,
  4,
  2
];

const AutoFillInKnob = props => {
  const { value, onChange, size = 200 } = props;
  const knobSize = size - 75;
  return (
    <div style={{ ...styles.wrapper, width: size, height: size }}>
      <div
        style={{
          ...styles.controlWrapper,
          width: size,
          height: size,
          minWidth: size,
          minHeight: size
        }}
      >
        <Guides
          num={6}
          distance={size * 0.29}
          hideCount={6}
          guideStyle={styles.dotGuide}
        />
        <Guides
          distance={size * 0.37}
          hideCount={5.5}
          values={guideValues}
          rotate={false}
          guideStyle={styles.labelGuide}
        />
        <div style={ring(knobSize)}>
          <Knob
            value={value}
            onChange={onChange}
            size={knobSize}
            bufferSize={150}
            min={0}
            max={5}
            step={1}
          >
            <SelectorKnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
      <div style={{ ...styles.labelWrapper, width: size }}>
        <div style={styles.measuresLabel}>MEASURES</div>
        <div style={styles.autoLabel}>AUTO FILL IN</div>
      </div>
    </div>
  );
};

export default AutoFillInKnob;
