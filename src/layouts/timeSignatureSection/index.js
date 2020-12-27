import * as React from "react";

import { grey, darkGrey } from "theme/variables";

import {
  quarterNotePath,
  quarterViewBox,
  eighthNotePath,
  eightViewBox,
  noteLinePath
} from "./stencilPaths";

const TimeSigSectionContext = React.createContext({});

function EighthNote({ visible = false }) {
  const { eightWidth, noteHeight } = React.useContext(TimeSigSectionContext);
  return (
    <svg viewBox={eightViewBox} width={eightWidth} height={noteHeight}>
      <path d={eighthNotePath} fill={visible ? darkGrey : "none"} />
    </svg>
  );
}

function QuarterNote() {
  const { quarterWidth, noteHeight } = React.useContext(TimeSigSectionContext);
  return (
    <svg viewBox={quarterViewBox} width={quarterWidth} height={noteHeight}>
      <path d={quarterNotePath} fill={darkGrey} />
    </svg>
  );
}

function LinePadding() {
  const { rowHeight } = React.useContext(TimeSigSectionContext);
  return (
    <div
      style={{
        position: "absolute",
        width: 5,
        height: rowHeight,
        right: 0,
        top: 0,
        backgroundColor: grey
      }}
    />
  );
}

function SixthLine() {
  const {
    eightWidth,
    quarterStepWidth,
    sixthStepWidth,
    rowHeight,
    notePadding
  } = React.useContext(TimeSigSectionContext);
  const path = noteLinePath(eightWidth + 7, quarterStepWidth / 2, 8);
  return (
    <div
      style={{
        position: "absolute",
        width: sixthStepWidth,
        height: rowHeight,
        top: 0,
        left: notePadding
      }}
    >
      <svg width={sixthStepWidth} height={rowHeight}>
        <path d={path} stroke={darkGrey} fill="none" />
      </svg>
    </div>
  );
}

function SixthStep() {
  const { baseStepStyle, sixthStepWidth } = React.useContext(
    TimeSigSectionContext
  );
  return (
    <div
      style={{
        ...baseStepStyle,
        width: sixthStepWidth
      }}
    >
      <SixthLine />
      <EighthNote visible sixth />
      <EighthNote visible sixth />
      <EighthNote visible sixth />
    </div>
  );
}

function TripletLine() {
  const {
    eightWidth,
    trippletStepWidth,
    quarterStepWidth,
    rowHeight,
    notePadding
  } = React.useContext(TimeSigSectionContext);
  const path = noteLinePath(
    eightWidth + 7,
    trippletStepWidth - quarterStepWidth / 2,
    17
  );
  return (
    <div
      style={{
        position: "absolute",
        width: trippletStepWidth,
        height: rowHeight,
        top: 0,
        left: notePadding
      }}
    >
      <svg width={trippletStepWidth} height={rowHeight}>
        <path d={path} stroke={darkGrey} fill="none" />
      </svg>
    </div>
  );
}

function TrippletStep() {
  const {
    baseStepStyle,
    trippletStepWidth,
    quarterStepWidth
  } = React.useContext(TimeSigSectionContext);
  return (
    <div
      style={{
        ...baseStepStyle,
        width: trippletStepWidth,
        paddingRight: baseStepStyle.paddingRight + quarterStepWidth / 3.8
      }}
    >
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
  const { baseStepStyle, quarterStepWidth } = React.useContext(
    TimeSigSectionContext
  );
  return (
    <div
      style={{
        ...baseStepStyle,
        width: quarterStepWidth
      }}
    >
      <QuarterNote />
    </div>
  );
}

function HalfStep() {
  const { baseStepStyle, halfStepWidth } = React.useContext(
    TimeSigSectionContext
  );
  return (
    <div
      style={{
        ...baseStepStyle,
        width: halfStepWidth
      }}
    >
      <QuarterNote />
    </div>
  );
}

function TimeSignatureSection(props) {
  const { width, height, stepPadding, quarterStepWidth } = props;

  const sigBorderRadius = 6;

  const verticalPadding = 2,
    rowHeight = height / 4 - verticalPadding * 0.75;

  const halfStepWidth = (width - stepPadding) / 2;
  const trippletStepWidth = quarterStepWidth * 1.5 + stepPadding * 0.5;
  const sixthStepWidth = trippletStepWidth / 2 - stepPadding / 2;

  const noteHeight = 16;
  const notePadding = quarterStepWidth / 12;
  const quarterWidth = 9;
  const eightWidth = 11;

  const baseStepStyle = {
    position: "relative",
    height: rowHeight,
    borderRadius: sigBorderRadius,
    backgroundColor: grey,
    flexShrink: 0,
    marginRight: stepPadding,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: notePadding,
    paddingRight: notePadding
  };

  const styles = {
    wrapper: {
      position: "relative",
      width,
      height,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    row: {
      position: "relative",
      width,
      height: rowHeight,
      display: "flex",
      flexDirection: "row",
      overflow: "hidden"
    }
  };

  const contextValue = React.useMemo(
    () => ({
      baseStepStyle,
      eightWidth,
      noteHeight,
      quarterWidth,
      rowHeight,
      quarterStepWidth,
      sixthStepWidth,
      notePadding,
      trippletStepWidth,
      halfStepWidth
    }),
    [
      baseStepStyle,
      halfStepWidth,
      notePadding,
      quarterStepWidth,
      rowHeight,
      sixthStepWidth,
      trippletStepWidth
    ]
  );

  return (
    <TimeSigSectionContext.Provider value={contextValue}>
      <div style={styles.wrapper}>
        <div style={styles.row}>
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <SixthStep />
          <LinePadding />
        </div>
        <div style={styles.row}>
          <TrippletStep />
          <TrippletStep />
          <TrippletStep />
          <LinePadding />
        </div>
        <div style={styles.row}>
          <QuarterStep />
          <QuarterStep />
          <QuarterStep />
          <QuarterStep />
        </div>
        <div style={styles.row}>
          <HalfStep />
          <HalfStep />
        </div>
      </div>
    </TimeSigSectionContext.Provider>
  );
}

export default TimeSignatureSection;
