import React from "react";
import PropTypes from 'prop-types';
import Radium from "radium";

import Knob from "components/knob";
import Guides from "components/guides";

import {
  drumHandle,
  levelKnobInner,
  miscKnobInner,
  grey
} from "theme/variables";
import { labelGreyNormal, ring } from "theme/mixins";

export const LABEL_HEIGHT = 30;

class DrumKnob extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    const {
      value,
      onChange,
      size = 75,
      label = "",
      level = false
    } = this.props;

    const knobSize = Math.ceil(size * 0.6);

    const styles = {
      wrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: size,
        height: size + LABEL_HEIGHT
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
        position: "relative",
        width: size,
        height: size
      },

      knobWrapper: {
        ...ring(knobSize),
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
        border: `solid ${drumHandle} 8px`,
        backgroundColor: level ? levelKnobInner : miscKnobInner
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
        height: size / 3,
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

    let levelInd = null,
      maxValue = 100;
    if (level) {
      levelInd = <div style={styles.levelInd} />;
    }

    return (
      <div style={styles.wrapper}>
        <div style={styles.labelWrapper}>
          <span style={styles.label}>{label}</span>
        </div>
        <div style={styles.controlWrapper}>
          {levelInd}
          <div style={styles.guideWrapper}>
            <Guides
              num={11}
              distance={size / 3}
              hideCount={1}
              guideStyle={styles.guide}
            />
          </div>
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              size={knobSize}
              min={0}
              max={maxValue}
              step={2}
              bufferSize={300}
            >
              <div style={styles.inner}>
                <div style={styles.handle} />
              </div>
            </Knob>
          </div>
        </div>
      </div>
    );
  }
}

DrumKnob.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.bool
};

export default Radium(DrumKnob);
