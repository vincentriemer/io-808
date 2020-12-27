import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { onTick, onBlinkTick } from "actionCreators";

// Web Audio Modules
import Limiter from "synth/effects/limiter";
import VCA from "synth/basics/vca";
import stepTrigger from "synth/stepTrigger";
import AudioCtxContext from "audioCtxContext";

import { equalPower } from "helpers";

function getAudio(getClock, getAudioCtx) {
  const clock = getClock();
  const audioCtx = getAudioCtx();
  if (clock != null && audioCtx != null) {
    return { clock, ctx: audioCtx };
  }
  return null;
}

function useSequencerActions() {
  const dispatch = useDispatch();
  return React.useMemo(
    () => ({
      handleTick: () => {
        dispatch(onTick());
      },
      handleBlinkTick: () => dispatch(onBlinkTick())
    }),
    [dispatch]
  );
}

const Sequencer = React.memo(() => {
  // Inputs ===========
  const storeState = useSelector(state => state);
  const {
    handleTick: tickAction,
    handleBlinkTick: blinkTickAction
  } = useSequencerActions();
  const { getAudioContext, getClock } = React.useContext(AudioCtxContext);

  // Instance Refs ===========
  const previousStoreStateRef = React.useRef(storeState);
  const tickEventRef = React.useRef(null);
  const masterVolumeRef = React.useRef(storeState.masterVolume);
  const outputChainRef = React.useRef(null);
  const currentTempoRef = React.useRef(null);

  // Latest Store Tracking
  const latestStoreRef = React.useRef(storeState);
  React.useEffect(
    () => {
      latestStoreRef.current = storeState;
    },
    [storeState]
  );

  // Methods ===========
  const handleBlinkTick = React.useCallback(
    () => {
      blinkTickAction();
    },
    [blinkTickAction]
  );
  const handleTick = React.useCallback(
    ({ deadline }) => {
      const storeState = latestStoreRef.current;
      const outputChain = outputChainRef.current;
      const masterVolume = masterVolumeRef.current;

      const clock = getClock();
      const audioCtx = getAudioContext();

      let currentOutputChain = outputChain != null ? { ...outputChain } : null;
      // initialize the output chain
      if (currentOutputChain == null) {
        // create limiter before output to protect from clipping
        const outputLimiter = new Limiter(audioCtx);
        outputLimiter.connect(audioCtx.destination);

        // output gain for masterVolume control
        const outputGain = new VCA(audioCtx);
        outputGain.amplitude.value = equalPower(masterVolume);
        outputGain.connect(outputLimiter);

        currentOutputChain = { outputLimiter, outputGain };

        outputChainRef.current = currentOutputChain;
      }

      stepTrigger(
        storeState,
        deadline,
        currentOutputChain.outputGain,
        clock,
        audioCtx
      );

      clock.setTimeout(() => {
        tickAction();
      }, deadline - audioCtx.currentTime);
    },
    [getAudioContext, getClock, tickAction]
  );

  // Effects ===========

  // blink tick interval
  React.useEffect(
    () => {
      const blickIntervalID = window.setInterval(handleBlinkTick, 750);
      return () => {
        window.clearInterval(blickIntervalID);
      };
    },
    [handleBlinkTick]
  );

  // start sequencer
  React.useEffect(
    () => {
      const audio = getAudio(getClock, getAudioContext);
      const tickEvent = tickEventRef.current;
      if (audio != null && storeState.playing && tickEvent === null) {
        audio.clock.start();

        const currentTempo = storeState.tempo + storeState.fineTempo;
        const beatDuration = 60 / currentTempo / 4;

        const newTickEvent = audio.clock
          .callbackAtTime(handleTick, audio.ctx.currentTime + 0.1)
          .repeat(beatDuration)
          .tolerance({ late: 0.01 });

        tickEventRef.current = newTickEvent;
        currentTempoRef.current = currentTempo;
      }
    },
    [
      getAudioContext,
      getClock,
      handleTick,
      storeState.fineTempo,
      storeState.playing,
      storeState.tempo
    ]
  );

  // stop sequencer
  React.useEffect(
    () => {
      const audio = getAudio(getClock, getAudioContext);
      const tickEvent = tickEventRef.current;
      if (audio != null && !storeState.playing && tickEvent !== null) {
        tickEvent.clear();
        audio.clock.stop();

        tickEventRef.current = null;
        currentTempoRef.current = null;
      }
    },
    [getAudioContext, getClock, storeState.playing]
  );

  // change tempo
  React.useEffect(
    () => {
      const currentTempo = currentTempoRef.current;
      const tickEvent = tickEventRef.current;
      const prevStoreState = previousStoreStateRef.current;
      const audio = getAudio(getClock, getAudioContext);

      const tempoHasChanged =
        storeState.tempo !== prevStoreState.tempo ||
        storeState.fineTempo !== prevStoreState.fineTempo;

      if (storeState.playing && tempoHasChanged) {
        const newTempo = storeState.tempo + storeState.fineTempo;

        audio != null &&
          audio.clock.timeStretch(
            audio.ctx.currentTime,
            [tickEvent],
            currentTempo / newTempo
          );

        currentTempoRef.current = newTempo;
      }
    },
    [
      getAudioContext,
      getClock,
      storeState.fineTempo,
      storeState.playing,
      storeState.tempo
    ]
  );

  // change master volume
  React.useEffect(
    () => {
      const outputChain = outputChainRef.current;
      const prevStoreState = previousStoreStateRef.current;
      if (storeState.masterVolume !== prevStoreState.masterVolume) {
        if (outputChain != null) {
          outputChain.outputGain.amplitude.value = equalPower(
            storeState.masterVolume
          );
        }
        masterVolumeRef.current = storeState.masterVolume;
      }
    },
    [storeState.masterVolume]
  );

  // update previous store ref
  React.useEffect(
    () => {
      previousStoreStateRef.current = storeState;
    },
    [storeState]
  );

  // no-op render
  return false;
});

export default Sequencer;
