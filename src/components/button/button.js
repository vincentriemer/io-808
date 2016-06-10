/**
 * Created by vincentriemer on 5/22/16.
 */
import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './button.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div styleName='button' onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object
};

export default CSSModules(Button, styles);