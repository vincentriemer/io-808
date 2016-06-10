import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TempoKnob from './tempoKnob';

class KnobWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 165 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({value: newValue});
    // action('changed')(newValue);
  }

  render() {
    return <TempoKnob value={this.state.value} onChange={this.handleChange} />;
  }
}

storiesOf('TempoKnob', module)
  .add('default', () => (
    <KnobWrapper />
  ));