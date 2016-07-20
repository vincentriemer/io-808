import React from 'react';
import Radium from 'radium';

import { grey } from 'theme/variables';

@Radium
class TimeSignatureSection extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    stepPadding: React.PropTypes.number.isRequired,
    quarterStepWidth: React.PropTypes.number.isRequired
  };

  render() {
    const {width, height, stepPadding, quarterStepWidth} = this.props;

    const sigBorderRadius = 6;

    const verticalPadding = 2,
      rowHeight = (height / 4) - (verticalPadding * (0.75));

    const halfStepWidth = (width - stepPadding) / 2;
    const trippletStepWidth = (quarterStepWidth * 1.5) + (stepPadding * 0.5);
    const sixthStepWidth = (trippletStepWidth / 2) - (stepPadding / 2);

    const baseStepStyle = {
      position: 'relative',
      height: rowHeight,
      borderRadius: sigBorderRadius,
      backgroundColor: grey,
      flexShrink: 0,
      marginRight: stepPadding
    };

    const styles = {
      wrapper: {
        position: 'relative',
        width, height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      },
      row: {
        position: 'relative',
        width, height: rowHeight,
        display: 'flex',
        overflow: 'hidden'
      },

      halfStep: {
        ...baseStepStyle,
        width: halfStepWidth
      },
      quarterStep: {
        ...baseStepStyle,
        width: quarterStepWidth
      },
      trippletStep: {
        ...baseStepStyle,
        width: trippletStepWidth
      },
      sixthStep: {
        ...baseStepStyle,
        width: sixthStepWidth
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.row}>
          <div style={styles.sixthStep}></div>
          <div style={styles.sixthStep}></div>
          <div style={styles.sixthStep}></div>
          <div style={styles.sixthStep}></div>
          <div style={styles.sixthStep}></div>
          <div style={styles.sixthStep}></div>
        </div>
        <div style={styles.row}>
          <div style={styles.trippletStep}></div>
          <div style={styles.trippletStep}></div>
          <div style={styles.trippletStep}></div>
        </div>
        <div style={styles.row}>
          <div style={styles.quarterStep}></div>
          <div style={styles.quarterStep}></div>
          <div style={styles.quarterStep}></div>
          <div style={styles.quarterStep}></div>
        </div>
        <div style={styles.row}>
          <div style={styles.halfStep}></div>
          <div style={styles.halfStep}></div>
        </div>
      </div>
    );
  }
}

export default TimeSignatureSection;
