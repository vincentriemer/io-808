import React from 'react';
import Radium from 'radium';

import Light from '../light/light';
import Switch from '../switch/switch';

import { grey, darkBlack, silver } from '../../theme/variables';
import { labelDarkGrey } from '../../theme/mixins';

@Radium
class BasicVariationSwitch extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    position: React.PropTypes.number.isRequired,
    aActive: React.PropTypes.bool.isRequired,
    bActive: React.PropTypes.bool.isRequired,
  }

  render() {
    const { onChange, position, aActive, bActive } = this.props;

    const thickness = 35;
    const length = 100;

    const styles = {
      wrapper: {
        width: length * 1.8, height: 130,

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
        paddingTop: 10,
        borderRadius: 1
      },

      lightsWrapper: {
        width: length,
        height: thickness - 5,
        backgroundColor: darkBlack,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4
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
        <div style={styles.switchTitle}>BASIC VARIATION</div>
        <div style={styles.switchWrapper}>
          <Switch
            position={position}
            onChange={onChange}
            direction='horizontal'
            numPositions={3}
            thickness={thickness}
            length={length}
            padding={5}
            innerThickness={thickness - 10}
            outerStyle={styles.switchOuter}
            innerStyle={styles.switchInner} />
          <div style={styles.labelWrapper}>
            <div style={styles.label}>A</div>
            <div style={styles.label}>AB</div>
            <div style={styles.label}>B</div>
          </div>
        </div>
        <div style={styles.lightsWrapper}>
          <Light active={aActive} />
          <Light active={bActive} />
        </div>
      </div>
    );
  }
}

export default BasicVariationSwitch;