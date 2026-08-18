import React from "react";
import * as stylex from "@stylexjs/stylex";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";
import {
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  MODE_RHYTHM_TRACK_PLAY,
  MODE_RHYTHM_TRACK_COMPOSE
} from "store-constants";

const styles = stylex.create({
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  controlWrapper: {
    position: "relative",
    width: 76,
    height: 76
  },
  knobWrapper: {
    width: "100%",
    height: "100%"
  },
  guides: {
    width: 5,
    height: 5,
    backgroundColor: tokens.grey,
    borderRadius: "50%"
  },
  knob: {
    width: 76,
    height: 76
  },
  selectorSpokes: {
    width: 56,
    height: 56
  },
  selectorInnerRing: {
    width: 46,
    height: 46
  }
});

const modeOptions = [
  { displayName: "Pattern Clear", value: MODE_PATTERN_CLEAR },
  { displayName: "Pattern Write - First Part", value: MODE_FIRST_PART },
  { displayName: "Pattern Write - Second Part", value: MODE_SECOND_PART },
  { displayName: "Manual Play", value: MODE_MANUAL_PLAY },
  { displayName: "Play", value: MODE_RHYTHM_TRACK_PLAY },
  { displayName: "Compose", value: MODE_RHYTHM_TRACK_COMPOSE }
];

const ModeKnob = props => {
  const { value, onChange, xstyle } = props;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.controlWrapper)}>
        <Guides
          num={6}
          distance={44.08}
          hideCount={6}
          guideStyle={styles.guides}
        />
        <div {...stylex.props(themeStyles.ring, styles.knobWrapper)}>
          <Knob
            type="select"
            value={value}
            onChange={onChange}
            xstyle={styles.knob}
            bufferSize={150}
            options={modeOptions}
          >
            <SelectorKnobInner
              xstyle={styles.knob}
              spokesXstyle={styles.selectorSpokes}
              innerRingXstyle={styles.selectorInnerRing}
            />
          </Knob>
        </div>
      </div>
    </div>
  );
};

export default ModeKnob;
