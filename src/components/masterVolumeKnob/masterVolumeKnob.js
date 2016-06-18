import React from 'react';
import Radium from 'radium';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import { grey } from '../../theme/variables';
import { labelGreySmall, labelGreyNormal, ring } from '../../theme/mixins';

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

const labelHeight = 20;

@Radium
class MasterVolumeKnob extends React.Component {
  render() {
    const {value, onChange, size=130} = this.props;

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

      knobWrapper: ring(100),

      label: {
        ...labelGreyNormal,
        width: size,
        overflow: 'visible'
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.controlWrapper}>
          <Guides num={11} distance={58} hideCount={1} guideStyle={styles.dotGuides} />
          <Guides distance={73} hideCount={1} rotate={false} values={labelValues} guideStyle={styles.labelGuides} />
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              size={100}
              bufferSize={300}
              min={0} max={100}
              step={0.1}>
              <SelectorKnobInner size={100} />
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
