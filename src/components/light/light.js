/**
 * Created by vincentriemer on 5/22/16.
 */
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './light.scss';

class Light extends React.Component {
  render() {
    const { active } = this.props;
    return (
      <div styleName='light-outer'>
        <div styleName={`light-inner--${active ? 'active' : 'inactive'}`}></div>
      </div>
    );
  }
}

Light.propTypes = {
  active: React.PropTypes.bool.isRequired
};

export default CSSModules(Light, styles);