import React from 'react';
import Radium from 'radium';

import Switch from '../switch/switch';

import { darkBlack, slightlyDarkerBlack } from '../../theme/variables';

const borderRadius = 2;

@Radium
class DrumSwitch extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    position: React.PropTypes.number.isRequired
  }

  render() {
    const styles = {
      inner: {
        backgroundColor: darkBlack,
        borderRadius: borderRadius
      },

      outer: {
        backgroundColor: slightlyDarkerBlack,
        borderRadius: borderRadius
      }
    };

    return (
      <Switch
        {...this.props}
        direction='vertical'
        numPositions={2}
        thickness={30}
        length={50}
        padding={4}
        innerThickness={22}
        outerStyle={styles.outer}
        innerStyle={styles.inner} />
    );
  }
}

export default DrumSwitch;