import React from "react";
import usePress from "react-gui/use-press";
import useHover from "react-gui/use-hover";
import { useId } from "@reach/auto-id";
import useFocusVisibility from "react-gui/use-focus-visibility";
import useFocusWithin from "react-gui/use-focus-within";
import useEvent from "react-gui/use-event";

import VisuallyHidden from "components/visuallyHidden";
import { focusOutline } from "theme/mixins";

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";

const styles = {
  outer: {
    position: "relative"
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
};

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
    thickness,
    length,
    direction,
    values,
    innerThickness,
    onChange,
    disabled = false,
    padding = 0,
    innerStyle = {},
    outerStyle = {}
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
    initiallyPressedPosition: null,
    xPosition: null,
    yPosition: null
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

  const handleHoverStart = React.useCallback(evt => {
    const {
      left: xPosition,
      top: yPosition
    } = evt.target.getBoundingClientRect();
    setState(prev => ({
      ...prev,
      hasMovedWhilePressed: false,
      hover: true,
      xPosition,
      yPosition
    }));
  }, []);

  const handleHoverMove = React.useCallback(
    ({ clientX, clientY }) => {
      setState(prevState => {
        if (!prevState.hover) {
          return prevState;
        }
        const { xPosition, yPosition } = prevState;
        const totalLength = length - padding * 2;

        let currentRelativeCoord = null;
        switch (direction) {
          case HORIZONTAL:
            currentRelativeCoord = clientX - (xPosition + padding);
            break;
          case VERTICAL:
            currentRelativeCoord = clientY - (yPosition + padding);
            break;
        }

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
    [direction, length, numPositions, padding]
  );

  const handleHoverEnd = React.useCallback(() => {
    setState(() => ({
      hover: false,
      xPosition: null,
      yPosition: null,
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

  const positionIncrement =
    (length - padding * 2 - innerThickness) / (numPositions - 1);
  const positionChange = positionIncrement * position;
  const hoverPositionChange = positionIncrement * state.hoverPosition;

  let width,
    height,
    innerWidth,
    innerHeight,
    transform,
    hoverTransform,
    touchAction = null;
  switch (direction) {
    case VERTICAL:
      width = thickness;
      height = length;

      innerWidth = width - padding * 2;
      innerHeight = innerThickness;

      transform = `translateY(${positionChange}px)`;
      hoverTransform = `translateY(${hoverPositionChange}px)`;

      touchAction = "pan-x";
      break;
    case HORIZONTAL:
      width = length;
      height = thickness;

      innerWidth = innerThickness;
      innerHeight = height - padding * 2;

      transform = `translateX(${positionChange}px)`;
      hoverTransform = `translateX(${hoverPositionChange}px)`;

      touchAction = "pan-y";
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
      style={{
        ...styles.outer,
        ...outerStyle,
        width,
        height,
        padding,
        touchAction,
        cursor,
        ...(isFocusWithin && focusOutline)
      }}
    >
      <VisuallyHidden role="radiogroup">{accessibilityElements}</VisuallyHidden>
      <div
        style={{
          ...styles.inner,
          ...innerStyle,
          width: innerWidth,
          height: innerHeight,
          transform,
          ...styles.transition
        }}
      />
      <div
        style={{
          ...styles.innerHover,
          ...innerStyle,
          width: innerWidth,
          height: innerHeight,
          transform: hoverTransform,
          ...(pressed && styles.transition)
        }}
      />
    </div>
  );
};

export default Switch;
