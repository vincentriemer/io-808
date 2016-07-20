import React from 'react';
import { storiesOf } from '@kadira/storybook';
import PreScaleSwitch from './';

class SwitchWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchPosition: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      switchPosition: value
    });
  }

  render() {

    return (
      <PreScaleSwitch
        onChange={this.handleChange}
        position={this.state.switchPosition} />
    );
  }
}

storiesOf('PreScaleSwitch', module)
  .add('default', () => (
    <SwitchWrapper />
  ));