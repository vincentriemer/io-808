import * as React from "react";
import * as stylex from "@stylexjs/stylex";

import { tokens } from "theme/variables.stylex";

import {
  quarterNotePath,
  quarterViewBox,
  eighthNotePath,
  eightViewBox,
  noteLinePath
} from "./stencilPaths";

const TimeSigSectionContext = React.createContext({});

const QUARTER_STEP_WIDTH = 217.75;
const NOTE_PADDING = QUARTER_STEP_WIDTH / 12;
const TRIPLET_NOTE_PADDING_RIGHT =
  NOTE_PADDING + QUARTER_STEP_WIDTH / 3.8;

const styles = stylex.create({
  linePadding: {
    position: "absolute",
    width: 5,
    height: 27.5,
    right: 0,
    top: 0,
    backgroundColor: tokens.grey
  },
  sixthNoteLine: {
    position: "absolute",
    width: 160.8125,
    height: 27.5,
    top: 0,
    left: NOTE_PADDING
  },
  tripletNoteLine: {
    position: "absolute",
    width: 331.625,
    height: 27.5,
    top: 0,
    left: NOTE_PADDING
  },
  stepBase: {
    position: "relative",
    borderRadius: 6,
    backgroundColor: tokens.grey,
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sixthStep: {
    width: 160.8125,
    height: 27.5,
    marginRight: 10,
    paddingLeft: NOTE_PADDING,
    paddingRight: NOTE_PADDING
  },
  tripletStep: {
    width: 331.625,
    height: 27.5,
    marginRight: 10,
    paddingLeft: NOTE_PADDING,
    paddingRight: TRIPLET_NOTE_PADDING_RIGHT
  },
  quarterStep: {
    width: 217.75,
    height: 27.5,
    marginRight: 10,
    paddingLeft: NOTE_PADDING,
    paddingRight: NOTE_PADDING
  },
  halfStep: {
    width: 445.5,
    height: 27.5,
    marginRight: 10,
    paddingLeft: NOTE_PADDING,
    paddingRight: NOTE_PADDING
  },
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  row: {
    position: "relative",
    width: 901,
    height: 27.5,
    display: "flex",
    flexDirection: "row",
    overflow: "hidden"
  }
});

function EighthNote({ visible = false }) {
  const { eightWidth, noteHeight } = React.useContext(TimeSigSectionContext);
  return (
    <svg viewBox={eightViewBox} width={eightWidth} height={noteHeight}>
      <path d={eighthNotePath} fill={visible ? tokens.darkGrey : "none"} />
    </svg>
  );
}

function QuarterNote() {
  const { quarterWidth, noteHeight } = React.useContext(TimeSigSectionContext);
  return (
    <svg viewBox={quarterViewBox} width={quarterWidth} height={noteHeight}>
      <path d={quarterNotePath} fill={tokens.darkGrey} />
    </svg>
  );
}

function LinePadding() {
  return <div {...stylex.props(styles.linePadding)} />;
}

function SixthLine() {
  const { eightWidth, quarterStepWidth, sixthStepWidth, rowHeight } =
    React.useContext(TimeSigSectionContext);
  const path = noteLinePath(eightWidth + 7, quarterStepWidth / 2, 8);
  return (
    <div {...stylex.props(styles.sixthNoteLine)}>
      <svg width={sixthStepWidth} height={rowHeight}>
        <path d={path} stroke={tokens.darkGrey} fill="none" />
      </svg>
    </div>
  );
}

function SixthStep() {
  return (
    <div {...stylex.props(styles.stepBase, styles.sixthStep)}>
      <SixthLine />
      <EighthNote visible sixth />
      <EighthNote visible sixth />
      <EighthNote visible sixth />
    </div>
  );
}

function TripletLine() {
  const { eightWidth, trippletStepWidth, quarterStepWidth, rowHeight } =
    React.useContext(TimeSigSectionContext);
  const path = noteLinePath(
    eightWidth + 7,
    trippletStepWidth - quarterStepWidth / 2,
    17
  );
  return (
    <div {...stylex.props(styles.tripletNoteLine)}>
      <svg width={trippletStepWidth} height={rowHeight}>
        <path d={path} stroke={tokens.darkGrey} fill="none" />
      </svg>
    </div>
  );
}

function TrippletStep() {
  return (
    <div {...stylex.props(styles.stepBase, styles.tripletStep)}>
      <TripletLine />
      <EighthNote visible />
      <EighthNote />
      <EighthNote visible />
      <EighthNote />
      <EighthNote visible />
    </div>
  );
}

function QuarterStep() {
  return (
    <div {...stylex.props(styles.stepBase, styles.quarterStep)}>
      <QuarterNote />
    </div>
  );
}

function HalfStep() {
  return (
    <div {...stylex.props(styles.stepBase, styles.halfStep)}>
      <QuarterNote />
    </div>
  );
}

function TimeSignatureSection(props) {
  const { xstyle } = props;
  const rowHeight = 27.5;
  const trippletStepWidth = 331.625;
  const sixthStepWidth = 160.8125;
  const noteHeight = 16;
  const quarterWidth = 9;
  const eightWidth = 11;

  const contextValue = React.useMemo(
    () => ({
      eightWidth,
      noteHeight,
      quarterWidth,
      rowHeight,
      quarterStepWidth: QUARTER_STEP_WIDTH,
      sixthStepWidth,
      trippletStepWidth
    }),
    [
      rowHeight,
      sixthStepWidth,
      trippletStepWidth
    ]
  );

  return (
    <TimeSigSectionContext.Provider value={contextValue}>
      <div {...stylex.props(styles.wrapper, xstyle)}>
        <div {...stylex.props(styles.row)}>
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <LinePadding />
        </div>
        <div {...stylex.props(styles.row)}>
          <TrippletStep />
          <TrippletStep />
          <TrippletStep />
          <LinePadding />
        </div>
        <div {...stylex.props(styles.row)}>
          <QuarterStep />
          <QuarterStep />
          <QuarterStep />
          <QuarterStep />
        </div>
        <div {...stylex.props(styles.row)}>
          <HalfStep />
          <HalfStep />
        </div>
      </div>
    </TimeSigSectionContext.Provider>
  );
}

export default TimeSignatureSection;
