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
    action('changed')(newValue);
  }

  render() {
    return <Knob {...this.props} min={0} max={100} value={this.state.value} onChange={this.handleChange} />;
  }
}

storiesOf('DrumKnob', module)
  .add('styled for misc control', () => (
    <KnobWrapper innerColor="#C8D4C8" label='TONE' />
  ))
  .add('styled for level control', () => (
    <KnobWrapper level={true} innerColor="#F55D02" label='LEVEL' />
  ));