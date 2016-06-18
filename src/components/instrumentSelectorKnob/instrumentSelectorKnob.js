import React from 'react';
import Radium from 'radium';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import {
  fontFamily, normalSize, letterSpacing, smallSize, fontWeight,
  darkGrey, drumLabel, stencilOrange
} from '../../theme/variables';
import { ring } from '../../theme/mixins';

const guideNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
const guideLabels = ['AC','BD','SD','LT','MT','HT','RS','CP','CB','CY','OH','CH'];

@Radium
class InstrumentSelectorKnob extends React.Component {
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

      knobWrapper: ring(size / 2),

      numberGuides: {
        fontFamily,
        fontSize: smallSize,
        fontWeight,
        letterSpacing,
        color: stencilOrange
      },

      labelGuides: {
        fontFamily,
        fontSize: normalSize,
        fontWeight: 'normal',
        letterSpacing,
        color: darkGrey,
        backgroundColor: drumLabel,
        borderRadius: 3,
        textAlign: 'center',
        width: 35,
        paddingTop: 2, paddingBottom: 2
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.controlWrapper}>
          <Guides distance={58} offset={15} rotate={false} values={guideNumbers} guideStyle={styles.numberGuides} />
          <Guides distance={85} offset={15} rotate={false} values={guideLabels} guideStyle={styles.labelGuides} />
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              size={size / 2}
              bufferSize={330}
              min={0} max={11}
              step={1}>
              <SelectorKnobInner size={size / 2} />
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

export default InstrumentSelectorKnob;