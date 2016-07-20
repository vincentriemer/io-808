import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ModeKnob from './';

class KnobWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({value: newValue});
    action('changed')(newValue);
  }

  render() {
    return <ModeKnob value={this.state.value} onChange={this.handleChange} />;
  }
}

storiesOf('ModeKnob', module)
  .add('default', () => (
    <KnobWrapper />
  ));