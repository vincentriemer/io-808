import * as React from "react";

import { grey, drumLabel, stencilOrange, red } from "theme/variables";
import { labelGreySmall } from "theme/mixins";

import * as stencilPaths from "./stencilPaths";

import {
  ConnectedClearButton,
  ConnectedAutoFillInKnob,
  ConnectedTempoKnob,
  ConnectedFineTempoKnob,
  ConnectedInstrumentSelectorKnob,
  ConnectedModeKnob
} from "./connectedComponents";

function TopLeftSection(props) {
  const { width, height } = props;

  const labelBase = {
    ...labelGreySmall,
    position: "absolute",
    lineHeight: 0.9
  };

  const labelBorder = color => ({
    padding: 2,
    border: `1px solid ${color}`,
    borderRadius: 1
  });

  const labelStyles = {
    firstPart: {
      ...labelBase,
      color: drumLabel,
      textAlign: "left",
      width: 20,
      top: -10,
      left: -25
    },
    secondPart: {
      ...labelBase,
      color: drumLabel,
      textAlign: "left",
      width: 20,
      top: -28,
      left: 0
    },
    manualPlay: {
      ...labelBase,
      color: grey,
      width: 51,
      height: 22,
      top: -34,
      left: 57,
      border: `1px solid ${grey}`,
      borderRadius: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    play: {
      ...labelBase,
      color: stencilOrange,
      width: 30,
      top: -1,
      right: -29
    },
    compose: {
      ...labelBase,
      color: stencilOrange,
      width: 20,
      top: 18,
      right: -29
    },
    patternWrite: {
      ...labelBase,
      color: drumLabel,
      top: 2,
      left: 20,
      ...labelBorder(drumLabel)
    },
    instrumentSelect: {
      ...labelBase,
      position: "static",
      width: 120,
      marginTop: 2,
      color: drumLabel,
      ...labelBorder("rgba(0,0,0,0)")
    },
    rhythmTrack: {
      ...labelBase,
      position: "static",
      width: 115,
      marginTop: 1,
      color: stencilOrange,
      ...labelBorder(stencilOrange)
    },
    patternClear: {
      ...labelBase,
      color: drumLabel,
      top: 168,
      left: 30,
      ...labelBorder(drumLabel)
    },
    trackClear: {
      ...labelBase,
      color: stencilOrange,
      left: "107%",
      bottom: "55%"
    },
    stepNumber: {
      ...labelBase,
      width: 45,
      color: drumLabel,
      right: "110%",
      bottom: "55%"
    },
    preScale: {
      ...labelBase,
      width: 45,
      color: drumLabel,
      right: "110%",
      top: "55%"
    }
  };

  const styles = {
    wrapper: {
      width,
      height,
      position: "relative"
    },
    stencilWrapper: {
      position: "absolute",
      width,
      height,
      top: 0,
      left: 0
    },
    instrumentSelectorWrapper: {
      marginTop: 5
    },
    modeWrapper: {
      position: "absolute",
      top: 114,
      left: 75,
      transform: "translateX(-50%) translateY(-50%)"
    },
    clearWrapper: {
      position: "absolute",
      top: 202,
      left: 61
    },
    clearButton: {
      width: 27,
      height: 27,
      borderRadius: "50%",
      backgroundColor: red,
      border: `2px solid ${grey}`
    },
    autoFillInWrapper: {
      marginTop: 20
    },
    knobTempoWrapper: {
      position: "absolute",
      bottom: 7,
      left: 0
    },
    fineTempoWrapper: {
      position: "absolute",
      right: 70,
      bottom: 40,
      transform: "translateX(50%)"
    }
  };

  const alignStyles = {
    tempoAndAutoFill: {
      position: "absolute",
      top: 0,
      right: 7,
      width: 149,
      height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.stencilWrapper}>
        <div style={labelStyles.patternWrite}>PATTERN WRITE</div>
        <div style={labelStyles.patternClear}>PATTERN CLEAR</div>
        <svg width={width} height={height}>
          <path
            d={stencilPaths.separatorPath}
            stroke={grey}
            fill="none"
            strokeWidth={2}
          />
          <path
            d={stencilPaths.rhythmToCompose}
            stroke={stencilOrange}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.rhythmToPlay}
            stroke={stencilOrange}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternToInstrument}
            stroke={drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.manualPlayPath}
            stroke={grey}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.firstToSecondPart}
            stroke={drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternToParts}
            stroke={drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternWriteToClear}
            stroke={drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.modeToPatternClear}
            stroke={drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternLabelToButton}
            stroke={drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.composeToTrackClear}
            stroke={stencilOrange}
            fill="none"
            strokeWidth={1}
          />
        </svg>
      </div>
      <div style={alignStyles.tempoAndAutoFill}>
        <div style={labelStyles.instrumentSelect}>INSTRUMENT-SELECT</div>
        <div style={labelStyles.rhythmTrack}>RHYTHM TRACK</div>
        <div style={styles.instrumentSelectorWrapper}>
          <ConnectedInstrumentSelectorKnob size={151} />
        </div>
        <div style={styles.autoFillInWrapper}>
          <ConnectedAutoFillInKnob size={151} />
        </div>
      </div>
      <div style={styles.modeWrapper}>
        <div style={labelStyles.firstPart}>1st PART</div>
        <div style={labelStyles.secondPart}>2nd PART</div>
        <div style={labelStyles.manualPlay}>MANUAL PLAY</div>
        <div style={labelStyles.play}>PLAY</div>
        <div style={labelStyles.compose}>COM- POSE</div>
        <ConnectedModeKnob size={76} />
      </div>
      <div style={styles.clearWrapper}>
        <div style={labelStyles.trackClear}>TRACK CLEAR</div>
        <div style={labelStyles.stepNumber}>STEP NUMBER</div>
        <div style={labelStyles.preScale}>PRE- SCALE</div>
        <ConnectedClearButton style={styles.clearButton} />
      </div>
      <div style={styles.knobTempoWrapper}>
        <ConnectedTempoKnob size={180} />
      </div>
      <div style={styles.fineTempoWrapper}>
        <ConnectedFineTempoKnob size={70} />
      </div>
    </div>
  );
}

export default TopLeftSection;
