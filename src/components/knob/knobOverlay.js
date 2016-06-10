/**
 * Created by vincentriemer on 4/23/16.
 */
import React from 'react';
import CSSModules from 'react-css-modules';
import ReactART from 'react-art';
import Path from 'paths-js/path';
import styles from './knobOverlay.scss';

import {BASE_HEIGHT} from './constants';

const {Shape, Surface} = ReactART;

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
      <Surface
        styleName='knob-overlay'
        width={this.state.windowWidth}
        height={this.state.windowHeight}
      >
        <Shape {...strokeProps(knobPath)} />
        <Shape {...strokeProps(topPath)} />
        <Shape {...strokeProps(centerPath)} />
        <Shape {...strokeProps(bottomPath)} />
        <Shape {...strokeProps(bodyPath)} />
      </Surface>
    )
  }
}

export default CSSModules(KnobOverlay, styles);