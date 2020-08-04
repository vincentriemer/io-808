import React from "react";
import usePress from "react-gui/use-press";
import { useHoverEvents } from "react-gui/use-hover";

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

const SoundSwitch = props => {
  const {
    position,
    thickness,
    length,
    direction,
    numPositions,
    innerThickness,
    onChange,
    padding = 0,
    innerStyle = {},
    outerStyle = {}
  } = props;

  const ref = React.useRef(null);

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

  const { isPressed: pressed } = usePress(ref, {
    onPress: handlePress
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

  useHoverEvents(ref, {
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
        cursor
      }}
    >
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

export default SoundSwitch;
