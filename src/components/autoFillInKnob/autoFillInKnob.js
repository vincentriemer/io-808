import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './autoFillInKnob.scss';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import themeVariables from '../../theme/variables';

const guideLabelBaseStyle = {
  fontFamily: themeVariables.fontFamily,
  fontSize: themeVariables.smallSize,
  fontWeight: themeVariables.normalWeight,
  letterSpacing: themeVariables.normalLetterspacing,
  color: themeVariables.grey
};

const guideValues = [
  <div style={{transform: 'translateX(-20px)'}}>MANUAL</div>,
  16,12,8,4,2
];
guideValues.push();

class AutoFillInKnob extends React.Component {
  render() {
    const {value, onChange} = this.props;
    return (
      <div styleName='wrapper'>
        <div styleName='control-wrapper'>
          <Guides num={6} distance={58} hideCount={6} guideStyle={{
            width: 5, height: 5,
            backgroundColor: themeVariables.grey,
            borderRadius: '50%'
          }} />
          <Guides distance={70} hideCount={5.5} values={guideValues} rotate={false} guideStyle={guideLabelBaseStyle} />
          <div styleName='knob-wrapper'>
            <Knob
              value={value}
              onChange={onChange}
              size={100}
              bufferSize={150}
              min={0} max={5}
              step={1}
            >
              <SelectorKnobInner size={100} />
            </Knob>
          </div>
        </div>
        <div styleName='label-wrapper'>
          <div styleName='measures-label'>MEASURES</div>
          <div styleName='auto-label'>AUTO FILL IN</div>
        </div>
      </div>
    );
  }
}

AutoFillInKnob.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default CSSModules(AutoFillInKnob, styles);