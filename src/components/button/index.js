import React from "react";
import { usePress } from "react-events/press";
import { useHover } from "react-events/hover";

import { grey } from "theme/variables";

const styles = {
  button: {
    display: "block",
    backgroundColor: grey,
    padding: 0,
    width: 80,
    height: 40,
    transition: "transform cubic-bezier(0.4, 0.0, 0.2, 1) .1s, opacity 0.5s",
    transform: "scale(1.0) translateZ(0)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    userSelect: "none",
    pointerEvents: "auto",
    opacity: 1
  },
  hover: {
    cursor: "pointer",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    transform: "scale(1.04) translateZ(0)"
  },
  active: {
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transform: "scale(1.0) translateZ(0)"
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.5
  }
};

const Button = props => {
  const { style, children, disabled = false, onClick = () => {} } = props;

  const [isPressed, setIsPressed] = React.useState(false);
  const pressListener = usePress({
    onPress: onClick,
    onPressChange: setIsPressed
  });

  const [isHovered, setIsHovered] = React.useState(false);
  const hoverListener = useHover({
    onHoverChange: setIsHovered
  });

  const listeners = React.useMemo(() => [pressListener, hoverListener], [
    hoverListener,
    pressListener
  ]);

  const buttonStyle = React.useMemo(() => {
    let result = styles.button;
    if (isHovered) {
      result = { ...result, ...styles.hover };
    }
    if (isPressed) {
      result = { ...result, ...styles.active };
    }
    if (disabled) {
      result = { ...result, ...styles.disabled };
    }
    return {
      ...result,
      ...style
    };
  }, [disabled, isHovered, isPressed, style]);

  return (
    <button style={buttonStyle} listeners={listeners}>
      {children}
    </button>
  );
};

export default Button;
