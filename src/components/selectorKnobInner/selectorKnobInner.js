import React from 'react';
import Radium from 'radium';

import Guides from '../guides/guides';

import { ring } from '../../theme/mixins';
import { darkBlack, slightlyDarkerBlack, drumHandle, stencilOrange } from '../../theme/variables';

const guideSize = 6;

@Radium
class SelectorKnobInner extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { size } = this.props;

    const styles = {
      guides: {
        width: guideSize, height: guideSize,
        borderRadius: '50%',
        backgroundColor: darkBlack
      },

      spokes: ring('83%', slightlyDarkerBlack),

      wrapper: {
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: darkBlack,
        left: '50%', top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        width: size, height: size
      },

      inner: {
        ...ring('75%', drumHandle),
        ...(size < 75 ? { width: size - 8, height: size - 8 } : {})
      },

      lowerHandle: {
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 8, height: 15,
        backgroundColor: drumHandle,
        opacity: 0.6
      },

      handle: {
        position: 'absolute',
        top: '8.5%', left: '50%',
        transform: 'translateX(-50%)',
        width: 5, height: 15,
        backgroundColor: stencilOrange,
        borderRadius: 1
      }
    };

    const guides = size > 75 ?
      <Guides num={60} distance={size * 0.42} guideStyle={styles.guides} /> : null;

    const spokes = size > 75 ?
      <div style={styles.spokes}></div> : null;

    return (
      <div style={styles.wrapper}>
        {spokes}
        {guides}
        <div style={styles.lowerHandle}></div>
        <div style={styles.inner}></div>
        <div style={styles.handle}></div>
      </div>
    )
  }
}

export default SelectorKnobInner;