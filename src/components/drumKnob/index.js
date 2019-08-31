import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";

import {
  drumHandle,
  levelKnobInner,
  miscKnobInner,
  grey
} from "theme/variables";
import { labelGreyNormal, ring } from "theme/mixins";

const styles = {
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

  label: {
    ...labelGreyNormal
  },

  controlWrapper: {
    position: "relative"
  },

  knobWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  inner: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: `solid ${drumHandle} 8px`
  },

  handle: {
    position: "absolute",
    width: 4,
    height: 12,
    backgroundColor: drumHandle,
    top: -6,
    left: "50%",
    transform: "translateX(-50%)"
  },

  guide: {
    width: 2,
    backgroundColor: grey
  },

  levelInd: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: levelKnobInner,
    right: "8%",
    top: "37%"
  }
};

export const LABEL_HEIGHT = 30;

const DrumKnob = React.memo(
  props => {
    const { value, onChange, size = 75, label = "", level = false } = props;
    const knobSize = Math.ceil(size * 0.6);
    let levelInd = null,
      maxValue = 100;
    if (level) {
      levelInd = <div style={styles.levelInd} />;
    }
    return (
      <div
        style={{ ...styles.wrapper, width: size, height: size + LABEL_HEIGHT }}
      >
        <div style={styles.labelWrapper}>
          <span style={styles.label}>{label}</span>
        </div>
        <div style={{ ...styles.controlWrapper, width: size, height: size }}>
          {levelInd}
          <div style={styles.guideWrapper}>
            <Guides
              num={11}
              distance={size / 3}
              hideCount={1}
              guideStyle={{ ...styles.guide, height: size / 3 }}
            />
          </div>
          <div style={{ ...styles.knobWrapper, ...ring(knobSize) }}>
            <Knob
              value={value}
              onChange={onChange}
              size={knobSize}
              min={0}
              max={maxValue}
              step={2}
              bufferSize={300}
            >
              <div
                style={{
                  ...styles.inner,
                  backgroundColor: level ? levelKnobInner : miscKnobInner
                }}
              >
                <div style={styles.handle} />
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
