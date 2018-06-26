import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

import { snap } from "helpers";
import { BASE_HEIGHT } from "./constants";
import KnobOverlay from "./overlay";

function emptyKnobState() {
  return {
    topPosition: null,
    xPosition: null,
    scale: null,
    knobCenter: null,
    cursorPos: null,
  };
}

function getNormalizedValue(value, min, max) {
  return (value - min) / (max - min);
}

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyKnobState();

    this.startDrag = this.startDrag.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }

  handleDrag(e) {
    e.preventDefault();
    if (this.state.knobCenter == null) return;

    const xPosition = e.clientX;
    const tempY = e.clientY;
    const xDistance = Math.abs(xPosition - this.state.knobCenter[0]);
    const scale = xDistance / 200 + 1;

    let topPosition = this.state.topPosition;

    // handle guide Y repositioning
    if (tempY < topPosition) {
      topPosition = tempY;
    }
    if (tempY > topPosition + BASE_HEIGHT * scale) {
      topPosition = tempY - BASE_HEIGHT * scale;
    }

    const cursorPos = [e.clientX, e.clientY];
    const normalizedValue =
      (100 - (tempY - topPosition) * (100 / (BASE_HEIGHT * scale))) / 100;

    const { min, max, step } = this.props;
    const unnormalizedValue = snap(normalizedValue * (max - min), step, min);

    this.setState({ topPosition, scale, cursorPos });
    if (unnormalizedValue !== this.props.value) {
      this.props.onChange(unnormalizedValue);
    }
  }

  endDrag() {
    document.removeEventListener("mousemove", this.handleDrag, false);
    document.removeEventListener("mouseup", this.endDrag, false);
    this.setState(emptyKnobState());
  }

  startDrag(e) {
    e.preventDefault();
    const { value, min, max } = this.props;

    const knobRect = e.currentTarget.getBoundingClientRect();
    const knobCenter = [
      knobRect.left + knobRect.width / 2,
      knobRect.top + knobRect.height / 2,
    ];

    const xPosition = e.clientX;
    const distance = Math.abs(xPosition - knobCenter[0]);
    const scale = distance / 200 + 1;
    const topPosition =
      e.clientY -
      (BASE_HEIGHT * scale -
        getNormalizedValue(value, min, max) * (BASE_HEIGHT * scale));

    const cursorPos = [e.clientX, e.clientY];

    document.addEventListener("mousemove", this.handleDrag, false);
    document.addEventListener("mouseup", this.endDrag, false);

    this.setState({ xPosition, topPosition, scale, knobCenter, cursorPos });
  }

  render() {
    const {
      value,
      min,
      max,
      overlayColor = "#fff",
      size,
      bufferSize = 360,
    } = this.props;

    const rotationAmount =
      getNormalizedValue(value, min, max) * bufferSize - bufferSize / 2;

    const styles = {
      wrapper: {
        position: "relative",
        borderRadius: "50%",
        height: size,
        width: size,
        ":hover": {
          cursor: "pointer",
        },
      },
      knob: {
        position: "relative",
        borderRadius: "50%",
        height: "100%",
        width: "100%",
        transform: "rotate(" + rotationAmount + "deg) translateZ(0px)",
      },
    };

    let helper = null;
    if (this.state.xPosition != null) {
      helper = <KnobOverlay {...this.state} overlayColor={overlayColor} />;
    }

    return (
      <div style={styles.wrapper}>
        <div style={styles.knob} onMouseDown={this.startDrag}>
          {this.props.children}
        </div>
        {helper}
      </div>
    );
  }
}

Knob.propTypes = {
  size: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  bufferSize: PropTypes.number,
  overlayColor: PropTypes.string,
  innerColor: PropTypes.string,
};

export default Radium(Knob);
