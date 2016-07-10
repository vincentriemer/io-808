import React from 'react';
import Radium from 'radium';

import {labelGreyLarge} from '../../theme/mixins';

class ArrowLabel extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    textColor: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
    direction: React.PropTypes.oneOf(['right', 'left'])
  };

  render() {
    const {label, width, height, textColor, backgroundColor, direction} = this.props;

    const arrowEndWidth = height;
    const arrowShaftWidth = height / 4;
    const arrowShaftHeight = height / 3;
    const labelWrapperWidth = width - arrowEndWidth - arrowShaftWidth;

    const transparentTriangeSides = `${arrowEndWidth * 3 / 8}px solid transparent`;
    const coloredTriangleSide = `${arrowEndWidth / 2}px solid ${backgroundColor}`;

    const styles ={
      wrapper: {
        position: 'relative',
        width, height,
        display: 'flex',
        alignItems: 'center',
        flexDirection: direction === 'left' ? 'row-reverse' : 'row'
      },

      arrowPoint: {
        width: 0, height: 0,
        borderTop: transparentTriangeSides,
        borderBottom: transparentTriangeSides,
        [direction === 'left' ? 'borderRight' : 'borderLeft']: coloredTriangleSide
      },

      arrowShaft: {
        position: 'relative',
        width: arrowShaftWidth, height: arrowShaftHeight,
        transform: 'scaleX(1.1)',
        backgroundColor
      },

      labelWrapper: {
        width: labelWrapperWidth + (arrowEndWidth / 2), height,
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },

      label: {
        ...labelGreyLarge,
        color: textColor
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.labelWrapper}>
          <div style={styles.label}>{label}</div>
        </div>
        <div style={styles.arrowShaft}></div>
        <div style={styles.arrowPoint}></div>
      </div>
    );
  }
}

export default ArrowLabel;