import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import SoundSwitch from './switch';

class SwitchWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: 1 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newPosition) {
    this.setState({ position: newPosition });
    action('changed')(newPosition);
  }

  render() {
    return <SoundSwitch
      position={this.state.position}
      onChange={this.handleChange}
      outerStyle={{ backgroundColor: '#777', borderRadius: 35/2 }}
      innerStyle={{ backgroundColor: '#333', borderRadius: 35/2 }}
      {...this.props}
    />;
  }
}

storiesOf('Switch', module)
  .add('Horizontal switch with 2 positions', () => (
  <SwitchWrapper
    direction='horizontal'
    numPositions={2}
    thickness={35}
    length={65}
    padding={5}
    innerThickness={25}
  />
)).add('Vertical switch with 2 positions', () => (
  <SwitchWrapper
    direction='vertical'
    numPositions={2}
    thickness={35}
    length={65}
    padding={5}
    innerThickness={25}
  />
)).add('Horizontal switch with 4 positions', () => (
  <SwitchWrapper
    direction='horizontal'
    numPositions={4}
    thickness={35}
    length={120}
    padding={5}
    innerThickness={25}
  />
)).add('Vertical switch with 4 positions', () => (
  <SwitchWrapper
    direction='vertical'
    numPositions={4}
    thickness={35}
    length={120}
    padding={5}
    innerThickness={25}
  />
));

