import React from "react";
import { usePanEvents } from "react-gui/use-pan";
import useFocusVisible from "react-gui/use-focus-visible";

import { snap } from "helpers";
import { BASE_HEIGHT } from "./constants";
import { useKnobOverlayContext } from "./overlay";
import { convertPointFromNodeToPage } from "utils/pointConversion";
import VisuallyHidden from "components/visuallyHidden";

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

/**
type BaseProps = {
  size: number,
  onChange: Function,
  bufferSize?: number
};

type RangeProps = {
  ...BaseProps,
  type: "range",
  value: number,
  min: number,
  max: number,
  step: number,
}

type SelectProps = {
  ...BaseProps,
  type: "select",
  value: string,
  options: [
    { value: string, displayName: string }
  ]
}
 */

function getKnobNormalizedProps(props) {
  const { type, size, onChange, bufferSize = 360 } = props;
  if (type === "select") {
    const { value, options } = props;
    // get the index of the value
    let valueIndex = -1;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        valueIndex = i;
        break;
      }
    }
    return {
      size,
      onChange,
      bufferSize,
      value: valueIndex,
      min: 0,
      max: options.length - 1,
      step: 1
    };
  }
  const { value, min, max, step } = props;
  return {
    value,
    min,
    max,
    step,
    size,
    onChange,
    bufferSize
  };
}

const Knob = props => {
  const {
    value,
    min,
    max,
    step,
    size,
    onChange,
    bufferSize
  } = getKnobNormalizedProps(props);
  const knobType = props.type ?? "range";

  const knobId = useKnobId();
  const rootRef = React.useRef(null);

  const { setOverlayState, removeOverlay } = useKnobOverlayContext();
  const [topPosition, setTopPosition] = React.useState(null);
  const [knobCenter, setKnobCenter] = React.useState(null);

  const handleUnormalizedChange = React.useCallback(
    newValue => {
      switch (knobType) {
        case "select": {
          const optionValue = props.options[newValue].value;
          onChange(optionValue);
          break;
        }
        case "range": {
          onChange(newValue);
          break;
        }
      }
    },
    [knobType, onChange, props.options]
  );

  const onMoveShouldSetPan = React.useCallback(
    (evt, gestureState) => {
      const rootElem = rootRef.current;
      if (rootElem != null) {
        const { x: pageX, y: pageY } = gestureState;

        const knobRect = rootElem.getBoundingClientRect();
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
    [knobId, max, min, setOverlayState, value]
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
      handleUnormalizedChange(unnormalizedValue);
    },
    [
      handleUnormalizedChange,
      knobCenter,
      knobId,
      max,
      min,
      setOverlayState,
      step,
      topPosition
    ]
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

  const accessibilityElementRef = React.useRef(null);
  const { isFocusVisible } = useFocusVisible(accessibilityElementRef);
  const isValueNumber = typeof value === "number";
  const handleAccessibleValueUpdate = React.useCallback(
    evt => {
      switch (knobType) {
        case "select": {
          let processedValue = isValueNumber
            ? parseFloat(evt.target.value)
            : evt.target.value;
          onChange(processedValue);
          break;
        }
        case "range": {
          onChange(parseFloat(evt.target.value));
          break;
        }
      }
    },
    [isValueNumber, knobType, onChange]
  );

  const accessibilityElement = React.useMemo(() => {
    switch (props.type ?? "range") {
      case "select": {
        const { value: selectedValue, options } = props;
        const optionElements = options.map(({ value, displayName }) => {
          return (
            <option key={value} value={value}>
              {displayName}
            </option>
          );
        });
        return (
          <select
            ref={accessibilityElementRef}
            onChange={handleAccessibleValueUpdate}
            value={selectedValue}
          >
            {optionElements}
          </select>
        );
      }
      case "range": {
        const { value, min, max, step } = props;
        return (
          <input
            ref={accessibilityElementRef}
            type="range"
            onChange={handleAccessibleValueUpdate}
            min={min}
            max={max}
            value={value}
            step={step}
          />
        );
      }
      default: {
        throw new Error(`[Knob] unknown type specified: ${props.type}`);
      }
    }
  }, [handleAccessibleValueUpdate, props]);

  const rotationAmount =
    getNormalizedValue(value, min, max) * bufferSize - bufferSize / 2;

  const isActive = topPosition != null;

  const styles = {
    wrapper: {
      position: "relative",
      borderRadius: "50%",
      height: size,
      width: size,
      cursor: "grab",
      outline: isFocusVisible ? "solid red" : "none"
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
      <VisuallyHidden>{accessibilityElement}</VisuallyHidden>
      <div style={styles.knob}>{props.children}</div>
    </div>
  );
};

export default Knob;
