import React from "react";
import { usePress } from "react-events/press";
import { useHover } from "react-events/hover";

import { red, grey } from "theme/variables";
import { labelGreySmall } from "theme/mixins";

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

  const [isHovered, setIsHovered] = React.useState(false);
  const hoverListener = useHover({
    onHoverChange: setIsHovered
  });

  const [isActive, setIsActive] = React.useState(false);
  const pressListener = usePress({
    onPressChange: setIsActive,
    onPressStart: onMouseDown,
    onPressEnd: onMouseUp
  });

  if (draggable) {
    const listeners = [hoverListener];
    return (
      <div style={styles.wrapper}>
        <div
          style={{
            ...styles.clearButton,
            ...(isHovered && styles.clearButtonHover)
          }}
          draggable={true}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          listeners={listeners}
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
  const listeners = [hoverListener, pressListener];
  return (
    <div style={styles.wrapper}>
      <div style={buttonStyle} listeners={listeners} />
      <div style={styles.instructionLabel}>
        Drag to a Step Button to set Pattern Length
      </div>
    </div>
  );
};

export default ClearButton;
