import React from 'react';
import { connect } from 'react-redux';
import WAAClock from 'waaclock';

import { onTick, onBlinkTick } from 'actionCreators';

// Web Audio Modules
import Limiter from 'synth/effects/limiter';
import VCA from 'synth/basics/vca';
import stepTrigger from 'synth/stepTrigger';

import {equalPower} from 'helpers';

// fix for safari weirdness, found in this thread: http://www.html5gamedevs.com/topic/18872-safari-9-desktop-totally-weird-audio-bug-audio-only-after-reloading-a-page-ignore-caching/
function fixSuspendedState (ac) {
  if (ac.state == 'suspended') {
    console.warn('AudioContext FIX: suspended. Trying to wake it.');
    if (ac.resume) {
      ac.resume();
    }
    return ac.state == 'running';
  } else {
    console.log('AudioContext FIX: not suspended, nothing to do.');
    return true;
  }
}

// initialize web audio api context and clock
let audioCtx, clock;
try {
  // Fix up for prefixing
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  audioCtx = new AudioContext();

  const fixIntervalID = window.setInterval(() => {
    if (fixSuspendedState(audioCtx)) {
      window.clearInterval(fixIntervalID);
    }
  }, 2000);

  clock = new WAAClock(audioCtx, {toleranceEarly: 0.09});
}
catch(e) {
  alert('Web Audio API is not supported in this browser');
}

// create limiter before output to protect from clipping
const outputLimiter = new Limiter(audioCtx);
outputLimiter.connect(audioCtx.destination);

// output gain for masterVolume control
const outputGain = new VCA(audioCtx);
outputGain.connect(outputLimiter);

class Sequencer extends React.Component {
  static propTypes = {
    storeState: React.PropTypes.object,
    handleTick: React.PropTypes.func,
    handleBlinkTick: React.PropTypes.func
  };

  constructor (props) {
    super(props);

    outputGain.amplitude.value = equalPower(props.storeState.masterVolume);

    this.state = {
      tickEvent: null,
      currentTempo: null,
      blinkIntervalID: null,
      masterVolume: props.storeState.masterVolume
    };

    this.handleTick = this.handleTick.bind(this);
    this.handleBlinkTick = this.handleBlinkTick.bind(this);
  }

  handleBlinkTick() {
    this.props.handleBlinkTick();
  }

  handleTick({ deadline }) {
    stepTrigger(this.props.storeState, deadline, outputGain, clock, audioCtx);

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

      const tickEvent = clock.callbackAtTime(this.handleTick, audioCtx.currentTime + 0.1)
        .repeat(beatDuration)
        .tolerance({late: 0.01});

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

    // change master volume
    if (this.state.masterVolume !== nextStoreState.masterVolume) {
      outputGain.amplitude.value = equalPower(nextStoreState.masterVolume);
      this.setState({ masterVolume: nextStoreState.masterVolume });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return false;
  }
}

// connect to redux store
const mapStateToProps = (state) => ({
  storeState: state
});

const mapDispatchToProps = (dispatch) => ({
  handleTick: () => dispatch(onTick()),
  handleBlinkTick: () => dispatch(onBlinkTick())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);


