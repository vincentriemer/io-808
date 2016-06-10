import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Knob from './drumKnob';

class KnobWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 50 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({value: newValue});
    // action('changed')(newValue);
  }

  render() {
    return <Knob {...this.props} value={this.state.value} onChange={this.handleChange} />;
  }
}

storiesOf('DrumKnob', module)
  .add('with a small step size', () => (
    <KnobWrapper min={0} max={100} step={1} />
  ))
  .add('with a large step size', () => (
    <KnobWrapper min={0} max={100} step={10} />
  ))
  .add('with the value displayed', () => (
    <KnobWrapper min={0} max={100} step={1} displayValue={true} />
  ))
  .add('styled for misc control', () => (
    <KnobWrapper min={0} max={100} step={1} displayValue={true} innerColor="#C8D4C8" label='TONE' />
  ))
  .add('styled for level control', () => (
    <KnobWrapper min={0} max={100} step={1} displayValue={true} level={true} innerColor="#F55D02" label='LEVEL' />
  ));