import React from 'react';
import Radium from 'radium';

import Button from '../button/button';
import Light from '../light/light';

@Radium
class StepButton extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  };

  render() {
    const {color, onClick, active, width=50, height=80} = this.props;

    const styles = {
      button: {
        width, height,
        backgroundColor: color,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5
      }
    };

    return (
      <Button style={styles.button} onClick={onClick}>
        <Light active={active}/>
      </Button>
    );
  }
}

export default StepButton;