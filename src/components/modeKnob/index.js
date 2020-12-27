import React from "react";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { grey } from "theme/variables";
import { ring } from "theme/mixins";
import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  MODE_RHYTHM_TRACK_PLAY,
  MODE_RHYTHM_TRACK_COMPOSE
} from "store-constants";

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  controlWrapper: {
    position: "relative"
  },
  knobWrapper: ring("100%"),
  guides: {
    width: 5,
    height: 5,
    backgroundColor: grey,
    borderRadius: "50%"
  }
};

const modeOptions = [
  { displayName: "Pattern Clear", value: MODE_PATTERN_CLEAR },
  { displayName: "Pattern Write - First Part", value: MODE_FIRST_PART },
  { displayName: "Pattern Write - Second Part", value: MODE_SECOND_PART },
  { displayName: "Manual Play", value: MODE_MANUAL_PLAY },
  { displayName: "Play", value: MODE_RHYTHM_TRACK_PLAY },
  { displayName: "Compose", value: MODE_RHYTHM_TRACK_COMPOSE }
];

const ModeKnob = props => {
  const { value, onChange, size = 100 } = props;
  return (
    <div style={{ ...styles.wrapper, width: size, height: size }}>
      <div style={{ ...styles.controlWrapper, width: size, height: size }}>
        <Guides
          num={6}
          distance={size * 0.58}
          hideCount={6}
          guideStyle={styles.guides}
        />
        <div style={styles.knobWrapper}>
          <Knob
            type="select"
            value={value}
            onChange={onChange}
            size={size}
            bufferSize={150}
            options={modeOptions}
          >
            <SelectorKnobInner size={size} />
          </Knob>
        </div>
      </div>
    </div>
  );
};

export default ModeKnob;
