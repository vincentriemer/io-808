import React from 'react';
import Radium from 'radium';

import {grey} from '../../theme/variables';

@Radium
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    const styles = {
      button: {
        backgroundColor: grey,
        width: 80, height: 40,
        transition: 'transform 0.05s',
        ':hover': {
          cursor: 'pointer',
          transform: 'scale(1.025)'
        },
        ':active': {
          transform: 'scale(1.0)'
        }
      }
    };

    return (
      <div style={[styles.button, this.props.style]} onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object
};

export default Button;