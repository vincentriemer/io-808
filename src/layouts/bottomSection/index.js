import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  grey,
  darkGrey,
  buttonColor,
  red,
  buttonOrange,
  yellow,
  offWhite,
  drumLabel
} from "theme/variables";
import { labelDarkGrey, labelGreyNormal, labelGreyXLarge } from "theme/mixins";

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

class BottomSection extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    topLeftWidth: PropTypes.number.isRequired,
    mode: PropTypes.number.isRequired
  };

  static RHYTHM_LABELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4];
  static STEP_BUTTON_COLORS = [
    red,
    red,
    red,
    red,
    buttonOrange,
    buttonOrange,
    buttonOrange,
    buttonOrange,
    yellow,
    yellow,
    yellow,
    yellow,
    offWhite,
    offWhite,
    offWhite,
    offWhite
  ];

  static generateStepButtons(
    width,
    buttonHeight,
    labelHeight,
    bottomHeight,
    padding
  ) {
    const labeledButtons = [];
    const buttonWidth = width / 16 - (padding * 15) / 16;
    const stepButtonHeight = buttonHeight - padding;

    const styles = {
      wrapper: {
        width: buttonWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },

      stepLabelWrapper: {
        height: labelHeight,
        display: "flex",
        alignItems: "center"
      },

      stepLabel: {
        ...labelGreyNormal,
        color: drumLabel
      },

      rhythmLabelWrapper: {
        marginTop: padding,
        height: bottomHeight,
        display: "flex",
        alignItems: "center"
      },

      rhythmLabel: {
        ...labelGreyXLarge,
        color: darkGrey
      }
    };

    ConnectedStepButtons.forEach((ConnectedStepButton, index) => {
      labeledButtons.push(
        <div key={`stepbutton-${index}`} style={styles.wrapper}>
          <div style={styles.stepLabelWrapper}>
            <div style={styles.stepLabel}>{index + 1}</div>
          </div>
          <ConnectedStepButton
            width={buttonWidth}
            height={stepButtonHeight}
            color={this.STEP_BUTTON_COLORS[index]}
          />
          <div style={styles.rhythmLabelWrapper}>
            <div style={styles.rhythmLabel}>{this.RHYTHM_LABELS[index]}</div>
          </div>
        </div>
      );
    });

    return labeledButtons;
  }

  render() {
    const { width, height, topLeftWidth, mode } = this.props;

    const BACKGROUND_PADDING = 10,
      BACKGROUND_BORDER_RADIUS = 8,
      LEFT_WIDTH = Math.floor(width * 0.1375),
      RIGHT_WIDTH = Math.floor(width * 0.12),
      BACKGROUND_BOTTOM_HEIGHT = Math.floor(
        (height - BACKGROUND_PADDING) * 0.17
      ),
      BACKGROUND_CENTER_HEIGHT =
        height - BACKGROUND_PADDING - BACKGROUND_BOTTOM_HEIGHT;

    const SEQUENCER_SECTION_WIDTH = width - (LEFT_WIDTH + RIGHT_WIDTH),
      SEQUENCER_SECTION_HEIGHT =
        height - BACKGROUND_BOTTOM_HEIGHT - BACKGROUND_PADDING,
      PRE_SCALE_SECTION_WIDTH = topLeftWidth - LEFT_WIDTH,
      STEPS_SECTION_WIDTH =
        SEQUENCER_SECTION_WIDTH - PRE_SCALE_SECTION_WIDTH - BACKGROUND_PADDING;

    const QUARTER_STEP_WIDTH =
      STEPS_SECTION_WIDTH / 4 - (BACKGROUND_PADDING * 3) / 4;

    const BACKGROUND_BOTTOM_LEFT_WIDTH =
      LEFT_WIDTH +
      PRE_SCALE_SECTION_WIDTH +
      QUARTER_STEP_WIDTH * 3 +
      BACKGROUND_PADDING * 2;
    const BACKGROUND_BOTTOM_RIGHT_WIDTH =
      RIGHT_WIDTH + QUARTER_STEP_WIDTH + BACKGROUND_PADDING;

    const TIME_SIG_WRAPPER_HEIGHT = Math.ceil(SEQUENCER_SECTION_HEIGHT * 0.5),
      STEP_CONTROL_WRAPPER_HEIGHT =
        SEQUENCER_SECTION_HEIGHT - TIME_SIG_WRAPPER_HEIGHT;

    const LEFT_SECTION_HEIGHT =
      height - BACKGROUND_PADDING - BACKGROUND_BOTTOM_HEIGHT;

    const STEP_BUTTON_LABEL_HEIGHT = 18;
    const STEP_BUTTON_HEIGHT =
      STEP_CONTROL_WRAPPER_HEIGHT - STEP_BUTTON_LABEL_HEIGHT;
    const STEP_BUTTON_SECTION_HEIGHT =
      STEP_BUTTON_LABEL_HEIGHT + STEP_BUTTON_HEIGHT + BACKGROUND_BOTTOM_HEIGHT;

    const ARROW_LABEL_HEIGHT = STEP_BUTTON_LABEL_HEIGHT;

    const horizontalSeparatorStyle = thickness => ({
      height: thickness,
      backgroundColor: darkGrey
    });

    const modeSupported = !UNIMPLEMENTED_MODES.includes(mode);

    const styles = {
      wrapper: {
        width,
        height,
        position: "relative"
      },
      unsupportedWrapper: {
        width,
        height,
        position: "relative",
        transition: "opacity 0.5s",
        opacity: modeSupported ? 1.0 : 0.1
      },
      unsupportedLabel: {
        ...labelGreyXLarge,
        position: "absolute",
        width,
        height,
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        color: "#F6F6F6",
        transition: "opacity 0.5s",
        opacity: modeSupported ? 0.0 : 1.0
      },
      controlWrapper: {
        position: "absolute",
        width,
        height,
        left: 0,
        top: BACKGROUND_PADDING
      },
      sequencerSection: {
        position: "absolute",
        width: SEQUENCER_SECTION_WIDTH,
        height: SEQUENCER_SECTION_HEIGHT,
        top: 0,
        left: LEFT_WIDTH
      },
      leftSection: {
        position: "absolute",
        width: LEFT_WIDTH,
        height: LEFT_SECTION_HEIGHT,
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: BACKGROUND_PADDING
      },
      buttonWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      startStopButton: {
        width: LEFT_WIDTH * 0.7,
        height: LEFT_SECTION_HEIGHT * 0.25,
        backgroundColor: buttonColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 8,
        borderRadius: 4
      },
      darkGreyButtonLabel: {
        ...labelDarkGrey,
        cursor: "inherit"
      },
      rightSection: {
        position: "absolute",
        width: RIGHT_WIDTH,
        height: LEFT_SECTION_HEIGHT,
        top: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: BACKGROUND_PADDING
      },
      fillInButtonLabelWrapper: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
      },
      tapButton: {
        width: LEFT_SECTION_HEIGHT * 0.25,
        height: LEFT_SECTION_HEIGHT * 0.25,
        backgroundColor: buttonColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 11,
        borderRadius: 4
      },
      preScaleSection: {
        position: "absolute",
        width: PRE_SCALE_SECTION_WIDTH,
        height: SEQUENCER_SECTION_HEIGHT,
        top: 0,
        left: LEFT_WIDTH,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
      },
      preScaleSwitchWrapper: {
        // disable switch until prescale functionality is implemented (stretch-goal)
        pointerEvents: "none",
        opacity: 0.6
      },
      preScaleBottomSection: {
        width: "100%",
        height: STEP_CONTROL_WRAPPER_HEIGHT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      stepButtonSection: {
        position: "absolute",
        width: STEPS_SECTION_WIDTH,
        height: STEP_BUTTON_SECTION_HEIGHT,
        top: STEP_CONTROL_WRAPPER_HEIGHT,
        left: LEFT_WIDTH + PRE_SCALE_SECTION_WIDTH,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch"
      },
      basicRhythmArrowWrapper: {
        position: "absolute",
        width: LEFT_WIDTH + PRE_SCALE_SECTION_WIDTH,
        height: BACKGROUND_BOTTOM_HEIGHT,
        left: 25,
        top: BACKGROUND_CENTER_HEIGHT,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      iFArrowWrapper: {
        position: "absolute",
        width: RIGHT_WIDTH,
        height: BACKGROUND_BOTTOM_HEIGHT,
        right: 12.5,
        top: BACKGROUND_CENTER_HEIGHT,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    };

    const backgroundStyles = {
      wrapper: {
        width,
        height: height - BACKGROUND_PADDING,
        position: "absolute",
        bottom: 0,
        left: 0
      },

      left: {
        position: "absolute",
        top: 0,
        left: 0,
        width: LEFT_WIDTH,
        height: height - BACKGROUND_PADDING,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      right: {
        position: "absolute",
        top: 0,
        right: 0,
        width: RIGHT_WIDTH,
        height: height - BACKGROUND_PADDING,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      center: {
        position: "absolute",
        top: 0,
        left: LEFT_WIDTH,
        right: RIGHT_WIDTH,
        height: BACKGROUND_CENTER_HEIGHT,
        backgroundColor: darkGrey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      bottomLeft: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: BACKGROUND_BOTTOM_LEFT_WIDTH,
        height: BACKGROUND_BOTTOM_HEIGHT,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      bottomRight: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: BACKGROUND_BOTTOM_RIGHT_WIDTH,
        height: BACKGROUND_BOTTOM_HEIGHT,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      leftFiller: {
        position: "absolute",
        bottom: BACKGROUND_BOTTOM_HEIGHT,
        left: LEFT_WIDTH,
        transform: "translateX(-50%)",
        width: 20,
        height: 20,
        backgroundColor: grey
      },

      rightFiller: {
        position: "absolute",
        bottom: BACKGROUND_BOTTOM_HEIGHT,
        right: RIGHT_WIDTH,
        transform: "translateX(50%)",
        width: 20,
        height: 20,
        backgroundColor: grey
      },

      timeSignatureSectionWrapper: {
        position: "absolute",
        width: STEPS_SECTION_WIDTH,
        height: TIME_SIG_WRAPPER_HEIGHT,
        top: 0,
        left: LEFT_WIDTH + PRE_SCALE_SECTION_WIDTH
      }
    };

    return (
      <div style={styles.wrapper}>
        <div
          className={modeSupported ? "" : "unsupported"}
          style={styles.unsupportedWrapper}
        >
          <div style={backgroundStyles.wrapper}>
            <div style={backgroundStyles.left} />
            <div style={backgroundStyles.right} />
            <div style={backgroundStyles.bottomLeft} />
            <div style={backgroundStyles.bottomRight} />
            <div style={backgroundStyles.leftFiller} />
            <div style={backgroundStyles.rightFiller} />
            <div style={backgroundStyles.center} />
            <div style={backgroundStyles.timeSignatureSectionWrapper}>
              <TimeSignatureSection
                width={STEPS_SECTION_WIDTH}
                height={TIME_SIG_WRAPPER_HEIGHT}
                stepPadding={BACKGROUND_PADDING}
                quarterStepWidth={QUARTER_STEP_WIDTH}
              />
            </div>
          </div>
          <div style={styles.controlWrapper}>
            <div style={styles.leftSection}>
              <ConnectedBasicVariationSwitch />
              <div style={horizontalSeparatorStyle(2)} />
              <div style={styles.buttonWrapper}>
                <ConnectedStartStopButton style={styles.startStopButton}>
                  <div style={styles.darkGreyButtonLabel}>START</div>
                  <div style={{ ...horizontalSeparatorStyle(1), margin: 3 }} />
                  <div style={styles.darkGreyButtonLabel}>STOP</div>
                </ConnectedStartStopButton>
              </div>
            </div>
            <div style={styles.rightSection}>
              <ConnectedIFVariationSwitch />
              <div style={horizontalSeparatorStyle(2)} />
              <div style={styles.fillInButtonLabelWrapper}>
                <div style={labelDarkGrey}>INTRO SET</div>
                <div style={{ ...horizontalSeparatorStyle(1), margin: 3 }} />
                <div style={labelDarkGrey}>FILL IN TRIGGER</div>
              </div>
              <div style={styles.buttonWrapper}>
                <ConnectedTapButton style={styles.tapButton}>
                  <div style={styles.darkGreyButtonLabel}>TAP</div>
                </ConnectedTapButton>
              </div>
            </div>
            <div style={styles.preScaleSection}>
              <div style={styles.preScaleSwitchWrapper}>
                <ConnectedPreScaleSwitch
                  position={2}
                  offset={STEP_BUTTON_LABEL_HEIGHT / 3}
                />
              </div>
              <div style={styles.preScaleBottomSection}>
                <ArrowLabel
                  label="STEP NO"
                  width={PRE_SCALE_SECTION_WIDTH - 20}
                  height={ARROW_LABEL_HEIGHT}
                  textColor={darkGrey}
                  backgroundColor={grey}
                  direction="right"
                />
                <ConnectedPartLights
                  offset={STEP_BUTTON_LABEL_HEIGHT / 3}
                  width={PRE_SCALE_SECTION_WIDTH}
                  height={STEP_BUTTON_HEIGHT}
                />
              </div>
            </div>
            <div style={styles.stepButtonSection}>
              {BottomSection.generateStepButtons(
                STEPS_SECTION_WIDTH,
                STEP_BUTTON_HEIGHT,
                STEP_BUTTON_LABEL_HEIGHT,
                BACKGROUND_BOTTOM_HEIGHT,
                BACKGROUND_PADDING
              )}
            </div>
            <div style={styles.basicRhythmArrowWrapper}>
              <ArrowLabel
                label="BASIC RHYTHM"
                width={140}
                height={25}
                direction="right"
                textColor={grey}
                backgroundColor={darkGrey}
              />
            </div>
            <div style={styles.iFArrowWrapper}>
              <ArrowLabel
                label="INTRO/FILL IN"
                width={140}
                height={25}
                direction="left"
                textColor={grey}
                backgroundColor={darkGrey}
              />
            </div>
          </div>
        </div>
        <div style={styles.unsupportedLabel}>Mode Currently Unsupported</div>
      </div>
    );
  }
}

// subscribe to the selectedMode state to identify unimplemented features
const mapStateToProps = state => ({
  mode: state.selectedMode
});

export default connect(mapStateToProps)(BottomSection);
