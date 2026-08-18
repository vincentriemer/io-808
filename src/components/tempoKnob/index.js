import React from "react";
import * as stylex from "@stylexjs/stylex";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const guideNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const styles = stylex.create({
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
  controlWrapper: {
    position: "relative",
    width: 180,
    height: 180
  },
  labelGuides: {
    fontFamily: tokens.panelFontFamily,
    fontWeight: tokens.fontWeight,
    letterSpacing: tokens.letterSpacing,
    fontSize: tokens.normalSize,
    color: tokens.darkGrey
  },
  guide: {
    backgroundColor: tokens.grey,
    borderRadius: "50%"
  },
  majorGuide: {
    width: 5,
    height: 5
  },
  minorGuide: {
    width: 4,
    height: 4
  },
  outerRing: {
    width: 180,
    height: 180,
    backgroundColor: tokens.grey
  },
  innerRing: {
    width: 150,
    height: 150,
    backgroundColor: tokens.darkGrey
  },
  knob: {
    width: 135,
    height: 135
  },
  selectorSpokes: {
    width: 115,
    height: 115
  },
  selectorInnerRing: {
    width: 105,
    height: 105
  }
});

let guideValues = [];
for (let i = 0; i < 41; i++) {
  const major = i % 4 === 0;
  guideValues.push(
    <div
      {...stylex.props(
        styles.guide,
        major ? styles.majorGuide : styles.minorGuide
      )}
    />
  );
}

const TempoKnob = props => {
  const { value, onChange, xstyle } = props;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.labelWrapper)}>
        <div
          {...stylex.props(themeStyles.labelBase, themeStyles.labelGreyLarge)}
        >
          TEMPO
        </div>
      </div>
      <div {...stylex.props(styles.controlWrapper)}>
        <div {...stylex.props(themeStyles.ring, styles.outerRing)}>
          <Guides
            distance={82.5}
            hideCount={1}
            values={guideNumbers}
            rotate={false}
            guideStyle={[themeStyles.unselectableText, styles.labelGuides]}
          />
          <div {...stylex.props(themeStyles.ring, styles.innerRing)}>
            <Guides num={41} distance={71} hideCount={7} values={guideValues} />
            <div {...stylex.props(themeStyles.ring, styles.knob)}>
              <Knob
                value={value}
                onChange={onChange}
                xstyle={styles.knob}
                bufferSize={300}
                min={30}
                max={300}
                step={6.75}
              >
                <SelectorKnobInner
                  xstyle={styles.knob}
                  spokesXstyle={styles.selectorSpokes}
                  innerRingXstyle={styles.selectorInnerRing}
                  guideDistance={58}
                />
              </Knob>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempoKnob;
