import React from "react";

import { BASE_HEIGHT } from "./constants";

function cartesian2Polar([x1, y1], [x2, y2]) {
  const x = x2 - x1;
  const y = y2 - y1;
  const distance = Math.sqrt(x * x + y * y);
  const radians = Math.atan2(y, x);
  const degrees = radians * (180 / Math.PI);
  return { distance, degrees };
}

const KnobOverlay = props => {
  const {
    topPosition,
    scale,
    knobCenter,
    cursorPos,
    overlayColor = "#FFF"
  } = props;

  const baseLineStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    backgroundColor: overlayColor
  };

  const { distance, degrees } = cartesian2Polar(knobCenter, cursorPos);
  const verticalLineScale = BASE_HEIGHT * scale;

  const styles = {
    overlay: {
      position: "absolute",
      zIndex: 100,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      cursor: "ns-resize"
    },

    knobPath: {
      ...baseLineStyle,
      opacity: 0.5,
      transformOrigin: "left center",
      transform:
        `translateX(${knobCenter[0]}px) translateY(${
          knobCenter[1]
        }px) translateZ(0) ` +
        `rotate(${degrees}deg) ` +
        `scaleX(${distance})`
    },

    bodyPath: {
      ...baseLineStyle,
      transformOrigin: "center top",
      transform:
        `translateX(${
          cursorPos[0]
        }px) translateY(${topPosition}px) translateZ(0) ` +
        `scaleY(${verticalLineScale})`
    },

    topPath: {
      ...baseLineStyle,
      transform:
        `translateX(${
          cursorPos[0]
        }px) translateY(${topPosition}px) translateZ(0) ` + `scaleX(12)`
    },

    centerPath: {
      ...baseLineStyle,
      transform:
        `translateX(${cursorPos[0]}px) ` +
        `translateY(${topPosition + verticalLineScale / 2}px) ` +
        `translateZ(0) scaleX(12)`
    },

    bottomPath: {
      ...baseLineStyle,
      transform:
        `translateX(${cursorPos[0]}px) ` +
        `translateY(${topPosition + verticalLineScale}px) ` +
        `translateZ(0) scaleX(12)`
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.knobPath} />
      <div style={styles.bodyPath} />
      <div style={styles.topPath} />
      <div style={styles.centerPath} />
      <div style={styles.bottomPath} />
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
