import React from "react";
import { useDrag } from "react-events/drag";

import { snap } from "helpers";
import { BASE_HEIGHT } from "./constants";
import KnobOverlay from "./overlay";

function getNormalizedValue(value, min, max) {
  return (value - min) / (max - min);
}

const Knob = props => {
  const {
    value,
    min,
    max,
    step,
    size,
    onChange,
    overlayColor = "#fff",
    bufferSize = 360
  } = props;

  const [topPosition, setTopPosition] = React.useState(null);
  const [xPosition, setXPosition] = React.useState(null);
  const [scale, setScale] = React.useState(null);
  const [knobCenter, setKnobCenter] = React.useState(null);
  const [cursorPos, setCursorPos] = React.useState(null);

  const handleDrag = React.useCallback(
    evt => {
      if (knobCenter == null) return;

      const clientX = knobCenter[0] + evt.diffX;
      const clientY = knobCenter[1] + evt.diffY;
      const tempY = knobCenter[1] + evt.diffY;
      const xDistance = evt.diffX;
      const scale = xDistance / 200 + 1;

      // handle guide Y repositioning
      let topPos = topPosition;
      if (tempY < topPos) {
        topPos = tempY;
      }
      if (tempY > topPos + BASE_HEIGHT * scale) {
        topPos = tempY - BASE_HEIGHT * scale;
      }

      const cursorPos = [clientX, clientY];
      const normalizedValue =
        (100 - (tempY - topPosition) * (100 / (BASE_HEIGHT * scale))) / 100;
      const unnormalizedValue = snap(normalizedValue * (max - min), step, min);

      setTopPosition(topPos);
      setScale(scale);
      setCursorPos(cursorPos);
      setXPosition(clientX);

      if (unnormalizedValue !== value) {
        onChange(unnormalizedValue);
      }
    },
    [knobCenter, max, min, onChange, step, topPosition, value]
  );
  const handleDragEnd = React.useCallback(() => {
    setTopPosition(null);
    setXPosition(null);
    setScale(null);
    setKnobCenter(null);
    setCursorPos(null);
  }, []);
  const handleDragStart = React.useCallback(evt => {
    const knobRect = evt.target.getBoundingClientRect();
    const knobCenter = [
      knobRect.left + knobRect.width / 2,
      knobRect.top + knobRect.height / 2
    ];
    setKnobCenter(knobCenter);
  }, []);
  const dragListener = useDrag({
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragMove: handleDrag,
    shouldClaimOwnership: () => true
  });

  const rotationAmount =
    getNormalizedValue(value, min, max) * bufferSize - bufferSize / 2;

  const styles = {
    wrapper: {
      position: "relative",
      borderRadius: "50%",
      height: size,
      width: size,
      cursor: "grab"
    },
    knob: {
      position: "relative",
      borderRadius: "50%",
      height: "100%",
      width: "100%",
      transform: "rotate(" + rotationAmount + "deg) translateZ(0px)"
    }
  };

  let helper = null;
  if (xPosition != null) {
    helper = (
      <KnobOverlay
        topPosition={topPosition}
        xPosition={xPosition}
        scale={scale}
        knobCenter={knobCenter}
        cursorPos={cursorPos}
        overlayColor={overlayColor}
      />
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.knob} listeners={dragListener}>
        {props.children}
      </div>
      {helper}
    </div>
  );
};

export default Knob;
