import React from "react";
import PropTypes from "prop-types";

import { red, grey } from "theme/variables";
import { labelGreySmall } from "theme/mixins";

const noOp = () => {};

class ClearButton extends React.Component {
  static propTypes = {
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleDragStart = this.handleDragStart.bind(this);
  }

  handleDragStart() {
    this.props.onDragStart();
  }

  render() {
    const {
      onMouseDown = noOp,
      onMouseUp = noOp,
      draggable = false,
      onDragEnd = noOp
    } = this.props;

    const styles = {
      wrapper: {
        position: "relative"
      },

      instructionLabel: {
        ...labelGreySmall,
        color: "#FFF",
        position: "absolute",
        width: 100,
        bottom: -36,
        left: -15,
        transition: "opacity 1s",
        opacity: draggable ? 1.0 : 0.0
      },

      clearButton: {
        width: 27,
        height: 27,
        borderRadius: "50%",
        backgroundColor: red,
        border: `2px solid ${grey}`,
        ":hover": {
          cursor: "move"
        }
      }
    };

    if (draggable) {
      return (
        <div style={styles.wrapper}>
          <div
            style={styles.clearButton}
            draggable={true}
            onDragEnd={onDragEnd}
            onDragStart={this.handleDragStart}
          />
          <div style={styles.instructionLabel}>
            Drag to a Step Button to set Pattern Length
          </div>
        </div>
      );
    } else {
      styles.clearButton = {
        ...styles.clearButton,
        ":hover": {
          cursor: "pointer",
          transform: "scale(1.08) translateZ(0)"
        },
        ":active": {
          transform: "scale(1.0) translateZ(0)"
        }
      };

      return (
        <div style={styles.wrapper}>
          <div
            style={styles.clearButton}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
          <div style={styles.instructionLabel}>
            Drag to a Step Button to set Pattern Length
          </div>
        </div>
      );
    }
  }
}

export default ClearButton;
