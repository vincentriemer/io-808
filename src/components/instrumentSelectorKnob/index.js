import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import {
  panelFontFamily,
  normalSize,
  letterSpacing,
  smallSize,
  fontWeight,
  darkGrey,
  drumLabel,
  stencilOrange
} from "theme/variables";
import { unselectableText } from "theme/mixins";

import { ring } from "theme/mixins";

const guideNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const guideLabels = [
  "AC",
  "BD",
  "SD",
  "LT",
  "MT",
  "HT",
  "RS",
  "CP",
  "CB",
  "CY",
  "OH",
  "CH"
];

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
  numberGuides: {
    fontFamily: panelFontFamily,
    fontSize: smallSize,
    fontWeight,
    letterSpacing,
    color: stencilOrange,
    ...unselectableText
  },
  labelGuides: {
    fontFamily: panelFontFamily,
    fontSize: normalSize,
    fontWeight: "normal",
    letterSpacing,
    color: darkGrey,
    backgroundColor: drumLabel,
    borderRadius: 3,
    textAlign: "center",
    width: 27,
    paddingTop: 2,
    paddingBottom: 2,
    ...unselectableText
  }
};

const InstrumentSelectorKnob = props => {
  const { value, onChange, size = 200 } = props;
  const knobSize = size - 75;
  return (
    <div style={{ ...styles.wrapper, width: size, height: size }}>
      <div style={{ ...styles.controlWrapper, width: size, height: size }}>
        <Guides
          distance={size * 0.3}
          offset={15}
          rotate={false}
          values={guideNumbers}
          guideStyle={styles.numberGuides}
        />
        <Guides
          distance={size * 0.45}
          offset={15}
          rotate={false}
          values={guideLabels}
          guideStyle={styles.labelGuides}
        />
        <div style={ring(knobSize)}>
          <Knob
            value={value}
            onChange={onChange}
            size={knobSize}
            bufferSize={330}
            min={0}
            max={11}
            step={1}
          >
            <SelectorKnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
    </div>
  );
};

export default InstrumentSelectorKnob;
