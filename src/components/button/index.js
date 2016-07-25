import React from 'react';
import Radium from 'radium';

import { grey } from 'theme/variables';

@Radium
class Button extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    const {style, children, disabled=false, onClick=()=>{}} = this.props;

    const styles = {
      button: {
        backgroundColor: grey,
        width: 80, height: 40,
        transition: 'transform 0.05s, opacity 0.5s',
        transform: 'scale(1.0) translateZ(0)',
        ':hover': {
          cursor: 'pointer',
          transform: style.transform ? style.transform : '' + 'scale(1.04) translateZ(0)'
        },
        ':active': {
          transform: style.transform ? style.transform : '' + 'scale(1.0) translateZ(0)'
        },
        userSelect: 'none',

        // disabled styles
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.5 : 1
      }
    };

    return (
      <div style={[styles.button, style]} onClick={onClick}>
        {children}
      </div>
    );
  }
}

export default Button;