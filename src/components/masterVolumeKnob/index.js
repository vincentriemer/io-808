import React from "react";
import * as stylex from "@stylexjs/stylex";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const labelValues = [];
for (let i = 0; i < 11; i++) {
  if (i === 0) {
    labelValues.push("MIN");
  } else if (i === 10) {
    labelValues.push("MAX");
  } else {
    labelValues.push(i);
  }
}

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  controlWrapper: {
    position: "relative",
    width: 129,
    height: 129
  },
  dotGuides: {
    width: 5,
    height: 5,
    backgroundColor: tokens.grey,
    borderRadius: "50%"
  },
  label: {
    position: "relative",
    overflow: "visible",
    top: -4,
    width: 129
  },
  knob: {
    width: 70,
    height: 70
  },
  selectorSpokes: {
    width: 50,
    height: 50
  },
  selectorInnerRing: {
    width: 40,
    height: 40
  }
});

const MasterVolumeKnob = props => {
  const { value, onChange, xstyle } = props;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.controlWrapper)}>
        <Guides
          num={11}
          distance={42.57}
          hideCount={1}
          guideStyle={styles.dotGuides}
        />
        <Guides
          distance={58.05}
          hideCount={1}
          rotate={false}
          values={labelValues}
          guideStyle={[themeStyles.labelBase, themeStyles.labelGreySmall]}
        />
        <div {...stylex.props(themeStyles.ring, styles.knob)}>
          <Knob
            value={value}
            onChange={onChange}
            xstyle={styles.knob}
            bufferSize={300}
            min={0}
            max={100}
            step={1}
          >
            <SelectorKnobInner
              xstyle={styles.knob}
              spokesXstyle={styles.selectorSpokes}
              innerRingXstyle={styles.selectorInnerRing}
            />
          </Knob>
        </div>
      </div>
      <div
        {...stylex.props(
          themeStyles.labelBase,
          themeStyles.labelGreyNormal,
          styles.label
        )}
      >
        MASTER VOLUME
      </div>
    </div>
  );
};

export default MasterVolumeKnob;
