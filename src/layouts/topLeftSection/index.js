import * as React from "react";
import * as stylex from "@stylexjs/stylex";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

import * as stencilPaths from "./stencilPaths";

import {
  ConnectedClearButton,
  ConnectedAutoFillInKnob,
  ConnectedTempoKnob,
  ConnectedFineTempoKnob,
  ConnectedInstrumentSelectorKnob,
  ConnectedModeKnob
} from "./connectedComponents";

const styles = stylex.create({
  wrapper: {
    position: "relative"
  },
  stencilWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 321,
    height: 506
  },
  labelBase: {
    position: "absolute",
    lineHeight: 0.9
  },
  firstPart: {
    color: tokens.drumLabel,
    textAlign: "left",
    width: 20,
    top: -10,
    left: -25
  },
  secondPart: {
    color: tokens.drumLabel,
    textAlign: "left",
    width: 20,
    top: -28,
    left: 0
  },
  manualPlay: {
    color: tokens.grey,
    width: 51,
    height: 22,
    top: -34,
    left: 57,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.grey,
    borderRadius: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  play: {
    color: tokens.stencilOrange,
    width: 30,
    top: -1,
    right: -29
  },
  compose: {
    color: tokens.stencilOrange,
    width: 20,
    top: 18,
    right: -29
  },
  patternWrite: {
    color: tokens.drumLabel,
    top: 2,
    left: 20
  },
  instrumentSelect: {
    position: "static",
    width: 125,
    marginTop: 2,
    color: tokens.drumLabel
  },
  rhythmTrack: {
    position: "static",
    width: 115,
    marginTop: 1,
    color: tokens.stencilOrange
  },
  patternClear: {
    color: tokens.drumLabel,
    top: 168,
    left: 30
  },
  trackClear: {
    color: tokens.stencilOrange,
    left: "107%",
    bottom: "55%"
  },
  stepNumber: {
    width: 45,
    color: tokens.drumLabel,
    right: "110%",
    bottom: "55%"
  },
  preScale: {
    width: 45,
    color: tokens.drumLabel,
    right: "110%",
    top: "55%"
  },
  labelBorder: {
    padding: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 1
  },
  drumLabelBorder: {
    borderColor: tokens.drumLabel
  },
  stencilOrangeBorder: {
    borderColor: tokens.stencilOrange
  },
  transparentBorder: {
    borderColor: tokens.transparentBlack
  },
  instrumentSelectorWrapper: {
    marginTop: 5
  },
  instrumentSelector: {
    width: 151,
    height: 151
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
    backgroundColor: tokens.red,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: tokens.grey
  },
  autoFillInWrapper: {
    marginTop: 5
  },
  autoFillIn: {
    width: 151,
    height: 151
  },
  modeKnob: {
    width: 76,
    height: 76
  },
  knobTempoWrapper: {
    position: "absolute",
    bottom: 7,
    left: 0
  },
  tempoKnob: {
    width: 180,
    height: 205
  },
  fineTempoWrapper: {
    position: "absolute",
    right: 70,
    bottom: 40,
    transform: "translateX(50%)"
  },
  fineTempoKnob: {
    width: 70,
    height: 90
  },
  tempoAndAutoFill: {
    position: "absolute",
    top: 0,
    right: 7,
    width: 149,
    height: 506,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

function TopLeftSection(props) {
  const { xstyle } = props;

  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.stencilWrapper)}>
        <div
          {...stylex.props(
            themeStyles.labelBase,
            themeStyles.labelGreySmall,
            styles.labelBase,
            styles.patternWrite,
            styles.labelBorder,
            styles.drumLabelBorder
          )}
        >
          PATTERN WRITE
        </div>
        <div
          {...stylex.props(
            themeStyles.labelBase,
            themeStyles.labelGreySmall,
            styles.labelBase,
            styles.patternClear,
            styles.labelBorder,
            styles.drumLabelBorder
          )}
        >
          PATTERN CLEAR
        </div>
        <svg width="100%" height="100%">
          <path
            d={stencilPaths.separatorPath}
            stroke={tokens.grey}
            fill="none"
            strokeWidth={2}
          />
          <path
            d={stencilPaths.rhythmToCompose}
            stroke={tokens.stencilOrange}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.rhythmToPlay}
            stroke={tokens.stencilOrange}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternToInstrument}
            stroke={tokens.drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.manualPlayPath}
            stroke={tokens.grey}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.firstToSecondPart}
            stroke={tokens.drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternToParts}
            stroke={tokens.drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternWriteToClear}
            stroke={tokens.drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.modeToPatternClear}
            stroke={tokens.drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.patternLabelToButton}
            stroke={tokens.drumLabel}
            fill="none"
            strokeWidth={1}
          />
          <path
            d={stencilPaths.composeToTrackClear}
            stroke={tokens.stencilOrange}
            fill="none"
            strokeWidth={1}
          />
        </svg>
      </div>
      <div {...stylex.props(styles.tempoAndAutoFill)}>
        <div
          {...stylex.props(
            themeStyles.labelBase,
            themeStyles.labelGreySmall,
            styles.labelBase,
            styles.instrumentSelect,
            styles.labelBorder,
            styles.transparentBorder
          )}
        >
          INSTRUMENT-SELECT
        </div>
        <div
          {...stylex.props(
            themeStyles.labelBase,
            themeStyles.labelGreySmall,
            styles.labelBase,
            styles.rhythmTrack,
            styles.labelBorder,
            styles.stencilOrangeBorder
          )}
        >
          RHYTHM TRACK
        </div>
        <div {...stylex.props(styles.instrumentSelectorWrapper)}>
          <ConnectedInstrumentSelectorKnob xstyle={styles.instrumentSelector} />
        </div>
        <div {...stylex.props(styles.autoFillInWrapper)}>
          <ConnectedAutoFillInKnob xstyle={styles.autoFillIn} />
        </div>
      </div>
      <div {...stylex.props(styles.modeWrapper)}>
        <div {...labelProps(styles.firstPart)}>1st PART</div>
        <div {...labelProps(styles.secondPart)}>2nd PART</div>
        <div {...labelProps(styles.manualPlay)}>MANUAL PLAY</div>
        <div {...labelProps(styles.play)}>PLAY</div>
        <div {...labelProps(styles.compose)}>COM- POSE</div>
        <ConnectedModeKnob xstyle={styles.modeKnob} />
      </div>
      <div {...stylex.props(styles.clearWrapper)}>
        <div {...labelProps(styles.trackClear)}>TRACK CLEAR</div>
        <div {...labelProps(styles.stepNumber)}>STEP NUMBER</div>
        <div {...labelProps(styles.preScale)}>PRE- SCALE</div>
        <ConnectedClearButton xstyle={styles.clearButton} />
      </div>
      <div {...stylex.props(styles.knobTempoWrapper)}>
        <ConnectedTempoKnob xstyle={styles.tempoKnob} />
      </div>
      <div {...stylex.props(styles.fineTempoWrapper)}>
        <ConnectedFineTempoKnob xstyle={styles.fineTempoKnob} />
      </div>
    </div>
  );
}

function labelProps(labelStyle) {
  return stylex.props(
    themeStyles.labelBase,
    themeStyles.labelGreySmall,
    styles.labelBase,
    labelStyle
  );
}

export default TopLeftSection;
