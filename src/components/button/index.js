import React from "react";
import * as stylex from "@stylexjs/stylex";
import usePress from "react-gui/use-press";
import useFocus from "react-gui/use-focus";
import useFocusVisibility from "react-gui/use-focus-visibility";

import { themeStyles } from "theme/styles";
import { tokens } from "theme/variables.stylex";

const styles = stylex.create({
  button: {
    display: "block",
    backgroundColor: tokens.grey,
    padding: 0,
    width: 80,
    height: 40,
    transition: "transform cubic-bezier(0.4, 0.0, 0.2, 1) .1s, opacity 0.5s",
    transform: "scale(1.0)",
    boxShadow: tokens.buttonShadow,
    userSelect: "none",
    pointerEvents: "auto",
    opacity: 1,
    cursor: "pointer"
  },
  interactive: {
    ":hover": {
      boxShadow: tokens.buttonHoverShadow,
      transform: "scale(1.04)"
    }
  },
  active: {
    boxShadow: tokens.buttonShadow,
    transform: "scale(1.0)",
    ":hover": {
      boxShadow: tokens.buttonShadow,
      transform: "scale(1.0)"
    }
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.5
  }
});

const Button = props => {
  const { xstyle, children, disabled = false, onClick = () => {} } = props;

  const ref = React.useRef(null);

  const [isPressed, onPressChange] = React.useState(false);
  usePress(ref, {
    disabled,
    onPress: onClick,
    onPressChange
  });

  const focusVisible = useFocusVisibility();
  const [focused, onFocusChange] = React.useState(false);
  useFocus(ref, { disabled, onFocusChange });
  const isFocusedAndVisible = focused && focusVisible;

  return (
    <button
      ref={ref}
      {...stylex.props(
        styles.button,
        !disabled && styles.interactive,
        isPressed && styles.active,
        disabled && styles.disabled,
        isFocusedAndVisible && themeStyles.focusOutline,
        xstyle
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
