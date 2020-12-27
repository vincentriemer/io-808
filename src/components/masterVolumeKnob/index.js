import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { grey } from "theme/variables";
import { labelGreySmall, labelGreyNormal, ring } from "theme/mixins";

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

const labelHeight = 9;

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
  dotGuides: {
    width: 5,
    height: 5,
    backgroundColor: grey,
    borderRadius: "50%"
  },
  labelGuides: labelGreySmall,
  label: {
    position: "relative",
    ...labelGreyNormal,
    overflow: "visible",
    top: -4
  }
};

const MasterVolumeKnob = props => {
  const { value, onChange, size = 130 } = props;
  const knobSize = Math.ceil(size * 0.54);
  return (
    <div style={{ ...styles.wrapper, width: size, height: size + labelHeight }}>
      <div style={{ ...styles.controlWrapper, width: size, height: size }}>
        <Guides
          num={11}
          distance={size * 0.33}
          hideCount={1}
          guideStyle={styles.dotGuides}
        />
        <Guides
          distance={size * 0.45}
          hideCount={1}
          rotate={false}
          values={labelValues}
          guideStyle={styles.labelGuides}
        />
        <div style={ring(knobSize)}>
          <Knob
            value={value}
            onChange={onChange}
            size={knobSize}
            bufferSize={300}
            min={0}
            max={100}
            step={1}
          >
            <SelectorKnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
      <div style={{ ...styles.label, width: size }}>MASTER VOLUME</div>
    </div>
  );
};

export default MasterVolumeKnob;
