import React from 'react';
import Radium from 'radium';
import { Gateway } from 'react-gateway';

import Path from 'paths-js/path';

import {BASE_HEIGHT} from './constants';

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

    const {windowWidth, windowHeight} = this.state;

    const styles = {
      overlay: {
        position: 'fixed',
        zIndex: 100,
        top: 0, left: 0,
        cursor: 'move'
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
        <div style={styles.overlay}>
          <svg width={windowWidth} height={windowHeight}>
            <path {...strokeProps(knobPath)} />
            <path {...strokeProps(topPath)} />
            <path {...strokeProps(centerPath)} />
            <path {...strokeProps(bottomPath)} />
            <path {...strokeProps(bodyPath)} />
          </svg>
        </div>
      </Gateway>
    )
  }
}

/*
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
 */

export default KnobOverlay;