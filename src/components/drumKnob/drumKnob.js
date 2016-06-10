import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './drumKnob.scss';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import themeVariables from '../../theme/variables';

class DrumKnob extends React.Component {
  render() {
    const { styles: _, innerColor="#888", label="", level=false, ...restProps} = this.props;

    let levelInd = null;
    if (level) {
      levelInd = <div styleName="level-ind"></div>
    }

    return (
      <div styleName='wrapper'>
        <div styleName='label-wrapper'>
          <span styleName='label'>{label}</span>
        </div>
        <div styleName='control-wrapper'>
          {levelInd}
          <div styleName='guide-wrapper'>
            <Guides num={11} distance={25} hideCount={1} guideStyle={{
              width: 2,
              height: 20,
              backgroundColor: themeVariables.grey
            }} />
          </div>
          <div styleName='knob-wrapper'>
            <Knob {...restProps} bufferSize={300}>
              <div styleName='inner' style={{ backgroundColor: innerColor }}>
                <div styleName='handle'></div>
              </div>
            </Knob>
          </div>
        </div>
      </div>
    );
  }
}

DrumKnob.propTypes = {
  ...Knob.propTypes,
  innerColor: React.PropTypes.string,
  level: React.PropTypes.bool,
  label: React.PropTypes.string
};

export default CSSModules(DrumKnob, styles);

