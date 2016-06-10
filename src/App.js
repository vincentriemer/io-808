import React, { Component } from 'react';
import { connect } from 'react-redux';
import WAAClock from 'waaclock';
import { togglePlayback, tick } from './actionCreators';

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayToggle: () => {
      dispatch(togglePlayback())
    },
    onTick: () => {
      dispatch(tick())
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.clock = null;
  }

  handlePlayToggle() {
    this.props.onPlayToggle();
    if (!this.props.playing) {
      let clock = new WAAClock(audioCtx);
      clock.start();
      clock.setTimeout(() => this.props.onTick(), 0).repeat(0.5); // 120 bpm
      this.setState({ ...this.state, clock });
    } else {
      this.state.clock.stop();
      this.setState({ ...this.state, clock: null });
    }
  }

  render() {
    const buttonString = this.props.playing ? "stop" : "play";
    return (
      <div>
        <div>currentTick: {this.props.currentTick}</div>
        <button onClick={() => this.handlePlayToggle()}>{buttonString}</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
