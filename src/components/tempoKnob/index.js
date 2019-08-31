import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { labelGreyLarge, ring, unselectableText } from "theme/mixins";
import {
  grey,
  darkGrey,
  fontFamily,
  normalSize,
  fontWeight,
  letterSpacing
} from "theme/variables";

const guideNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let guideValues = [];
for (let i = 0; i < 41; i++) {
  let size = i % 4 === 0 ? 5 : 4;
  guideValues.push(
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: grey,
        borderRadius: "50%"
      }}
    />
  );
}

const labelHeight = 25;

const styles = {
  wrapper: {
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
  label: labelGreyLarge,
  controlWrapper: {
    position: "relative"
  },
  labelGuides: {
    fontFamily,
    fontWeight,
    letterSpacing,
    fontSize: normalSize,
    color: darkGrey,
    ...unselectableText
  }
};

const TempoKnob = props => {
  const { value, onChange, size = 216 } = props;
  const innerSize = size - 30;
  const knobSize = Math.floor(size * 0.75);
  return (
    <div style={{ ...styles.wrapper, width: size, height: size + labelHeight }}>
      <div style={styles.labelWrapper}>
        <div style={styles.label}>TEMPO</div>
      </div>
      <div style={{ ...styles.controlWrapper, width: size, height: size }}>
        <div style={ring(size, grey)}>
          <Guides
            distance={size - 97.5}
            hideCount={1}
            values={guideNumbers}
            rotate={false}
            guideStyle={styles.labelGuides}
          />
          <div style={ring(innerSize, darkGrey)}>
            <Guides
              num={41}
              distance={size - 109}
              hideCount={7}
              values={guideValues}
            />
            <div style={ring(knobSize)}>
              <Knob
                value={value}
                onChange={onChange}
                size={knobSize}
                bufferSize={300}
                min={30}
                max={300}
                step={6.75}
              >
                <SelectorKnobInner size={knobSize} />
              </Knob>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempoKnob;
