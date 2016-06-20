import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BasicVariationSwitch from './BasicVariationSwitch';

import { grey } from '../../theme/variables';

class SwitchWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchPosition: 0,
      aActive: true,
      bActive: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    let aActive, bActive;

    switch (value) {
      case 0:
        aActive = true;
        bActive = false;
        break;
      case 1:
        aActive = true;
        bActive = true;
        break;
      case 2:
        aActive = false;
        bActive = true;
        break;
    }

    this.setState({
      switchPosition: value,
      aActive, bActive
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
        <BasicVariationSwitch
          onChange={this.handleChange}
          position={this.state.switchPosition}
          aActive={this.state.aActive}
          bActive={this.state.bActive} />
      </div>
    );
  }
}

storiesOf('BasicVariationSwitch', module)
  .add('default', () => (
    <SwitchWrapper />
  ));