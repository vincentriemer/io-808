import React from "react";

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

import {
  panelFontFamily,
  normalSize,
  letterSpacing,
  smallSize,
  fontWeight,
  darkGrey,
  drumLabel,
  stencilOrange
} from "theme/variables";
import { unselectableText } from "theme/mixins";

import { ring } from "theme/mixins";

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
  numberGuides: {
    fontFamily: panelFontFamily,
    fontSize: smallSize,
    fontWeight,
    letterSpacing,
    color: stencilOrange,
    ...unselectableText
  },
  labelGuides: {
    fontFamily: panelFontFamily,
    fontSize: normalSize,
    fontWeight: "normal",
    letterSpacing,
    color: darkGrey,
    backgroundColor: drumLabel,
    borderRadius: 3,
    textAlign: "center",
    width: 27,
    paddingTop: 2,
    paddingBottom: 2,
    ...unselectableText
  }
};

const InstrumentSelectorKnob = props => {
  const { value, onChange, size = 200 } = props;
  const knobSize = size - 75;
  return (
    <div style={{ ...styles.wrapper, width: size, height: size }}>
      <div style={{ ...styles.controlWrapper, width: size, height: size }}>
        <Guides
          distance={size * 0.3}
          offset={15}
          rotate={false}
          values={guideNumbers}
          guideStyle={styles.numberGuides}
        />
        <Guides
          distance={size * 0.45}
          offset={15}
          rotate={false}
          values={guideLabels}
          guideStyle={styles.labelGuides}
        />
        <div style={ring(knobSize)}>
          <Knob
            type="select"
            value={value}
            onChange={onChange}
            size={knobSize}
            bufferSize={330}
            options={instrumentOptions}
          >
            <SelectorKnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
    </div>
  );
};

export default InstrumentSelectorKnob;
