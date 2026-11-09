import React from "react";
import * as stylex from "@stylexjs/stylex";

import { tokens } from "theme/variables.stylex";

import { BASE_HEIGHT } from "./constants";

const styles = stylex.create({
  overlay: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "ns-resize"
  },
  line: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    backgroundColor: tokens.white
  },
  knobPath: {
    opacity: 0.5,
    transformOrigin: "left center"
  },
  bodyPath: {
    transformOrigin: "center top"
  }
});

const dynamicStyles = stylex.create({
  knobPath: (x, y, degrees, distance) => ({
    transform: `translateX(${x}px) translateY(${y}px) translateZ(0) rotate(${degrees}deg) scaleX(${distance})`
  }),
  bodyPath: (x, y, scale) => ({
    transform: `translateX(${x}px) translateY(${y}px) translateZ(0) scaleY(${scale})`
  }),
  horizontalPath: (x, y) => ({
    transform: `translateX(${x}px) translateY(${y}px) translateZ(0) scaleX(12)`
  })
});

function cartesian2Polar([x1, y1], [x2, y2]) {
  const x = x2 - x1;
  const y = y2 - y1;
  const distance = Math.sqrt(x * x + y * y);
  const radians = Math.atan2(y, x);
  const degrees = radians * (180 / Math.PI);
  return { distance, degrees };
}

const KnobOverlay = props => {
  const { topPosition, scale, knobCenter, cursorPos } = props;

  const { distance, degrees } = cartesian2Polar(knobCenter, cursorPos);
  const verticalLineScale = BASE_HEIGHT * scale;

  return (
    <div {...stylex.props(styles.overlay)}>
      <div
        {...stylex.props(
          styles.line,
          styles.knobPath,
          dynamicStyles.knobPath(
            knobCenter[0],
            knobCenter[1],
            degrees,
            distance
          )
        )}
      />
      <div
        {...stylex.props(
          styles.line,
          styles.bodyPath,
          dynamicStyles.bodyPath(cursorPos[0], topPosition, verticalLineScale)
        )}
      />
      <div
        {...stylex.props(
          styles.line,
          dynamicStyles.horizontalPath(cursorPos[0], topPosition)
        )}
      />
      <div
        {...stylex.props(
          styles.line,
          dynamicStyles.horizontalPath(
            cursorPos[0],
            topPosition + verticalLineScale / 2
          )
        )}
      />
      <div
        {...stylex.props(
          styles.line,
          dynamicStyles.horizontalPath(
            cursorPos[0],
            topPosition + verticalLineScale
          )
        )}
      />
    </div>
  );
};

const KnobOverlayContext = React.createContext({
  setOverlayState: () => {},
  removeOverlay: () => {}
});

export const useKnobOverlayContext = () => {
  return React.useContext(KnobOverlayContext);
};

/**
 * KnobOverlayStateType = {
 *    [id: string]: {
 *      cursorPosition: [number, number],
 *      knobCetner: [number, number],
 *      scale: number,
 *      topPosition: number,
 *    }
 * }
 */
export const KnobOverlayManager = props => {
  const [overlayStateMap, updateOverlayStateMap] = React.useState({});

  const setOverlayState = React.useCallback((id, incomingState) => {
    updateOverlayStateMap(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...incomingState
      }
    }));
  }, []);

  const removeOverlay = React.useCallback(id => {
    updateOverlayStateMap(prev => {
      const updatedMap = { ...prev };
      delete updatedMap[id];
      return updatedMap;
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      setOverlayState,
      removeOverlay
    }),
    [removeOverlay, setOverlayState]
  );

  const overlayElements = React.useMemo(() => {
    const elements = [];
    for (const [id, state] of Object.entries(overlayStateMap)) {
      elements.push(
        <KnobOverlay
          key={id}
          topPosition={state.topPosition}
          scale={state.scale}
          knobCenter={state.knobCenter}
          cursorPos={state.cursorPosition}
        />
      );
    }
    return elements;
  }, [overlayStateMap]);

  return (
    <KnobOverlayContext.Provider value={contextValue}>
      {props.children}
      {overlayElements}
    </KnobOverlayContext.Provider>
  );
};

export default KnobOverlay;
