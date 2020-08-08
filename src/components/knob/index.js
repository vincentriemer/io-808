import React from "react";
import { usePanEvents } from "react-gui/use-pan";
import useLayout from "react-gui/use-layout";

import { snap } from "helpers";
import { BASE_HEIGHT } from "./constants";
import { useKnobOverlayContext } from "./overlay";
import { convertPointFromNodeToPage } from "utils/pointConversion";

function getNormalizedValue(value, min, max) {
  return (value - min) / (max - min);
}

function getKnobCenter(node, rect) {
  const knobPos = convertPointFromNodeToPage(node, { x: 0, y: 0 });
  const knobCenter = [knobPos.x + rect.width / 2, knobPos.y + rect.height / 2];
  return knobCenter;
}

let knobIdCounter = 0;
function useKnobId() {
  const [id] = React.useState(() => {
    return knobIdCounter++;
  });
  return id;
}

const Knob = props => {
  const { value, min, max, step, size, onChange, bufferSize = 360 } = props;

  const knobId = useKnobId();
  const rootRef = React.useRef(null);

  const { setOverlayState, removeOverlay } = useKnobOverlayContext();
  const [topPosition, setTopPosition] = React.useState(null);
  const [knobCenter, setKnobCenter] = React.useState(null);

  const knobRect = useLayout(rootRef);

  const onMoveShouldSetPan = React.useCallback(
    (evt, gestureState) => {
      const rootElem = rootRef.current;
      if (rootElem != null) {
        const { x: pageX, y: pageY } = gestureState;

        const measuredKnobCenter = getKnobCenter(rootElem, knobRect);

        const distance = Math.abs(pageX - measuredKnobCenter[0]);
        const scale = distance / 200 + 1;
        const topPos =
          pageY -
          (BASE_HEIGHT * scale -
            getNormalizedValue(value, min, max) * (BASE_HEIGHT * scale));
        const cursorPosition = [pageX, pageY];

        setTopPosition(topPos);
        setKnobCenter(measuredKnobCenter);
        setOverlayState(knobId, {
          cursorPosition,
          knobCenter: measuredKnobCenter,
          scale,
          topPosition: topPos
        });

        return true;
      }
      return false;
    },
    [knobId, knobRect, max, min, setOverlayState, value]
  );

  const onPanMove = React.useCallback(
    (evt, gestureState) => {
      // const rootElem = rootRef.current;
      if (knobCenter == null) return;

      const { x: pageX, y: pageY } = gestureState;
      // const knobCenter = getKnobCenter(rootElem, knobRect);

      const tempY = pageY;
      const xDistance = Math.abs(pageX - knobCenter[0]);
      const scale = xDistance / 200 + 1;

      // handle guide Y repositioning
      let topPos = topPosition;
      if (tempY < topPos) {
        topPos = tempY;
      }
      if (tempY > topPos + BASE_HEIGHT * scale) {
        topPos = tempY - BASE_HEIGHT * scale;
      }

      const cursorPosition = [pageX, pageY];
      let normalizedValue =
        (100 - (tempY - topPosition) * (100 / (BASE_HEIGHT * scale))) / 100;
      if (normalizedValue < 0) normalizedValue = 0;
      if (normalizedValue > 1) normalizedValue = 1;

      const unnormalizedValue = snap(normalizedValue * (max - min), step, min);

      setTopPosition(topPos);
      setOverlayState(knobId, {
        cursorPosition,
        scale,
        topPosition: topPos
      });
      onChange(unnormalizedValue);
    },
    [knobCenter, knobId, max, min, onChange, setOverlayState, step, topPosition]
  );

  const onPanEnd = React.useCallback(() => {
    setTopPosition(null);
    removeOverlay(knobId);
  }, [knobId, removeOverlay]);

  const onPanTerminationRequest = React.useCallback(() => {
    return false;
  }, []);

  usePanEvents(rootRef, {
    onMoveShouldSetPan,
    onPanMove,
    onPanEnd,
    onPanTerminationRequest,
    touchAction: "none"
  });

  const rotationAmount =
    getNormalizedValue(value, min, max) * bufferSize - bufferSize / 2;

  const isActive = topPosition != null;

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
      transform: "rotate(" + rotationAmount + "deg)",
      willChange: isActive ? "transform" : "auto"
    }
  };

  return (
    <div ref={rootRef} style={styles.wrapper}>
      <div style={styles.knob}>{props.children}</div>
    </div>
  );
};

export default Knob;
