import React from "react";
import PropTypes from "prop-types";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { grey } from "theme/variables";
import { ring } from "theme/mixins";

class ModeKnob extends React.Component {
  render() {
    const { value, onChange, size = 100 } = this.props;

    const styles = {
      wrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        width: size,
        height: size
      },

      controlWrapper: {
        position: "relative",
        width: size,
        height: size
      },

      knobWrapper: ring("100%"),

      guides: {
        width: 5,
        height: 5,
        backgroundColor: grey,
        borderRadius: "50%"
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.controlWrapper}>
          <Guides
            num={6}
            distance={size * 0.58}
            hideCount={6}
            guideStyle={styles.guides}
          />
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              size={size}
              bufferSize={150}
              min={0}
              max={5}
              step={1}
            >
              <SelectorKnobInner size={size} />
            </Knob>
          </div>
        </div>
      </div>
    );
  }
}

ModeKnob.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default ModeKnob;
