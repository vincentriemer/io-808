import React from "react";
import usePress from "react-gui/use-press";
import useHover from "react-gui/use-hover";

import { red, grey } from "theme/variables";
import { labelGreySmall } from "theme/mixins";

import { usePressEvents } from "react-gui/use-press/events";

const noOp = () => {};

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
    transition: "opacity 1s"
  },
  clearButton: {
    width: 27,
    height: 27,
    borderRadius: "50%",
    backgroundColor: red,
    border: `2px solid ${grey}`
  },
  clearButtonHover: {
    cursor: "move"
  }
};

const ClearButton = props => {
  const {
    onMouseDown = noOp,
    onMouseUp = noOp,
    draggable = false,
    onDragEnd = noOp,
    onDragStart = noOp
  } = props;

  const ref = React.useRef(null);

  const { isPressed: isActive } = usePress(ref, {});
  usePressEvents(ref, {
    onPressStart: onMouseDown,
    onPressEnd: onMouseUp
  });
  const { isHovered } = useHover(ref);

  if (draggable) {
    return (
      <div style={styles.wrapper}>
        <div
          ref={ref}
          style={{
            ...styles.clearButton,
            ...(isHovered && styles.clearButtonHover)
          }}
          draggable={true}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        />
        <div
          style={{ ...styles.instructionLabel, opacity: draggable ? 1.0 : 0.0 }}
        >
          Drag to a Step Button to set Pattern Length
        </div>
      </div>
    );
  }

  const buttonStyle = { ...styles.clearButton };
  if (isHovered) {
    buttonStyle.cursor = "pointer";
    buttonStyle.transform = "scale(1.08) translateZ(0)";
  }
  if (isActive) {
    buttonStyle.transform = "scale(1.0) translateZ(0)";
  }
  return (
    <div style={styles.wrapper}>
      <div ref={ref} style={buttonStyle} />
      <div style={styles.instructionLabel}>
        Drag to a Step Button to set Pattern Length
      </div>
    </div>
  );
};

export default ClearButton;
