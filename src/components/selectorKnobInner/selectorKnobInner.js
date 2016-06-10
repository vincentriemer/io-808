import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './selectorKnobInner.scss';

import Guides from '../guides/guides';
import themeVariables from '../../theme/variables';

const guideSize = 6;

class SelectorKnobInner extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { size } = this.props;

    const guides = size > 75 ?
      <Guides num={60} distance={size * 0.42} guideStyle={{
        width: guideSize, height: guideSize,
        borderRadius: '50%',
        backgroundColor: themeVariables.darkBlack
      }} /> : null;

    const spokes = size > 75 ?
      <div styleName='spokes'></div> : null;

    const innerInlineStyle = size < 75 ? {
      width: size - 8, height: size - 8
    } : null;

    return (
      <div styleName='wrapper' style={{width: size, height: size}}>
        <div styleName='lower-handle'></div>
        {spokes}
        {guides}
        <div styleName='lower-handle'></div>
        <div styleName='inner' style={innerInlineStyle}></div>
        <div styleName='handle'></div>
      </div>
    )
  }
}

export default CSSModules(SelectorKnobInner, styles);