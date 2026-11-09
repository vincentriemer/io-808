import React from "react";
import * as stylex from "@stylexjs/stylex";

import Knob from "components/knob";
import Guides from "components/guides";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const styles = stylex.create({
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  labelWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  controlWrapper: {
    position: "relative",
    width: 65,
    height: 65
  },
  knobWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 39,
    height: 39
  },
  knob: {
    width: 39,
    height: 39
  },
  inner: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: tokens.drumHandle,
    borderWidth: 8
  },
  levelInner: {
    backgroundColor: tokens.levelKnobInner
  },
  miscInner: {
    backgroundColor: tokens.miscKnobInner
  },
  handle: {
    position: "absolute",
    width: 4,
    height: 12,
    backgroundColor: tokens.drumHandle,
    top: -6,
    left: "50%",
    transform: "translateX(-50%)"
  },
  guide: {
    width: 2,
    height: 65 / 3,
    backgroundColor: tokens.grey
  },
  levelInd: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: tokens.levelKnobInner,
    right: "8%",
    top: "37%"
  }
});

const DrumKnob = React.memo(
  props => {
    const { value, onChange, xstyle, label = "", level = false } = props;
    let levelInd = null,
      maxValue = 100;
    if (level) {
      levelInd = <div {...stylex.props(styles.levelInd)} />;
    }
    return (
      <div {...stylex.props(styles.wrapper, xstyle)}>
        <div {...stylex.props(styles.labelWrapper)}>
          <span
            {...stylex.props(
              themeStyles.labelBase,
              themeStyles.labelGreyNormal
            )}
          >
            {label}
          </span>
        </div>
        <div {...stylex.props(styles.controlWrapper)}>
          {levelInd}
          <div>
            <Guides
              num={11}
              distance={65 / 3}
              hideCount={1}
              guideStyle={styles.guide}
            />
          </div>
          <div {...stylex.props(styles.knobWrapper, themeStyles.ring)}>
            <Knob
              value={value}
              onChange={onChange}
              xstyle={styles.knob}
              min={0}
              max={maxValue}
              step={2}
              bufferSize={300}
            >
              <div
                {...stylex.props(
                  styles.inner,
                  level ? styles.levelInner : styles.miscInner
                )}
              >
                <div {...stylex.props(styles.handle)} />
              </div>
            </Knob>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) => prev.value === next.value
);

export default DrumKnob;
