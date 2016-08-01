import React from 'react';
import Radium from 'radium';

import { grey, darkGrey } from 'theme/variables';

import {
  quarterNotePath, quarterViewBox,
  eighthNotePath, eightViewBox,
  noteLinePath
} from './stencilPaths';

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

    const noteHeight = 16;
    const notePadding = quarterStepWidth / 12;
    const quarterWidth = 9;
    const eightWidth = 11;

    const baseStepStyle = {
      position: 'relative',
      height: rowHeight,
      borderRadius: sigBorderRadius,
      backgroundColor: grey,
      flexShrink: 0,
      marginRight: stepPadding,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: notePadding, paddingRight: notePadding
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
        width: trippletStepWidth,
        paddingRight: baseStepStyle.paddingRight + (quarterStepWidth / 3.8)
      },
      sixthStep: {
        ...baseStepStyle,
        width: sixthStepWidth
      }
    };

    const EighthNote = ({visible=false, sixth=false}) => (
      <svg viewBox={eightViewBox} width={eightWidth} height={noteHeight}>
        <path d={eighthNotePath} fill={visible ? darkGrey : 'none'} />
      </svg>
    );

    const QuarterNote = () => (
      <svg viewBox={quarterViewBox} width={quarterWidth} height={noteHeight}>
        <path d={quarterNotePath} fill={darkGrey} />
      </svg>
    );

    const LinePadding = () => (
      <div style={{
        position: 'absolute',
        width: 5, height: rowHeight,
        right: 0, top: 0,
        backgroundColor: grey
      }}></div>
    );

    const SixthLine = () => {
      const path = noteLinePath(eightWidth + 7, (quarterStepWidth / 2), 8);
      return (
        <div style={{position: 'absolute', width: sixthStepWidth, height: rowHeight}}>
          <svg width={sixthStepWidth} height={rowHeight}>
            <path d={path} stroke={darkGrey} fill='none' />
          </svg>
        </div>
      )
    };

    const SixthStep = () => (
      <div style={styles.sixthStep}>
        <SixthLine/>
        <EighthNote visible sixth/>
        <EighthNote visible sixth/>
        <EighthNote visible sixth/>
      </div>
    );

    const TripletLine = () => {
      const path = noteLinePath(eightWidth + 7, trippletStepWidth - (quarterStepWidth / 2), 17);
      return (
        <div style={{position: 'absolute', width: trippletStepWidth, height: rowHeight}}>
          <svg width={trippletStepWidth} height={rowHeight}>
            <path d={path} stroke={darkGrey} fill='none' />
          </svg>
        </div>
      )
    };

    const TrippletStep = () => (
      <div style={styles.trippletStep}>
        <TripletLine/>
        <EighthNote visible/>
        <EighthNote/>
        <EighthNote visible/>
        <EighthNote/>
        <EighthNote visible/>
      </div>
    );

    const QuarterStep = () => (
      <div style={styles.quarterStep}>
        <QuarterNote/>
      </div>
    );

    const HalfStep = () => (
      <div style={styles.halfStep}>
        <QuarterNote/>
      </div>
    );

    return (
      <div style={styles.wrapper}>
        <div style={styles.row}>
          <SixthStep/>
          <SixthStep/>
          <SixthStep/>
          <SixthStep/>
          <SixthStep/>
          <SixthStep/>
          <LinePadding/>
        </div>
        <div style={styles.row}>
          <TrippletStep/>
          <TrippletStep/>
          <TrippletStep/>
          <LinePadding/>
        </div>
        <div style={styles.row}>
          <QuarterStep/>
          <QuarterStep/>
          <QuarterStep/>
          <QuarterStep/>
        </div>
        <div style={styles.row}>
          <HalfStep/>
          <HalfStep/>
        </div>
      </div>
    );
  }
}

export default TimeSignatureSection;
