import React from 'react';
import Radium from 'radium';

import Light from '../light/light';
import Switch from '../switch/switch';

import { grey, darkBlack, silver } from '../../theme/variables';
import { labelDarkGrey } from '../../theme/mixins';

@Radium
class IFVariationSwitch extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    position: React.PropTypes.number.isRequired
  }

  render() {
    const { onChange, position } = this.props;

    const thickness = 35;
    const length = 65;

    const styles = {
      wrapper: {
        width: length * 1.8, height: 87.5,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      switchTitle: labelDarkGrey,

      label: labelDarkGrey,

      switchWrapper: {
        width: length,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },

      labelWrapper: {
        width: length - 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 5
      },

      switchOuter: {
        backgroundColor: darkBlack,
        borderRadius: thickness * .475
      },

      switchInner: {
        backgroundColor: silver,
        borderRadius: '50%',
        border: `solid ${grey} 2px`
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.switchTitle}>I / F - VARIATION</div>
        <div style={styles.switchWrapper}>
          <Switch
            position={position}
            onChange={onChange}
            direction='horizontal'
            numPositions={2}
            thickness={thickness}
            length={length}
            padding={5}
            innerThickness={thickness - 10}
            outerStyle={styles.switchOuter}
            innerStyle={styles.switchInner} />
          <div style={styles.labelWrapper}>
            <div style={styles.label}>A</div>
            <div style={styles.label}>B</div>
          </div>
        </div>
      </div>
    );
  }
}

export default IFVariationSwitch;