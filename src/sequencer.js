import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { onTick, onBlinkTick } from "actionCreators";

// Web Audio Modules
import Limiter from "synth/effects/limiter";
import VCA from "synth/basics/vca";
import stepTrigger from "synth/stepTrigger";
import { clearStepWindow, recordStepWindow } from "stepClock";
import AudioCtxContext from "audioCtxContext";

import { equalPower } from "helpers";

// Steps in one beat for pre-scale 1–4. 3 is the normal quarter-note setting.
const STEPS_PER_BEAT = [3, 6, 4, 8];

function stepInterval(tempo, fineTempo, preScalePosition) {
  const bpm = tempo + fineTempo;
  const steps = STEPS_PER_BEAT[preScalePosition];
  const divisions = steps == null ? 4 : steps;
  return 60 / bpm / divisions;
}

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
  const stepIntervalRef = React.useRef(null);

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

      const sounding = storeState.currentStep < 0 ? 0 : storeState.currentStep;
      recordStepWindow(
        sounding,
        deadline,
        stepInterval(
          storeState.tempo,
          storeState.fineTempo,
          storeState.preScalePosition
        )
      );

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

        const interval = stepInterval(
          storeState.tempo,
          storeState.fineTempo,
          storeState.preScalePosition
        );

        const newTickEvent = audio.clock
          .callbackAtTime(handleTick, audio.ctx.currentTime + 0.1)
          .repeat(interval)
          .tolerance({ late: 0.01 });

        tickEventRef.current = newTickEvent;
        stepIntervalRef.current = interval;
      }
    },
    [
      getAudioContext,
      getClock,
      handleTick,
      storeState.fineTempo,
      storeState.playing,
      storeState.preScalePosition,
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
        clearStepWindow();

        tickEventRef.current = null;
        stepIntervalRef.current = null;
      }
    },
    [getAudioContext, getClock, storeState.playing]
  );

  // change tempo
  React.useEffect(
    () => {
      const previousInterval = stepIntervalRef.current;
      const tickEvent = tickEventRef.current;
      const prevStoreState = previousStoreStateRef.current;
      const audio = getAudio(getClock, getAudioContext);

      const clockHasChanged =
        storeState.tempo !== prevStoreState.tempo ||
        storeState.fineTempo !== prevStoreState.fineTempo ||
        storeState.preScalePosition !== prevStoreState.preScalePosition;

      if (storeState.playing && clockHasChanged && previousInterval != null) {
        const nextInterval = stepInterval(
          storeState.tempo,
          storeState.fineTempo,
          storeState.preScalePosition
        );

        audio != null &&
          tickEvent != null &&
          audio.clock.timeStretch(
            audio.ctx.currentTime,
            [tickEvent],
            nextInterval / previousInterval
          );

        stepIntervalRef.current = nextInterval;
      }
    },
    [
      getAudioContext,
      getClock,
      storeState.fineTempo,
      storeState.playing,
      storeState.preScalePosition,
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
