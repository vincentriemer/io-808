import React from 'react';
import Radium from 'radium';

import { lightActive, lightInactive } from 'theme/variables';

const size = 18;
const innerPadding = 4;

@Radium
class Light extends React.Component {
  render() {
    const { active } = this.props;
    const styles = {
      outer: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: size, height: size,
        borderRadius: '50%'
      },
      inner: {
        position: 'absolute',
        left: innerPadding,
        right: innerPadding,
        top: innerPadding,
        bottom: innerPadding,
        borderRadius: '50%',

        backgroundColor: active ? lightActive : lightInactive
      }
    };

    return (
      <div style={styles.outer}>
        <div style={styles.inner}></div>
      </div>
    );
  }
}

Light.propTypes = {
  active: React.PropTypes.bool.isRequired
};

export default Light;