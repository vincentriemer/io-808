import React from "react";
import * as stylex from "@stylexjs/stylex";
import usePress from "react-gui/use-press";
import useHover from "react-gui/use-hover";
import { useId } from "@reach/auto-id";
import useFocusVisibility from "react-gui/use-focus-visibility";
import useFocusWithin from "react-gui/use-focus-within";
import useEvent from "react-gui/use-event";

import VisuallyHidden from "components/visuallyHidden";
import { themeStyles } from "theme/styles";

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";

const styles = stylex.create({
  outer: {
    position: "relative",
    cursor: "pointer"
  },
  vertical: {
    touchAction: "pan-x"
  },
  horizontal: {
    touchAction: "pan-y"
  },
  pointer: {
    cursor: "pointer"
  },
  grab: {
    cursor: "grab"
  },
  grabbing: {
    cursor: "grabbing"
  },
  inner: {
    position: "absolute",
    pointerEvents: "none"
  },
  innerHover: {
    position: "absolute",
    opacity: 0.5,
    pointerEvents: "none"
  },
  transition: {
    transition: "transform cubic-bezier(0.4, 0.0, 0.2, 1) .1s"
  }
});

const AccessibilityRadioInput = React.memo(props => {
  const { name, disabled, label, value, checked, onChange } = props;
  const id = useId();
  const inputRef = React.useRef(null);
  const handleChange = React.useCallback(
    e => {
      if (typeof onChange === "function") {
        onChange(e.currentTarget.value);
      }
    },
    [onChange]
  );
  const addChangeListener = useEvent("change");
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (input != null && !disabled) {
      return addChangeListener(input, handleChange);
    }
  }, [addChangeListener, disabled, handleChange]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        type="radio"
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        aria-checked={checked}
      />
    </>
  );
});

const Switch = props => {
  const {
    name,
    position,
    direction,
    values,
    onChange,
    disabled = false,
    outerXstyle,
    handleXstyle,
    positionXstyles
  } = props;

  const numPositions = Object.keys(values).length;
  const ref = React.useRef(null);

  const focusVisibile = useFocusVisibility();
  const [focusWithin, onFocusWithinChange] = React.useState(false);
  useFocusWithin(ref, { disabled, onFocusWithinChange });
  const isFocusWithin = focusVisibile && focusWithin;

  const [state, setState] = React.useState(() => ({
    hover: false,
    hoverPosition: position,
    hasMovedWhilePressed: false,
    initiallyPressedPosition: null
  }));

  const handlePress = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      hasMovedWhilePressed: false,
      initiallyPressedPosition: null
    }));
    onChange(state.hoverPosition);
  }, [onChange, state.hoverPosition]);

  const [pressed, onPressChange] = React.useState(false);
  usePress(ref, {
    disabled,
    onPress: handlePress,
    onPressChange
  });

  React.useEffect(() => {
    const {
      hasMovedWhilePressed,
      hoverPosition,
      initiallyPressedPosition
    } = state;
    if (pressed && initiallyPressedPosition === null) {
      setState(prev => ({
        ...prev,
        initiallyPressedPosition: hoverPosition,
        hasMovedWhilePressed: false
      }));
    } else if (
      pressed &&
      !hasMovedWhilePressed &&
      initiallyPressedPosition !== hoverPosition
    ) {
      setState(prev => ({ ...prev, hasMovedWhilePressed: true }));
    }
  }, [pressed, state]);
  React.useEffect(() => {
    const { hoverPosition, hasMovedWhilePressed } = state;
    if (pressed && hasMovedWhilePressed && position !== hoverPosition) {
      onChange(hoverPosition);
    }
  }, [handlePress, onChange, position, pressed, state]);

  const handleHoverStart = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      hasMovedWhilePressed: false,
      hover: true
    }));
  }, []);

  const handleHoverMove = React.useCallback(
    ({ clientX, clientY }) => {
      setState(prevState => {
        if (!prevState.hover) {
          return prevState;
        }
        const outer = ref.current;
        if (outer == null) return prevState;

        const rect = outer.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(outer);
        const padding = parseFloat(
          direction === HORIZONTAL
            ? computedStyle.paddingLeft
            : computedStyle.paddingTop
        );
        const start = direction === HORIZONTAL ? rect.left : rect.top;
        const totalLength =
          (direction === HORIZONTAL ? rect.width : rect.height) - padding * 2;

        let currentRelativeCoord =
          (direction === HORIZONTAL ? clientX : clientY) - (start + padding);

        if (currentRelativeCoord < 0) currentRelativeCoord = 0;
        if (currentRelativeCoord > totalLength - padding)
          currentRelativeCoord = totalLength - padding;

        const hoverPosition = ~~(
          (currentRelativeCoord / totalLength) *
          numPositions
        );

        return { ...prevState, hoverPosition };
      });
    },
    [direction, numPositions]
  );

  const handleHoverEnd = React.useCallback(() => {
    setState(() => ({
      hover: false,
      hasMovedWhilePressed: false,
      initiallyPressedPosition: null,
      hoverPosition: position
    }));
  }, [position]);

  useHover(ref, {
    disabled,
    onHoverStart: handleHoverStart,
    onHoverUpdate: handleHoverMove,
    onHoverEnd: handleHoverEnd
  });

  let orientationStyle;
  switch (direction) {
    case VERTICAL:
      orientationStyle = styles.vertical;
      break;
    case HORIZONTAL:
      orientationStyle = styles.horizontal;
      break;
    default:
      throw new Error(`Invalid Direction: ${direction}`);
  }

  const cursor = (() => {
    const {
      hover: hovered,
      hoverPosition,
      hasMovedWhilePressed,
      initiallyPressedPosition
    } = state;
    if (hovered) {
      if (pressed) {
        if (hoverPosition === position) {
          if (
            hasMovedWhilePressed ||
            hoverPosition === initiallyPressedPosition
          ) {
            return "grabbing";
          }
          return "pointer";
        } else {
          if (hasMovedWhilePressed) {
            return "grab";
          }
          return "pointer";
        }
      } else {
        if (hoverPosition === position) {
          return "grab";
        }
        return "pointer";
      }
    }
    return undefined;
  })();

  const cursorStyle = (() => {
    switch (cursor) {
      case "pointer":
        return styles.pointer;
      case "grab":
        return styles.grab;
      case "grabbing":
        return styles.grabbing;
      default:
        return null;
    }
  })();

  const handleAccessibilityChange = React.useCallback(
    value => {
      const newPosition = Object.values(values).indexOf(value);
      setState(prev => ({
        ...prev,
        hasMovedWhilePressed: false,
        initiallyPressedPosition: null,
        hoverPosition: newPosition
      }));
      onChange(newPosition);
    },
    [onChange, values]
  );

  const accessibilityElements = React.useMemo(() => {
    return Object.keys(values).map((label, idx) => {
      const value = values[label];
      return (
        <AccessibilityRadioInput
          key={label}
          name={name}
          label={label}
          value={value}
          disabled={disabled}
          onChange={handleAccessibilityChange}
          checked={idx === position}
        />
      );
    });
  }, [disabled, handleAccessibilityChange, name, position, values]);

  return (
    <div
      ref={ref}
      {...stylex.props(
        styles.outer,
        outerXstyle,
        orientationStyle,
        cursorStyle,
        isFocusWithin && themeStyles.focusOutline
      )}
    >
      <VisuallyHidden role="radiogroup">{accessibilityElements}</VisuallyHidden>
      <div
        {...stylex.props(
          styles.inner,
          handleXstyle,
          positionXstyles[position],
          styles.transition
        )}
      />
      <div
        {...stylex.props(
          styles.innerHover,
          handleXstyle,
          positionXstyles[state.hoverPosition],
          pressed && styles.transition
        )}
      />
    </div>
  );
};

export default Switch;
