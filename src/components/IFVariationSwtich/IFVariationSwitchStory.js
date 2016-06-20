import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import IFVariationSwitch from './IFVariationSwitch';

import { grey } from '../../theme/variables';

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
    const style = {
      width: '100%', height: '100%',
      backgroundColor: grey,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
      <div style={style}>
        <IFVariationSwitch
          onChange={this.handleChange}
          position={this.state.switchPosition} />
      </div>
    );
  }
}

storiesOf('IFVariationSwitch', module)
  .add('default', () => (
    <SwitchWrapper />
  ));