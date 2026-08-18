import React from "react";
import * as stylex from "@stylexjs/stylex";

import Knob from "components/knob";
import Guides from "components/guides";
import SelectorKnobInner from "components/selectorKnobInner";

import {
  ACCENT,
  BASS_DRUM,
  SNARE_DRUM,
  LOW_CONGA_LOW_TOM,
  MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM,
  CLAVES_RIMSHOT,
  MARACAS_HANDCLAP,
  COWBELL,
  CYMBAL,
  OPEN_HIHAT,
  CLSD_HIHAT
} from "store-constants";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

const guideNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const guideLabels = [
  "AC",
  "BD",
  "SD",
  "LT",
  "MT",
  "HT",
  "RS",
  "CP",
  "CB",
  "CY",
  "OH",
  "CH"
];

const instrumentOptions = [
  { displayName: "Accent", value: ACCENT },
  { displayName: "Bass Drum", value: BASS_DRUM },
  { displayName: "Snare Drum", value: SNARE_DRUM },
  { displayName: "Low Conga/Low Tom", value: LOW_CONGA_LOW_TOM },
  { displayName: "Mid Conga/Mid Tom", value: MID_CONGA_MID_TOM },
  { displayName: "Hi Conga/Hi Tom", value: HI_CONGA_HI_TOM },
  { displayName: "Claves/Rimshot", value: CLAVES_RIMSHOT },
  { displayName: "Maracas/Handclap", value: MARACAS_HANDCLAP },
  { displayName: "Cowbell", value: COWBELL },
  { displayName: "Cymbal", value: CYMBAL },
  { displayName: "Open Hi-hat", value: OPEN_HIHAT },
  { displayName: "Closed Hi-hat", value: CLSD_HIHAT }
];

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  controlWrapper: {
    position: "relative",
    width: 151,
    height: 151
  },
  numberGuides: {
    fontFamily: tokens.panelFontFamily,
    fontSize: tokens.smallSize,
    fontWeight: tokens.fontWeight,
    letterSpacing: tokens.letterSpacing,
    color: tokens.stencilOrange
  },
  labelGuides: {
    fontFamily: tokens.panelFontFamily,
    fontSize: tokens.normalSize,
    fontWeight: "normal",
    letterSpacing: tokens.letterSpacing,
    color: tokens.darkGrey,
    backgroundColor: tokens.drumLabel,
    borderRadius: 3,
    textAlign: "center",
    width: 27,
    paddingTop: 2,
    paddingBottom: 2
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

const InstrumentSelectorKnob = props => {
  const { value, onChange, xstyle } = props;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.controlWrapper)}>
        <Guides
          distance={45.3}
          offset={15}
          rotate={false}
          values={guideNumbers}
          guideStyle={[themeStyles.unselectableText, styles.numberGuides]}
        />
        <Guides
          distance={67.95}
          offset={15}
          rotate={false}
          values={guideLabels}
          guideStyle={[themeStyles.unselectableText, styles.labelGuides]}
        />
        <div {...stylex.props(themeStyles.ring, styles.knob)}>
          <Knob
            type="select"
            value={value}
            onChange={onChange}
            xstyle={styles.knob}
            bufferSize={330}
            options={instrumentOptions}
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

export default InstrumentSelectorKnob;
