import React from 'react';
import Radium from 'radium';

import Knob from '../knob/knob';
import Guides from '../guides/guides';
import SelectorKnobInner from '../selectorKnobInner/selectorKnobInner';

import { labelGreyLarge, ring } from '../../theme/mixins';
import { grey, darkGrey, fontFamily, normalSize, fontWeight, letterSpacing} from '../../theme/variables';

const guideNumbers = [0,1,2,3,4,5,6,7,8,9,10];

let guideValues = [];
for (let i = 0; i < 41; i++) {
  let size = i % 4 === 0 ? 5 : 4;
  guideValues.push(<div style={{
    width: size, height: size,
    backgroundColor: grey,
    borderRadius: '50%'
  }}></div>);
}

const labelHeight= 25;

@Radium
class TempoKnob extends React.Component {
  render() {
    const {value, onChange, size=216} = this.props;
    const knobSize = size * 0.75;

    const styles = {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: size, height: size + labelHeight
      },

      labelWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },

      label: labelGreyLarge,

      controlWrapper: {
        position: 'relative',
        width: size, height: size
      },

      ringOuter: ring('100%', grey),
      ringInner: ring('83%', darkGrey),
      knobWrapper: ring('75%'),

      labelGuides: {
        fontFamily, fontWeight, letterSpacing,
        fontSize: normalSize,
        color: darkGrey
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.labelWrapper}>
          <div style={styles.label}>TEMPO</div>
        </div>
        <div style={styles.controlWrapper}>
          <div style={styles.ringOuter}></div>
          <Guides distance={size*0.46} hideCount={1} values={guideNumbers} rotate={false} guideStyle={styles.labelGuides} />
          <div style={styles.ringInner}></div>
          <Guides num={41} distance={size*0.39} hideCount={7} values={guideValues} />
          <div style={styles.knobWrapper}>
            <Knob
              value={value}
              onChange={onChange}
              size={knobSize}
              bufferSize={300}
              min={30} max={300}
              step={6.75}
            >
              <SelectorKnobInner size={knobSize} />
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

export default TempoKnob;