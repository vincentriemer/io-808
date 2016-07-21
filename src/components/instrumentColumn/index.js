import React from 'react';
import Radium from 'radium';

// Layouts
import InstrumentColumnLayout from 'layouts/instrumentColumn';

// Components
import InstrumentLabel from 'components/instrumentLabel';
import DrumSwitch from 'components/drumSwitch';
import DrumKnob, { LABEL_HEIGHT } from 'components/drumKnob';

export const EMPTY_CONTROL = 'EMPTY';

@Radium
class InstrumentColumn extends React.Component {
  static propTypes = {
    config: React.PropTypes.object.isRequired,
    controlState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  };

  render() {
    const { config: { type, labels, controls }, controlState, onChange, width, height } = this.props;

    const DRUM_KNOB_SIZE = Math.ceil(width * 0.72);

    // create label section
    let labelComponents = [];
    labelComponents.push(<InstrumentLabel key={`${type}-label-0`} label={labels[0]} />)
    if (labels.length == 2) {
      labelComponents.push(
        <DrumSwitch key={`${type}-switch`} position={controlState.switch} onChange={(value) => onChange(type, 'switch', value)} />
      );
      labelComponents.push(<InstrumentLabel key={`${type}-label-1`} label={labels[1]} />);
    }

    // create control section
    let controlComponents = [];
    controlComponents.push(
      <DrumKnob
        key={`${type}-knob-level`}
        value={controlState.level}
        onChange={(value) => onChange(type, 'level', value)}
        size={DRUM_KNOB_SIZE}
        label='LEVEL' level />
    );
    controls.forEach((controlName, index) => {
      if (controlName !== EMPTY_CONTROL) {
        controlComponents.push(
          <DrumKnob
            key={`${type}-knob-${index}`}
            value={controlState[controlName]}
            onChange={(value) => onChange(type, controlName, value)}
            size={DRUM_KNOB_SIZE}
            label={controlName.toUpperCase()} />
        );
      } else {
        controlComponents.push(
          <div key={`${type}-knob-${index}`} style={{width: DRUM_KNOB_SIZE, height: DRUM_KNOB_SIZE + LABEL_HEIGHT}}></div>
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