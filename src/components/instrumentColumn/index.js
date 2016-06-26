import React from 'react';

// Theme
import {darkGrey, grey} from '../../theme/variables';

// Layouts
import InstrumentColumnLayout from '../../layouts/instrumentColumn';

// Components
import InstrumentLabel from '../../components/instrumentLabel';
import DrumSwitch from '../../components/drumSwitch/drumSwitch';
import DrumKnob, { LABEL_HEIGHT } from '../../components/drumKnob/drumKnob';

export const EMPTY_CONTROL = 'EMPTY';

class InstrumentColumn extends React.Component {
  static propTypes = {
    config: React.PropTypes.object.isRequired,
    controlState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }

  render() {
    const { config: { type, labels, controls }, controlState, onChange, width, height } = this.props;

    const DRUM_KNOB_SIZE = width * 0.72;

    // create label section
    let labelComponents = [];
    labelComponents.push(<InstrumentLabel label={labels[0]} />)
    if (labels.length == 2) {
      labelComponents.push(
        <DrumSwitch position={controlState.switch} onChange={(value) => onChange(type, 'switch', value)} />
      );
      labelComponents.push(<InstrumentLabel label={labels[1]} />);
    }

    // create control section
    let controlComponents = [];
    controlComponents.push(
      <DrumKnob
        value={controlState.level}
        onChange={(value) => onChange(type, 'level', value)}
        size={DRUM_KNOB_SIZE}
        label='LEVEL' level />
    );
    controls.forEach((controlName) => {
      if (controlName !== EMPTY_CONTROL) {
        controlComponents.push(
          <DrumKnob
            value={controlState[controlName]}
            onChange={(value) => onChange(type, controlName, value)}
            size={DRUM_KNOB_SIZE}
            label={controlName.toUpperCase()} />
        );
      }
    });

    return (
      <InstrumentColumnLayout labels={labelComponents} width={width} height={height}>
        {controlComponents}
      </InstrumentColumnLayout>
    );
  }
}

export default InstrumentColumn;