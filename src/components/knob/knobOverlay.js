import React from 'react';
import Radium from 'radium';
import { Gateway } from 'react-gateway';

import ReactART from 'react-art';
import Path from 'paths-js/path';

import {BASE_HEIGHT} from './constants';

const {Shape, Surface} = ReactART;

@Radium
class KnobOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  render() {
    const {
      topPosition,
      xPosition,
      scale,
      knobCenter,
      cursorPos,
      overlayColor
    } = this.props;

    const styles = {
      overlay: {
        position: 'fixed',
        zIndex: 100,
        top: 0, left: 0,
        cursor: '-webkit-grabbing'
        // TODO: Fix fallback with: cursor: ['-webkit-grabbing', 'grabbing']
      }
    };

    const knobPath = Path()
      .moveto(...knobCenter)
      .lineto(...cursorPos)
      .closepath().print();

    const topPath = Path()
      .moveto(xPosition - 6, topPosition)
      .lineto(xPosition + 6, topPosition)
      .closepath().print();

    const bottomPath = Path()
      .moveto(xPosition - 6, topPosition + (BASE_HEIGHT * scale))
      .lineto(xPosition + 6, topPosition + (BASE_HEIGHT * scale))
      .closepath().print();

    const centerPath = Path()
      .moveto(xPosition - 6, topPosition + ((BASE_HEIGHT * scale) / 2))
      .lineto(xPosition + 6, topPosition + ((BASE_HEIGHT * scale) / 2))
      .closepath().print();

    const bodyPath = Path()
      .moveto(xPosition, topPosition)
      .lineto(xPosition, topPosition + (BASE_HEIGHT * scale))
      .closepath().print();

    const strokeProps = (d) => ({
      d, stroke: overlayColor, strokeWidth: 1
    });

    return (
      <Gateway into="knobOverlay">
        <Surface
          style={styles.overlay}
          width={this.state.windowWidth}
          height={this.state.windowHeight}
        >
          <Shape {...strokeProps(knobPath)} />
          <Shape {...strokeProps(topPath)} />
          <Shape {...strokeProps(centerPath)} />
          <Shape {...strokeProps(bottomPath)} />
          <Shape {...strokeProps(bodyPath)} />
        </Surface>
      </Gateway>
    )
  }
}

export default KnobOverlay;