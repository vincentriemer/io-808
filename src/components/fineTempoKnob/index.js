import React from "react";
import PropTypes from 'prop-types';
import Radium from "radium";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { grey } from "theme/variables";
import { ring, labelGreyNormal, labelGreySmall } from "theme/mixins";

const labelHeight = 20;

class FineTempoKnob extends React.Component {
  render() {
    const { value, onChange, size = 72 } = this.props;

    const styles = {
      wrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        width: size,
        height: size + labelHeight
      },

      labelWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },

      label: labelGreyNormal,

      controlWrapper: {
        position: "relative",
        width: size,
        height: size
      },

      guides: {
        width: 4,
        height: 4,
        backgroundColor: grey,
        borderRadius: "50%"
      },

      knobWrapper: ring("75%"),

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
        ...labelGreySmall,
        width: 35
      }
    };

    const knobSize = Math.ceil(size * 0.75);

    return (
      <div style={styles.wrapper}>
        <div style={styles.labelWrapper}>
          <div style={styles.label}>FINE</div>
        </div>
        <div style={styles.controlWrapper}>
          <Guides
            num={11}
            distance={size * 0.48}
            hideCount={1}
            guideStyle={styles.guides}
          />
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              bufferSize={300}
              min={-6.75}
              max={6.75}
              step={0.1}
              size={knobSize}
            >
              <SelectorKnobInner size={knobSize} />
            </Knob>
          </div>
        </div>
        <div style={styles.knobLabelWrapper}>
          <div style={[styles.knobLabel, { textAlign: "right" }]}>SLOW</div>
          <div style={[styles.knobLabel, { textAlign: "left" }]}>FAST</div>
        </div>
      </div>
    );
  }
}

FineTempoKnob.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default Radium(FineTempoKnob);
