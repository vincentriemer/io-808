import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './instrumentSelectorKnob.scss';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import themeVariables from '../../theme/variables';

const guideNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
const guideLabels = ['AC','BD','SD','LT','MT','HT','RS','CP','CB','CY','OH','CH'];
const guideLabelElements = guideLabels.map(label => {
  return (
      <div style={{
      fontFamily: themeVariables.fontFamily,
      fontSize: themeVariables.normalSize,
      fontWeight: 'normal',
      letterSpacing: themeVariables.normalLetterspacing,
      color: themeVariables.darkGrey,
      backgroundColor: themeVariables.drumLabel,
      borderRadius: 3,
      textAlign: 'center',
      width: 35,
      paddingTop: 2, paddingBottom: 2
    }}>
      {label}
    </div>
  );
});

class InstrumentSelectorKnob extends React.Component {
  render() {
    const {value, onChange} = this.props;
    return (
      <div styleName='wrapper'>
        <div styleName='control-wrapper'>
          <Guides distance={58} offset={15} rotate={false} values={guideNumbers} guideStyle={{
            fontFamily: themeVariables.fontFamily,
            fontSize: themeVariables.smallSize,
            fontWeight: themeVariables.normalWeight,
            letterSpacing: themeVariables.normalLetterspacing,
            color: themeVariables.stencilOrange
          }} />
          <Guides distance={85} offset={15} rotate={false} values={guideLabelElements} />
          <div styleName='knob-wrapper'>
            <Knob
              value={value}
              onChange={onChange}
              size={100}
              bufferSize={330}
              min={0} max={11}
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

InstrumentSelectorKnob.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default CSSModules(InstrumentSelectorKnob, styles);