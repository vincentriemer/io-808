import React from "react";
import { usePanEvents } from "react-gui/use-pan";

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

  const rootRef = React.useRef(null);

  const [topPosition, setTopPosition] = React.useState(null);
  const [xPosition, setXPosition] = React.useState(null);
  const [scale, setScale] = React.useState(null);
  const [knobCenter, setKnobCenter] = React.useState(null);
  const [cursorPos, setCursorPos] = React.useState(null);

  const onMoveShouldSetPan = React.useCallback(
    (evt, gestureState) => {
      const rootElem = rootRef.current;
      if (rootElem != null) {
        const knobRect = rootElem.getBoundingClientRect();
        const knobCenter = [
          knobRect.left + knobRect.width / 2,
          knobRect.top + knobRect.height / 2
        ];

        const clientX = gestureState.x - window.scrollX;
        const clientY = gestureState.y - window.scrollY;

        const xPosition = clientX;
        const distance = Math.abs(xPosition - knobCenter[0]);
        const scale = distance / 200 + 1;
        const topPosition =
          clientY -
          (BASE_HEIGHT * scale -
            getNormalizedValue(value, min, max) * (BASE_HEIGHT * scale));

        const cursorPos = [clientX, clientY];

        setXPosition(xPosition);
        setTopPosition(topPosition);
        setScale(scale);
        setCursorPos(cursorPos);
        setKnobCenter(knobCenter);

        return true;
      }
      return false;
    },
    [max, min, value]
  );

  const onPanMove = React.useCallback(
    (evt, gestureState) => {
      if (knobCenter == null) return;

      const clientX = gestureState.x - window.scrollX;
      const clientY = gestureState.y - window.scrollY;
      const tempY = clientY;
      const xDistance = Math.abs(clientX - knobCenter[0]);
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
      let normalizedValue =
        (100 - (tempY - topPosition) * (100 / (BASE_HEIGHT * scale))) / 100;
      if (normalizedValue < 0) normalizedValue = 0;
      if (normalizedValue > 1) normalizedValue = 1;

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

  const onPanEnd = React.useCallback(() => {
    setTopPosition(null);
    setXPosition(null);
    setScale(null);
    setKnobCenter(null);
    setCursorPos(null);
  }, []);

  usePanEvents(rootRef, {
    onMoveShouldSetPan,
    onPanMove,
    onPanEnd
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
    <div ref={rootRef} style={styles.wrapper}>
      <div style={styles.knob}>{props.children}</div>
      {helper}
    </div>
  );
};

export default Knob;
