import React from "react";
import useHover from "react-gui/use-hover";
import usePress from "react-gui/use-press";
import useFocus from "react-gui/use-focus";
import useFocusVisibility from "react-gui/use-focus-visibility";

import { grey } from "theme/variables";
import { focusOutline } from "theme/mixins";

const styles = {
  button: {
    display: "block",
    backgroundColor: grey,
    padding: 0,
    width: 80,
    height: 40,
    transition: "transform cubic-bezier(0.4, 0.0, 0.2, 1) .1s, opacity 0.5s",
    transform: "scale(1.0)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    userSelect: "none",
    pointerEvents: "auto",
    opacity: 1,
    cursor: "pointer"
  },
  focused: {
    ...focusOutline
  },
  hover: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    transform: "scale(1.04)"
  },
  active: {
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transform: "scale(1.0)"
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.5
  }
};

const Button = props => {
  const { style, children, disabled = false, onClick = () => {} } = props;

  const ref = React.useRef(null);

  const [isPressed, onPressChange] = React.useState(false);
  usePress(ref, {
    disabled,
    onPress: onClick,
    onPressChange
  });

  const [isHovered, onHoverChange] = React.useState(false);
  useHover(ref, {
    disabled,
    onHoverChange
  });

  const focusVisible = useFocusVisibility();
  const [focused, onFocusChange] = React.useState(false);
  useFocus(ref, { disabled, onFocusChange });
  const isFocusedAndVisible = focused && focusVisible;

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
    if (isFocusedAndVisible) {
      result = { ...result, ...styles.focused };
    }
    return {
      ...result,
      ...style
    };
  }, [disabled, isFocusedAndVisible, isHovered, isPressed, style]);

  return (
    <button ref={ref} style={buttonStyle} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
