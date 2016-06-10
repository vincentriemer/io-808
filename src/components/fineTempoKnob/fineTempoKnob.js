import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './fineTempoKnob.scss';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import themeVariables from '../../theme/variables';


class FineTempoKnob extends React.Component {
  render() {
    const {value, onChange} = this.props;
    return (
      <div styleName='wrapper'>
        <div styleName='label-wrapper'>
          <div styleName='label'>FINE</div>
        </div>
        <div styleName='control-wrapper'>
          <Guides num={11} distance={34} hideCount={1} guideStyle={{
            width: 4,
            height: 4,
            backgroundColor: themeVariables.grey,
            borderRadius: '50%'
          }}/>
          
          <div styleName='knob-wrapper'>
            <Knob
              value={value}
              onChange={onChange}
              bufferSize={300}
              min={-6.75} max={6.75}
              step={0.1}>
              <SelectorKnobInner size={53}/>
            </Knob>
          </div>
        </div>
        <div styleName='knob-label-wrapper'>
          <div styleName='knob-label' style={{ textAlign: 'right' }}>SLOW</div>
          <div styleName='knob-label' style={{ textAlign: 'left' }}>FAST</div>
        </div>
      </div>
    );
  }
}

FineTempoKnob.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default CSSModules(FineTempoKnob, styles);