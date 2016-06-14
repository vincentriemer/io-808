import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './masterVolumeKnob.scss';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import themeVariables from '../../theme/variables';

const labelValues = [];
for (let i = 0; i < 11; i++) {
  if (i === 0) {
    labelValues.push('MIN');
  } else if (i === 10) {
    labelValues.push('MAX');
  } else {
    labelValues.push(i);
  }
}

class MasterVolumeKnob extends React.Component {
  render() {
    const {value, onChange} = this.props;
    return (
      <div styleName='wrapper'>
        <div styleName='control-wrapper'>
          <Guides num={11} distance={58} hideCount={1} guideStyle={{
            width: 5, height: 5,
            backgroundColor: themeVariables.grey,
            borderRadius: '50%'
          }} />
          <Guides distance={73} hideCount={1} rotate={false} values={labelValues} guideStyle={{
            fontFamily: themeVariables.fontFamily,
            fontSize: themeVariables.smallSize,
            fontWeight: themeVariables.normalWeight,
            letterSpacing: themeVariables.normalLetterspacing,
            color: themeVariables.grey
          }} />
          <Knob
            value={value}
            onChange={onChange}
            bufferSize={300}
            min={0} max={100}
            step={0.1}>
            <SelectorKnobInner size={100} />
          </Knob>
        </div>
        <div styleName='label'>
          MASTER VOLUME
        </div>
      </div>
    );
  }
}

MasterVolumeKnob.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default CSSModules(MasterVolumeKnob, styles);
