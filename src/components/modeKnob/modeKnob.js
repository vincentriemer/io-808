import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './modeKnob.scss';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import themeVariables from '../../theme/variables';

class ModeKnob extends React.Component {
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
      </div>
    );
  }
}

ModeKnob.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default CSSModules(ModeKnob, styles);