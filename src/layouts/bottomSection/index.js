import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { onBasicVariationChange, onStartStopButtonClick } from '../../actionCreators';

import {grey, darkGrey, buttonColor} from '../../theme/variables';
import { labelDarkGrey } from '../../theme/mixins';

import TimeSignatureSection from '../timeSignatureSection';
import BasicVariationSwitch from '../../components/basicVariationSwitch/basicVariationSwitch';
import Button from '../../components/button/button';

const ConnectedBasicVariationSwitch = (() => {
  const mapStateToProps = (state) => ({
    position: state.basicVariation.position,
    aActive: state.basicVariation.aActive,
    bActive: state.basicVariation.bActive
  });

  const mapDispatchToProps = (dispatch) => ({
    onChange: (position) => dispatch(onBasicVariationChange(position))
  });

  return connect(mapStateToProps, mapDispatchToProps)(BasicVariationSwitch);
})();

const ConnectedStartStopButton = (() => {
  const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(onStartStopButtonClick())
  });

  return connect(null, mapDispatchToProps)(Button);
})();

@Radium
class BottomSection extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    topLeftWidth: React.PropTypes.number
  };

  render() {
    const {width, height, topLeftWidth} = this.props;

    const BACKGROUND_PADDING = 10,
      BACKGROUND_BORDER_RADIUS = 8,
      LEFT_WIDTH = width * 0.1375,
      RIGHT_WIDTH = width * 0.12,
      BACKGROUND_BOTTOM_HEIGHT = (height - BACKGROUND_PADDING) * 0.17,
      BACKGROUND_CENTER_HEIGHT = (height - BACKGROUND_PADDING) * 0.83;

    const SEQUENCER_SECTION_WIDTH = width - (LEFT_WIDTH + RIGHT_WIDTH),
      SEQUENCER_SECTION_HEIGHT = height - BACKGROUND_BOTTOM_HEIGHT - BACKGROUND_PADDING,
      PRE_SCALE_SECTION_WIDTH = topLeftWidth - LEFT_WIDTH,
      STEP_PADDING = 16,
      STEPS_SECTION_WIDTH = SEQUENCER_SECTION_WIDTH - PRE_SCALE_SECTION_WIDTH - STEP_PADDING;

    const QUARTER_STEP_WIDTH = (STEPS_SECTION_WIDTH / 4) - (STEP_PADDING * 3 / 4);

    const BACKGROUND_BOTTOM_LEFT_WIDTH = LEFT_WIDTH + PRE_SCALE_SECTION_WIDTH +
      (QUARTER_STEP_WIDTH * 3) + (STEP_PADDING * 2);
    const BACKGROUND_BOTTOM_RIGHT_WIDTH = RIGHT_WIDTH + QUARTER_STEP_WIDTH + STEP_PADDING;

    const TIME_SIG_WRAPPER_HEIGHT = SEQUENCER_SECTION_HEIGHT * 0.55,
      STEP_CONTROL_WRAPPER_HEIGHT = SEQUENCER_SECTION_HEIGHT - TIME_SIG_WRAPPER_HEIGHT;

    const LEFT_SECTION_HEIGHT =  height - BACKGROUND_PADDING - BACKGROUND_BOTTOM_HEIGHT;

    const horizontalSeparatorStyle = (thickness) => ({
      height: thickness,
      backgroundColor: darkGrey
    });

    const styles = {
      wrapper: {
        width, height,
        position: 'relative'
      },
      controlWrapper: {
        position: 'absolute',
        width, height,
        left: 0, top: BACKGROUND_PADDING
      },
      sequencerSection: {
        position: 'absolute',
        width: SEQUENCER_SECTION_WIDTH, height: SEQUENCER_SECTION_HEIGHT,
        top: 0, left: LEFT_WIDTH
      },
      leftSection: {
        position: 'absolute',
        width: LEFT_WIDTH, height: LEFT_SECTION_HEIGHT,
        top: 0, left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: BACKGROUND_PADDING
      },
      buttonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      startStopButton: {
        width: LEFT_WIDTH * 0.7, height: LEFT_SECTION_HEIGHT * 0.25,
        backgroundColor: buttonColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 11,
        borderRadius: 4
      }
    };

    const backgroundStyles = {
      wrapper: {
        width, height: height - BACKGROUND_PADDING,
        position: 'absolute',
        bottom: 0, left: 0
      },

      left: {
        position: 'absolute',
        top: 0, left: 0,
        width: LEFT_WIDTH, height: height - BACKGROUND_PADDING,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      right: {
        position: 'absolute',
        top: 0, right: 0,
        width: RIGHT_WIDTH, height: height - BACKGROUND_PADDING,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      center: {
        position: 'absolute',
        top: 0, left: LEFT_WIDTH, right: RIGHT_WIDTH,
        height: BACKGROUND_CENTER_HEIGHT,
        backgroundColor: darkGrey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      bottomLeft: {
        position: 'absolute',
        bottom: 0, left: 0,
        width: BACKGROUND_BOTTOM_LEFT_WIDTH, height: BACKGROUND_BOTTOM_HEIGHT,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      bottomRight: {
        position: 'absolute',
        bottom: 0, right: 0,
        width: BACKGROUND_BOTTOM_RIGHT_WIDTH, height: BACKGROUND_BOTTOM_HEIGHT,
        backgroundColor: grey,
        borderRadius: BACKGROUND_BORDER_RADIUS
      },

      leftFiller: {
        position: 'absolute',
        bottom: BACKGROUND_BOTTOM_HEIGHT, left: LEFT_WIDTH,
        transform: 'translateX(-50%)',
        width: 20, height: 20,
        backgroundColor: grey
      },

      rightFiller: {
        position: 'absolute',
        bottom: BACKGROUND_BOTTOM_HEIGHT, right: RIGHT_WIDTH,
        transform: 'translateX(50%)',
        width: 20, height: 20,
        backgroundColor: grey
      },

      timeSignatureSectionWrapper: {
        position: 'absolute',
        width: STEPS_SECTION_WIDTH, height: TIME_SIG_WRAPPER_HEIGHT,
        top: 0, left: LEFT_WIDTH + PRE_SCALE_SECTION_WIDTH
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={backgroundStyles.wrapper}>
          <div style={backgroundStyles.left}></div>
          <div style={backgroundStyles.right}></div>
          <div style={backgroundStyles.bottomLeft}></div>
          <div style={backgroundStyles.bottomRight}></div>
          <div style={backgroundStyles.leftFiller}></div>
          <div style={backgroundStyles.rightFiller}></div>
          <div style={backgroundStyles.center}></div>
          <div style={backgroundStyles.timeSignatureSectionWrapper}>
            <TimeSignatureSection width={STEPS_SECTION_WIDTH} height={TIME_SIG_WRAPPER_HEIGHT}
                                  stepPadding={STEP_PADDING} quarterStepWidth={QUARTER_STEP_WIDTH} />
          </div>
        </div>
        <div style={styles.controlWrapper}>
          <div style={styles.sequencerSection}>
            <div style={styles.preScaleSection}></div>
            <div style={styles.stepSection}>
            </div>
          </div>
          <div style={styles.leftSection}>
            <ConnectedBasicVariationSwitch />
            <div style={horizontalSeparatorStyle(2)}></div>
            <div style={styles.buttonWrapper}>
              <ConnectedStartStopButton style={styles.startStopButton}>
                <div style={labelDarkGrey}>START</div>
                <div style={{...horizontalSeparatorStyle(1), margin: 3}}></div>
                <div style={labelDarkGrey}>STOP</div>
              </ConnectedStartStopButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BottomSection;