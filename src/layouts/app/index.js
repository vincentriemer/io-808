// External Deps
import React from 'react';
import Radium from 'radium';
import WAAClock from 'waaclock';
import { GatewayProvider, GatewayDest } from 'react-gateway';

// Theme
import { grey } from 'theme/variables';

// Sub-layouts
import TopLeftSection from 'layouts/topLeftSection';
import TopRightSection from 'layouts/topRightSection';
import BottomSection from 'layouts/bottomSection';

// initialize web audio api context and clock
let audioCtx, clock;
try {
  // Fix up for prefixing
  window.AudioContext = window.AudioContext||window.webkitAudioContext;

  audioCtx = new AudioContext();
  clock = new WAAClock(audioCtx);
}
catch(e) {
  alert('Web Audio API is not supported in this browser');
}

// layout constants
const APP_WIDTH = 1400;
const APP_HEIGHT = 800;
const APP_PADDING = 40;

const TOP_BOTTOM_DIVIDER_HEIGHT = 3;
const TOP_HEIGHT = Math.ceil(APP_HEIGHT * 0.64) - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);
const BOTTOM_HEIGHT = APP_HEIGHT - TOP_HEIGHT - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);

const INSTRUMENT_SEPERATOR_WIDTH = 1;

const TOP_LEFT_WIDTH = Math.ceil(APP_WIDTH * 0.23) - INSTRUMENT_SEPERATOR_WIDTH;
const TOP_RIGHT_WIDTH = APP_WIDTH - TOP_LEFT_WIDTH ;

const TOP_HORIZONTAL_SEPERATOR_HEIGHT = TOP_HEIGHT - 10;

@Radium
class App extends React.Component {
  static propTypes = {
    storeState: React.PropTypes.object,
    handleTick: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { tickEvent: null, currentTempo: null, blinkIntervalID: null };

    this.handleTick = this.handleTick.bind(this);
    this.handleBlinkTick = this.handleBlinkTick.bind(this);
  }

  handleBlinkTick() {
    // disable blinking in development (clogs up redux devtools)
    if ('production' === process.env.NODE_ENV) {
      this.props.handleBlinkTick();
    }
  }

  handleTick({ deadline }) {
    clock.setTimeout(() => {
      this.props.handleTick();
    }, deadline - audioCtx.currentTime);
  }

  componentDidMount() {
    const blinkIntervalID = window.setInterval(this.handleBlinkTick, 750);
    this.setState({ blinkIntervalID });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.blinkIntervalID);
    this.setState({ blinkIntervalID: null });
  }

  componentWillReceiveProps({ storeState: nextStoreState }) {
    // start sequencer
    if (nextStoreState.playing && this.state.tickEvent === null) {
      clock.start();

      const currentTempo = nextStoreState.tempo + nextStoreState.fineTempo;
      const beatDuration = (60 / currentTempo) / 4;

      const tickEvent = clock.callbackAtTime(this.handleTick, audioCtx.currentTime)
        .repeat(beatDuration);

      return this.setState({ tickEvent, currentTempo });
    }

    // stop sequencer
    if (!nextStoreState.playing && this.state.tickEvent !== null) {
      this.state.tickEvent.clear();
      clock.stop();

      return this.setState({ tickEvent: null, currentTempo: null });
    }

    // change tempo
    if (nextStoreState.playing &&
      (nextStoreState.tempo !== this.props.storeState.tempo ||
      nextStoreState.fineTempo !== this.props.storeState.fineTempo)) {

      const newTempo = nextStoreState.tempo + nextStoreState.fineTempo;

      clock.timeStretch(audioCtx.currentTime, [this.state.tickEvent], this.state.currentTempo / newTempo);

      this.setState({ currentTempo: newTempo });
    }
  }


  shouldComponentUpdate() {
    return false;
  }

  render() {
    const styles = {
      wrapper: {
        position: 'relative',
        width: '100%', height: '100%',
        minWidth: APP_WIDTH + APP_PADDING, minHeight: APP_HEIGHT + APP_PADDING
      },

      appWrapper: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        margin: 'auto',
        width: APP_WIDTH, height: APP_HEIGHT,
        display: 'flex',
        flexDirection: 'column'
      },

      topBottomDivider: {
        width: APP_WIDTH, height: TOP_BOTTOM_DIVIDER_HEIGHT,
        backgroundColor: grey
      },

      topHorizontalDivider: {
        width: INSTRUMENT_SEPERATOR_WIDTH, height: TOP_HORIZONTAL_SEPERATOR_HEIGHT,
        backgroundColor: grey
      },

      topWrapper: {
        width: APP_WIDTH, height: TOP_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },

      bottomWrapper: {
        width: APP_WIDTH, height: BOTTOM_HEIGHT
      }
    };

    return (
      <GatewayProvider>
        <div style={styles.wrapper}>
          <GatewayDest name="knobOverlay" />
          <div style={styles.wrapper}>
            <div style={styles.appWrapper}>
              <div style={styles.topBottomDivider}></div>
              <div style={styles.topWrapper}>
                <TopLeftSection width={TOP_LEFT_WIDTH} height={TOP_HEIGHT} />
                <div style={styles.topHorizontalDivider}></div>
                <TopRightSection width={TOP_RIGHT_WIDTH} height={TOP_HEIGHT}
                                 seperatorWidth={INSTRUMENT_SEPERATOR_WIDTH} />
                <div style={styles.topHorizontalDivider}></div>
              </div>
              <div style={styles.topBottomDivider}></div>
              <div style={styles.bottomWrapper}>
                <BottomSection width={APP_WIDTH} height={BOTTOM_HEIGHT} topLeftWidth={TOP_LEFT_WIDTH} />
              </div>
            </div>
          </div>
        </div>
      </GatewayProvider>
    );
  }
}

export default App;