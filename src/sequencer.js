import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { onTick, onBlinkTick } from "actionCreators";

// Web Audio Modules
import Limiter from "synth/effects/limiter";
import VCA from "synth/basics/vca";
import stepTrigger from "synth/stepTrigger";

import { equalPower } from "helpers";

class Sequencer extends React.Component {
  static propTypes = {
    storeState: PropTypes.object,
    handleTick: PropTypes.func,
    handleBlinkTick: PropTypes.func,
    getAudioContext: PropTypes.func,
    getClock: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      tickEvent: null,
      currentTempo: null,
      blinkIntervalID: null,
      outputChain: null,
      masterVolume: props.storeState.masterVolume,
    };

    this.handleTick = this.handleTick.bind(this);
    this.handleBlinkTick = this.handleBlinkTick.bind(this);
  }

  handleBlinkTick() {
    this.props.handleBlinkTick();
  }

  handleTick({ deadline }) {
    const clock = this.props.getClock();
    const audioCtx = this.props.getAudioContext();

    let outputChain = this.state.outputChain;
    if (this.state.outputChain == null) {
      // create limiter before output to protect from clipping
      const outputLimiter = new Limiter(audioCtx);
      outputLimiter.connect(audioCtx.destination);

      // output gain for masterVolume control
      const outputGain = new VCA(audioCtx);
      outputGain.connect(outputLimiter);

      outputGain.amplitude.value = equalPower(
        this.props.storeState.masterVolume
      );

      outputChain = { outputLimiter, outputGain };
      this.setState({ outputChain });
    }

    stepTrigger(
      this.props.storeState,
      deadline,
      outputChain.outputGain,
      clock,
      audioCtx
    );

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

  componentDidUpdate({ storeState: prevStoreState }) {
    const nextStoreState = this.props.storeState;

    const clock = this.props.getClock();
    const audioCtx = this.props.getAudioContext();

    const hasAudio = clock != null && audioCtx != null;

    // start sequencer
    if (hasAudio && nextStoreState.playing && this.state.tickEvent === null) {
      clock.start();

      const currentTempo = nextStoreState.tempo + nextStoreState.fineTempo;
      const beatDuration = 60 / currentTempo / 4;

      const tickEvent = clock
        .callbackAtTime(this.handleTick, audioCtx.currentTime + 0.1)
        .repeat(beatDuration)
        .tolerance({ late: 0.01 });

      return this.setState({ tickEvent, currentTempo });
    }

    // stop sequencer
    if (hasAudio && !nextStoreState.playing && this.state.tickEvent !== null) {
      this.state.tickEvent.clear();
      clock.stop();

      return this.setState({ tickEvent: null, currentTempo: null });
    }

    // change tempo
    if (
      nextStoreState.playing &&
      (nextStoreState.tempo !== prevStoreState.tempo ||
        nextStoreState.fineTempo !== prevStoreState.fineTempo)
    ) {
      const newTempo = nextStoreState.tempo + nextStoreState.fineTempo;

      hasAudio &&
        clock.timeStretch(
          audioCtx.currentTime,
          [this.state.tickEvent],
          this.state.currentTempo / newTempo
        );

      this.setState({ currentTempo: newTempo });
    }

    // change master volume
    if (this.state.masterVolume !== nextStoreState.masterVolume) {
      const outputChain = this.state.outputChain;

      if (outputChain != null) {
        outputChain.outputGain.amplitude.value = equalPower(
          nextStoreState.masterVolume
        );
      }

      this.setState({ masterVolume: nextStoreState.masterVolume });
    }
  }

  render() {
    return false;
  }
}

// connect to redux store
const mapStateToProps = state => ({
  storeState: state,
});

const mapDispatchToProps = dispatch => ({
  handleTick: () => dispatch(onTick()),
  handleBlinkTick: () => dispatch(onBlinkTick()),
});

const ConnectedSequencer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequencer);

import AudioCtxContext from "audioCtxContext";

export default () => (
  <AudioCtxContext.Consumer>
    {childProps => <ConnectedSequencer {...childProps} />}
  </AudioCtxContext.Consumer>
);
