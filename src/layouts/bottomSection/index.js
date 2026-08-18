import React from "react";
import { useSelector } from "react-redux";
import * as stylex from "@stylexjs/stylex";

import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

import TimeSignatureSection from "layouts/timeSignatureSection";
import ArrowLabel from "components/arrowLabel";

import { UNIMPLEMENTED_MODES } from "store-constants";

import {
  ConnectedBasicVariationSwitch,
  ConnectedStartStopButton,
  ConnectedIFVariationSwitch,
  ConnectedTapButton,
  ConnectedPreScaleSwitch,
  ConnectedPartLights,
  ConnectedStepButtons
} from "./connectedComponents";

const RHYTHM_LABELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4];
const STEP_BUTTON_TONES = [
  "red",
  "red",
  "red",
  "red",
  "orange",
  "orange",
  "orange",
  "orange",
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "offWhite",
  "offWhite",
  "offWhite",
  "offWhite"
];

const styles = stylex.create({
  wrapper: {
    position: "relative"
  },
  unsupportedWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "opacity 0.5s"
  },
  supported: {
    opacity: 1
  },
  unsupported: {
    opacity: 0.1
  },
  unsupportedLabel: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    color: tokens.unsupportedText,
    transition: "opacity 0.5s"
  },
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  controlWrapper: {
    position: "absolute",
    width: 1400,
    height: 288,
    left: 0,
    top: 10
  },
  leftSection: {
    position: "absolute",
    width: 192,
    height: 231,
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 10
  },
  rightSection: {
    position: "absolute",
    width: 168,
    height: 231,
    top: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 10
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    backgroundColor: tokens.buttonColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 4
  },
  startStopButtonLayout: {
    width: 134.4,
    height: 57.75
  },
  tapButtonLayout: {
    width: 57.75,
    height: 57.75
  },
  startStopButton: {
    padding: 8
  },
  tapButton: {
    padding: 11
  },
  darkGreyButtonLabel: {
    cursor: "inherit"
  },
  fillInButtonLabelWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  preScaleSection: {
    position: "absolute",
    width: 129,
    height: 231,
    top: 0,
    left: 192,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  preScaleSwitchWrapper: {
    // Disable the switch until pre-scale functionality is implemented.
    pointerEvents: "none",
    opacity: 0.5
  },
  preScaleBottomSection: {
    width: "100%",
    height: 115,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stepButtonSection: {
    position: "absolute",
    width: 901,
    height: 162,
    top: 115,
    left: 321,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  arrowWrapper: {
    position: "absolute",
    height: 47,
    top: 231,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  basicRhythmArrowLayout: {
    width: 321
  },
  iFArrowLayout: {
    width: 168
  },
  basicRhythmArrowWrapper: {
    left: 25
  },
  iFArrowWrapper: {
    right: 12.5
  },
  horizontalSeparator: {
    backgroundColor: tokens.darkGrey
  },
  separatorThick: {
    height: 2
  },
  separatorThin: {
    height: 1
  },
  separatorMargin: {
    margin: 3
  },
  stepWrapper: {
    width: 46.9375,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stepLabelWrapper: {
    height: 18,
    display: "flex",
    alignItems: "center"
  },
  stepButton: {
    width: 46.9375,
    height: 87
  },
  stepLabel: {
    color: tokens.drumLabel
  },
  rhythmLabelWrapper: {
    marginTop: 10,
    height: 47,
    display: "flex",
    alignItems: "center"
  },
  rhythmLabel: {
    color: tokens.darkGrey
  },
  backgroundWrapper: {
    width: 1400,
    height: 278,
    position: "absolute",
    bottom: 0,
    left: 0
  },
  backgroundSide: {
    position: "absolute",
    top: 0,
    height: 278,
    backgroundColor: tokens.grey,
    borderRadius: 8
  },
  backgroundLeftSide: {
    width: 192
  },
  backgroundRightSide: {
    width: 168
  },
  left: {
    left: 0
  },
  right: {
    right: 0
  },
  backgroundCenter: {
    position: "absolute",
    top: 0,
    left: 192,
    right: 168,
    height: 231,
    backgroundColor: tokens.darkGrey,
    borderRadius: 8
  },
  backgroundBottom: {
    position: "absolute",
    bottom: 0,
    height: 47,
    backgroundColor: tokens.grey,
    borderRadius: 8
  },
  backgroundBottomLeft: {
    width: 994.25
  },
  backgroundBottomRight: {
    width: 395.75
  },
  backgroundFiller: {
    position: "absolute",
    bottom: 47,
    left: 192,
    width: 20,
    height: 20,
    backgroundColor: tokens.grey
  },
  rightFiller: {
    position: "absolute",
    bottom: 47,
    right: 168,
    width: 20,
    height: 20,
    backgroundColor: tokens.grey
  },
  translateLeft: {
    transform: "translateX(-50%)"
  },
  translateRight: {
    transform: "translateX(50%)"
  },
  timeSignatureSectionWrapper: {
    position: "absolute",
    width: 901,
    height: 116,
    top: 0,
    left: 321
  },
  timeSignatureSection: {
    width: 901,
    height: 116
  },
  preScaleSwitch: {
    right: 6
  },
  partLights: {
    width: 129,
    height: 97,
    right: 6
  },
  compactArrowLabel: {
    width: 109,
    height: 18
  },
  standardArrowLabel: {
    width: 140,
    height: 25
  }
});

function generateStepButtons() {
  const labeledButtons = [];

  ConnectedStepButtons.forEach((ConnectedStepButton, index) => {
    labeledButtons.push(
      <div key={`stepbutton-${index}`} {...stylex.props(styles.stepWrapper)}>
        <div {...stylex.props(styles.stepLabelWrapper)}>
          <div
            {...stylex.props(
              themeStyles.labelBase,
              themeStyles.labelGreyNormal,
              styles.stepLabel
            )}
          >
            {index + 1}
          </div>
        </div>
        <ConnectedStepButton
          xstyle={styles.stepButton}
          tone={STEP_BUTTON_TONES[index]}
        />
        <div {...stylex.props(styles.rhythmLabelWrapper)}>
          <div
            {...stylex.props(
              themeStyles.labelBase,
              themeStyles.labelGreyXLarge,
              styles.rhythmLabel
            )}
          >
            {RHYTHM_LABELS[index]}
          </div>
        </div>
      </div>
    );
  });

  return labeledButtons;
}

const BottomSection = props => {
  const { xstyle } = props;

  const mode = useSelector(state => state.selectedMode);

  const modeSupported = !UNIMPLEMENTED_MODES.includes(mode);

  const unsupportedWrapperProps = stylex.props(
    styles.unsupportedWrapper,
    modeSupported ? styles.supported : styles.unsupported
  );

  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div
        {...unsupportedWrapperProps}
        className={`${unsupportedWrapperProps.className || ""}${
          modeSupported ? "" : " unsupported"
        }`}
      >
        <div {...stylex.props(styles.backgroundWrapper)}>
          <div
            {...stylex.props(
              styles.backgroundSide,
              styles.backgroundLeftSide,
              styles.left
            )}
          />
          <div
            {...stylex.props(
              styles.backgroundSide,
              styles.backgroundRightSide,
              styles.right
            )}
          />
          <div
            {...stylex.props(
              styles.backgroundBottom,
              styles.backgroundBottomLeft,
              styles.left
            )}
          />
          <div
            {...stylex.props(
              styles.backgroundBottom,
              styles.backgroundBottomRight,
              styles.right
            )}
          />
          <div
            {...stylex.props(styles.backgroundFiller, styles.translateLeft)}
          />
          <div {...stylex.props(styles.rightFiller, styles.translateRight)} />
          <div {...stylex.props(styles.backgroundCenter)} />
          <div {...stylex.props(styles.timeSignatureSectionWrapper)}>
            <TimeSignatureSection xstyle={styles.timeSignatureSection} />
          </div>
        </div>
        <div {...stylex.props(styles.controlWrapper)}>
          <div {...stylex.props(styles.leftSection)}>
            <ConnectedBasicVariationSwitch />
            <div
              {...stylex.props(
                styles.horizontalSeparator,
                styles.separatorThick
              )}
            />
            <div {...stylex.props(styles.buttonWrapper)}>
              <ConnectedStartStopButton
                xstyle={[
                  styles.button,
                  styles.startStopButtonLayout,
                  styles.startStopButton
                ]}
              >
                <div
                  {...stylex.props(
                    themeStyles.labelBase,
                    themeStyles.labelDarkGrey,
                    styles.darkGreyButtonLabel
                  )}
                >
                  START
                </div>
                <div
                  {...stylex.props(
                    styles.horizontalSeparator,
                    styles.separatorThin,
                    styles.separatorMargin
                  )}
                />
                <div
                  {...stylex.props(
                    themeStyles.labelBase,
                    themeStyles.labelDarkGrey,
                    styles.darkGreyButtonLabel
                  )}
                >
                  STOP
                </div>
              </ConnectedStartStopButton>
            </div>
          </div>
          <div {...stylex.props(styles.rightSection)}>
            <ConnectedIFVariationSwitch />
            <div
              {...stylex.props(
                styles.horizontalSeparator,
                styles.separatorThick
              )}
            />
            <div {...stylex.props(styles.fillInButtonLabelWrapper)}>
              <div
                {...stylex.props(
                  themeStyles.labelBase,
                  themeStyles.labelDarkGrey
                )}
              >
                INTRO SET
              </div>
              <div
                {...stylex.props(
                  styles.horizontalSeparator,
                  styles.separatorThin,
                  styles.separatorMargin
                )}
              />
              <div
                {...stylex.props(
                  themeStyles.labelBase,
                  themeStyles.labelDarkGrey
                )}
              >
                FILL IN TRIGGER
              </div>
            </div>
            <div {...stylex.props(styles.buttonWrapper)}>
              <ConnectedTapButton
                xstyle={[
                  styles.button,
                  styles.tapButtonLayout,
                  styles.tapButton
                ]}
              >
                <div
                  {...stylex.props(
                    themeStyles.labelBase,
                    themeStyles.labelDarkGrey,
                    styles.darkGreyButtonLabel
                  )}
                >
                  TAP
                </div>
              </ConnectedTapButton>
            </div>
          </div>
          <div {...stylex.props(styles.preScaleSection)}>
            <div {...stylex.props(styles.preScaleSwitchWrapper)}>
              <ConnectedPreScaleSwitch
                position={2}
                xstyle={styles.preScaleSwitch}
              />
            </div>
            <div {...stylex.props(styles.preScaleBottomSection)}>
              <ArrowLabel
                label="STEP NO"
                xstyle={styles.compactArrowLabel}
                variant="compact"
                direction="right"
              />
              <ConnectedPartLights xstyle={styles.partLights} />
            </div>
          </div>
          <div {...stylex.props(styles.stepButtonSection)}>
            {generateStepButtons()}
          </div>
          <div
            {...stylex.props(
              styles.arrowWrapper,
              styles.basicRhythmArrowLayout,
              styles.basicRhythmArrowWrapper
            )}
          >
            <ArrowLabel
              label="BASIC RHYTHM"
              xstyle={styles.standardArrowLabel}
              variant="standard"
              direction="right"
            />
          </div>
          <div
            {...stylex.props(
              styles.arrowWrapper,
              styles.iFArrowLayout,
              styles.iFArrowWrapper
            )}
          >
            <ArrowLabel
              label="INTRO/FILL IN"
              xstyle={styles.standardArrowLabel}
              variant="standard"
              direction="left"
            />
          </div>
        </div>
      </div>
      <div
        {...stylex.props(
          themeStyles.labelBase,
          themeStyles.labelGreyXLarge,
          styles.unsupportedLabel,
          modeSupported ? styles.hidden : styles.visible
        )}
      >
        Mode Currently Unsupported
      </div>
    </div>
  );
};

export default BottomSection;
