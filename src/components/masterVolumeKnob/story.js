import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MasterVolumeKnob from './';

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
    return <MasterVolumeKnob value={this.state.value} onChange={this.handleChange} />;
  }
}

storiesOf('MasterVolumeKnob', module)
  .add('default', () => (
    <KnobWrapper />
  ));