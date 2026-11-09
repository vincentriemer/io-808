import React from "react";
import * as stylex from "@stylexjs/stylex";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const labelHeight = 38;

const measuresOptions = [
  { displayName: "Manual", value: 0 },
  { displayName: "16", value: 1 },
  { displayName: "12", value: 2 },
  { displayName: "8", value: 3 },
  { displayName: "4", value: 4 },
  { displayName: "2", value: 5 }
];

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  controlWrapper: {
    position: "relative",
    width: 151,
    height: 151,
    minWidth: 151,
    minHeight: 151
  },
  dotGuide: {
    width: 5,
    height: 5,
    backgroundColor: tokens.grey,
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
  autoLabel: {
    position: "relative",
    top: 0
  },
  manualGuide: {
    transform: "translateX(-15px)"
  },
  knob: {
    width: 76,
    height: 76
  },
  selectorSpokes: {
    width: 56,
    height: 56
  },
  selectorInnerRing: {
    width: 46,
    height: 46
  },
  labelWidth: {
    width: 151
  }
});

const guideValues = [
  <div {...stylex.props(styles.manualGuide)}>MANUAL</div>,
  16,
  12,
  8,
  4,
  2
];

const AutoFillInKnob = props => {
  const { value, onChange, xstyle } = props;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.controlWrapper)}>
        <Guides
          num={6}
          distance={43.79}
          hideCount={6}
          guideStyle={styles.dotGuide}
        />
        <Guides
          distance={55.87}
          hideCount={5.5}
          values={guideValues}
          rotate={false}
          guideStyle={[themeStyles.labelBase, themeStyles.labelGreySmall]}
        />
        <div {...stylex.props(themeStyles.ring, styles.knob)}>
          <Knob
            type="select"
            value={value}
            onChange={onChange}
            xstyle={styles.knob}
            bufferSize={150}
            options={measuresOptions}
          >
            <SelectorKnobInner
              xstyle={styles.knob}
              spokesXstyle={styles.selectorSpokes}
              innerRingXstyle={styles.selectorInnerRing}
            />
          </Knob>
        </div>
      </div>
      <div {...stylex.props(styles.labelWrapper, styles.labelWidth)}>
        <div
          {...stylex.props(themeStyles.labelBase, themeStyles.labelGreySmall)}
        >
          MEASURES
        </div>
        <div
          {...stylex.props(
            themeStyles.labelBase,
            themeStyles.labelGreyLarge,
            styles.autoLabel
          )}
        >
          AUTO FILL IN
        </div>
      </div>
    </div>
  );
};

export default AutoFillInKnob;
