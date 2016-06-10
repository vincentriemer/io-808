import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './tempoKnob.scss';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import themeVariables from '../../theme/variables';

const guideNumbers = [0,1,2,3,4,5,6,7,8,9,10];

let guideValues = [];
for (let i = 0; i < 41; i++) {
  let size = i % 4 === 0 ? 5 : 4;
  guideValues.push(<div style={{
    width: size,
    height: size,
    backgroundColor: themeVariables.grey,
    borderRadius: '50%'
  }}></div>);
}

class TempoKnob extends React.Component {
  render() {
    const {value, onChange} = this.props;
    return (
      <div styleName='wrapper'>
        <div styleName='label-wrapper'>
          <div styleName='label'>TEMPO</div>
        </div>
        <div styleName='control-wrapper'>
          <div styleName='ring-outer'></div>
          <Guides distance={99} hideCount={1} values={guideNumbers} rotate={false} guideStyle={{
            fontFamily: themeVariables.fontFamily,
            fontSize: themeVariables.normalSize,
            fontWeight: themeVariables.normalWeight,
            letterSpacing: themeVariables.normalLetterspacing,
            color: themeVariables.darkGrey
          }} />
          <div styleName='ring-inner'></div>
          <Guides num={41} distance={85.25} hideCount={7} values={guideValues} />
          <div styleName='knob-wrapper'>
            <Knob
              value={value}
              onChange={onChange}
              size={162}
              bufferSize={300}
              min={30} max={300}
              step={6.75}
            >
              <SelectorKnobInner size={162} />
            </Knob>
          </div>
        </div>
      </div>
    );
  }
}

TempoKnob.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default CSSModules(TempoKnob, styles);