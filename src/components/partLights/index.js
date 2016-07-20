import React from 'react';
import Radium from 'radium';

import Light from 'components/light';

import { labelGreyNormal } from 'theme/mixins';

@Radium
class PartLights extends React.Component {
  static propTypes = {
    firstActive: React.PropTypes.bool.isRequired,
    secondActive: React.PropTypes.bool.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number.isRequired
  };

  render() {
    const {firstActive, secondActive, width, height, offset} = this.props;

    const styles = {
      wrapper: {
        position: 'relative',
        right: offset,
        width, height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7
      },

      partWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },

      label: {
        ...labelGreyNormal,
        marginTop: 4
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.partWrapper}>
          <Light active={firstActive} />
          <div style={styles.label}>1st PART</div>
        </div>
        <div style={styles.partWrapper}>
          <Light active={secondActive} />
          <div style={styles.label}>2nd PART</div>
        </div>
      </div>
    )
  }
}

export default PartLights;