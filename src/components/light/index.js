import React from 'react';
import Radium from 'radium';

import { lightActive, lightInactive } from 'theme/variables';

const size = 18;
const innerPadding = 4;

@Radium
class Light extends React.Component {
  render() {
    const { active } = this.props;

    const baseInnerStyle = {
      position: 'absolute',
      left: innerPadding,
      right: innerPadding,
      top: innerPadding,
      bottom: innerPadding,
      borderRadius: '50%',
    };

    const styles = {
      outer: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: size, height: size,
        borderRadius: '50%',
        pointerEvents: 'none'
      },
      innerInactive: {
        ...baseInnerStyle,
        backgroundColor: lightInactive
      },
      innerActive: {
        ...baseInnerStyle,
        backgroundColor: lightActive,
        opacity: active ? 1 : 0
      }
    };

    return (
      <div style={styles.outer}>
        <div style={styles.innerInactive}></div>
        <div style={styles.innerActive}></div>
      </div>
    );
  }
}

Light.propTypes = {
  active: React.PropTypes.bool.isRequired
};

export default Light;