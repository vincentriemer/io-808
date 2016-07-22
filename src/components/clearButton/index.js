import React from 'react';
import Radium from 'radium';

import { red, grey } from 'theme/variables';

const noOp = () => {};

@Radium
class ClearButton extends React.Component {
  static propTypes = {

  };

  render() {
    const { onMouseDown=noOp, onMouseUp=noOp, draggable=false } = this.props;

    const styles = {
      clearButton: {
        width: 27, height: 27,
        borderRadius: '50%',
        backgroundColor: red,
        border: `2px solid ${grey}`,
        ':hover': {
          cursor: 'pointer',
          transform: 'scale(1.04) translateZ(0)'
        },
        ':active': {
          transform: 'scale(1.0) translateZ(0)'
        },
      }
    };

    if (draggable) {
      return <div style={styles.clearButton}></div>
    } else {
      return <div style={styles.clearButton}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
      ></div>
    }
  }
}

export default ClearButton;


