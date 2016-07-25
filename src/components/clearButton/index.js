import React from 'react';
import Radium from 'radium';

import { red, grey } from 'theme/variables';
import {labelGreySmall} from 'theme/mixins';

const noOp = () => {};

@Radium
class ClearButton extends React.Component {
  static propTypes = {
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    draggable: React.PropTypes.bool,
    onDragStart: React.PropTypes.func,
    onDragEnd: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleDragStart = this.handleDragStart.bind(this);
  }

  handleDragStart(e) {
    this.props.onDragStart();
  }

  render() {
    const { onMouseDown=noOp, onMouseUp=noOp, draggable=false, onDragEnd=noOp } = this.props;

    const styles = {
      wrapper: {
        position: 'relative'
      },

      instructionLabel: {
        ...labelGreySmall,
        color: '#FFF',
        position: 'absolute',
        width: 100,
        bottom: -36, left: -15,
        transition: 'opacity 1s',
        opacity: draggable ? 1.0 : 0.0
      },

      clearButton: {
        width: 27, height: 27,
        borderRadius: '50%',
        backgroundColor: red,
        border: `2px solid ${grey}`,
        ':hover': {
          cursor: 'move'
        }
      }
    };

    if (draggable) {
      return (
        <div style={styles.wrapper}>
          <div style={styles.clearButton}
                draggable={true}
                onDragEnd={onDragEnd}
                onDragStart={this.handleDragStart}></div>
          <div style={styles.instructionLabel}>
            Drag to a Step Button to set Pattern Length
          </div>
        </div>
      );

    } else {
      styles.clearButton = {
        ...styles.clearButton,
        ':hover': {
          cursor: 'pointer',
          transform: 'scale(1.08) translateZ(0)'
        },
        ':active': {
          transform: 'scale(1.0) translateZ(0)'
        }
      };

      return (
        <div style={styles.wrapper}>
          <div style={styles.clearButton}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
          ></div>
          <div style={styles.instructionLabel}>
            Drag to a Step Button to set Pattern Length
          </div>
        </div>
      );
    }
  }
}

export default ClearButton;


