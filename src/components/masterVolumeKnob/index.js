import React from 'react';
import Radium from 'radium';

import Knob from 'components/knob';
import Guides from 'components/guides';
import SelectorKnobInner from 'components/selectorKnobInner';

import { grey } from 'theme/variables';
import { labelGreySmall, labelGreyNormal, ring } from 'theme/mixins';

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

const labelHeight = 9;

@Radium
class MasterVolumeKnob extends React.Component {
  render() {
    const {value, onChange, size=130} = this.props;

    const knobSize = Math.ceil(size * 0.54);

    const styles = {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: size, height: size + labelHeight
      },

      controlWrapper: {
        position: 'relative',
        width: size, height: size
      },

      dotGuides: {
        width: 5, height: 5,
        backgroundColor: grey,
        borderRadius: '50%'
      },

      labelGuides: labelGreySmall,

      knobWrapper: ring(knobSize),

      label: {
        position: 'relative',
        ...labelGreyNormal,
        width: size,
        overflow: 'visible',
        top: -4
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.controlWrapper}>
          <Guides num={11} distance={size * 0.33} hideCount={1} guideStyle={styles.dotGuides} />
          <Guides distance={size * 0.45} hideCount={1} rotate={false} values={labelValues} guideStyle={styles.labelGuides} />
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              size={knobSize}
              bufferSize={300}
              min={0} max={100}
              step={0.1}>
              <SelectorKnobInner size={knobSize} />
            </Knob>
          </div>
        </div>
        <div style={styles.label}>
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

export default MasterVolumeKnob;
