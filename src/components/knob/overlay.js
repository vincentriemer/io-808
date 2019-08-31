import React from "react";
import ReactDOM from "react-dom";

import { BASE_HEIGHT } from "./constants";

function cartesian2Polar([x1, y1], [x2, y2]) {
  const x = x2 - x1;
  const y = y2 - y1;
  const distance = Math.sqrt(x * x + y * y);
  const radians = Math.atan2(y, x);
  const degrees = radians * (180 / Math.PI);
  return { distance, degrees };
}

const KnobOverlayPortal = props => {
  const [targetElement] = React.useState(() => document.createElement("div"));

  React.useEffect(() => {
    document.body.appendChild(targetElement);
    return () => {
      document.body.removeChild(targetElement);
    };
  }, [targetElement]);

  return ReactDOM.createPortal(props.children, targetElement);
};

function getWindowSize() {
  return {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  };
}

const KnobOverlay = props => {
  const { topPosition, scale, knobCenter, cursorPos, overlayColor } = props;

  const [windowSize, setWindowSize] = React.useState(getWindowSize);
  const { windowWidth, windowHeight } = windowSize;

  const handleResize = React.useCallback(() => {
    setWindowSize(getWindowSize);
  }, []);
  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, [handleResize]);

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
      position: "fixed",
      zIndex: 100,
      top: 0,
      left: 0,
      width: windowWidth,
      height: windowHeight,
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
    <KnobOverlayPortal>
      <div style={styles.overlay}>
        <div style={styles.knobPath} />
        <div style={styles.bodyPath} />
        <div style={styles.topPath} />
        <div style={styles.centerPath} />
        <div style={styles.bottomPath} />
      </div>
    </KnobOverlayPortal>
  );
};

export default KnobOverlay;
