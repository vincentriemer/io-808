import React from "react";
import * as stylex from "@stylexjs/stylex";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const styles = stylex.create({
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
  controlWrapper: {
    position: "relative",
    width: 70,
    height: 70
  },
  guides: {
    width: 4,
    height: 4,
    backgroundColor: tokens.grey,
    borderRadius: "50%"
  },
  knobWrapper: {
    width: "75%",
    height: "75%"
  },
  knob: {
    width: 53,
    height: 53
  },
  selectorInnerRing: {
    width: 45,
    height: 45
  },
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
    width: 35
  },
  alignRight: {
    textAlign: "right"
  },
  alignLeft: {
    textAlign: "left"
  }
});

const FineTempoKnob = props => {
  const { value, onChange, xstyle } = props;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.labelWrapper)}>
        <div
          {...stylex.props(themeStyles.labelBase, themeStyles.labelGreyNormal)}
        >
          FINE
        </div>
      </div>
      <div {...stylex.props(styles.controlWrapper)}>
        <Guides
          num={11}
          distance={33.6}
          hideCount={1}
          guideStyle={styles.guides}
        />
        <div {...stylex.props(themeStyles.ring, styles.knobWrapper)}>
          <Knob
            value={value}
            onChange={onChange}
            bufferSize={300}
            min={-6.75}
            max={6.75}
            step={0.1}
            xstyle={styles.knob}
          >
            <SelectorKnobInner
              xstyle={styles.knob}
              innerRingXstyle={styles.selectorInnerRing}
            />
          </Knob>
        </div>
      </div>
      <div {...stylex.props(styles.knobLabelWrapper)}>
        <div
          {...stylex.props(
            themeStyles.labelBase,
            themeStyles.labelGreySmall,
            styles.knobLabel,
            styles.alignRight
          )}
        >
          SLOW
        </div>
        <div
          {...stylex.props(
            themeStyles.labelBase,
            themeStyles.labelGreySmall,
            styles.knobLabel,
            styles.alignLeft
          )}
        >
          FAST
        </div>
      </div>
    </div>
  );
};

export default FineTempoKnob;
