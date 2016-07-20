import React from 'react';
import Radium from 'radium';

import Knob from 'components/knob';
import Guides from 'components/guides';
import SelectorKnobInner from 'components/selectorKnobInner';

import { grey } from 'theme/variables';
import { labelGreySmall, labelGreyLarge, ring } from 'theme/mixins';

const labelHeight = 33;

const guideValues = [
  <div style={{transform: 'translateX(-15px)'}}>MANUAL</div>,
  16,12,8,4,2
];
guideValues.push();

@Radium
class AutoFillInKnob extends React.Component {
  render() {
    const {value, onChange, size=200} = this.props;

    const styles = {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: size, height: size
      },

      controlWrapper: {
        position: 'relative',
        width: size, height: size
      },

      labelGuide: labelGreySmall,

      dotGuide: {
        width: 5, height: 5,
        backgroundColor: grey,
        borderRadius: '50%'
      },

      knobWrapper: ring(size / 2),

      labelWrapper: {
        position: 'relative',
        transform: 'translateY(-70%)',
        width: size, height: labelHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      measuresLabel: labelGreySmall,

      autoLabel: {
        position: 'relative', top: -4,
        ...labelGreyLarge
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.controlWrapper}>
          <Guides num={6} distance={size*0.29} hideCount={6} guideStyle={styles.dotGuide} />
          <Guides distance={size*0.37} hideCount={5.5} values={guideValues} rotate={false} guideStyle={styles.labelGuide} />
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              size={size / 2}
              bufferSize={150}
              min={0} max={5}
              step={1}>
              <SelectorKnobInner size={size / 2} />
            </Knob>
          </div>
        </div>
        <div style={styles.labelWrapper}>
          <div style={styles.measuresLabel}>MEASURES</div>
          <div style={styles.autoLabel}>AUTO FILL IN</div>
        </div>
      </div>
    );
  }
}

AutoFillInKnob.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default AutoFillInKnob;