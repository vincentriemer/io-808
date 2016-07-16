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
    const {style, children} = this.props;

    const styles = {
      button: {
        backgroundColor: grey,
        width: 80, height: 40,
        transition: 'transform 0.05s',
        transform: 'scale(1.0) translateZ(0)',
        ':hover': {
          cursor: 'pointer',
          transform: style.transform ? style.transform : '' + 'scale(1.04) translateZ(0)'
        },
        ':active': {
          transform: style.transform ? style.transform : '' + 'scale(1.0) translateZ(0)'
        },
        userSelect: 'none'
      }
    };

    return (
      <div style={[styles.button, style]} onClick={this.handleClick}>
        {children}
      </div>
    );
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  style: React.PropTypes.object
};

export default Button;