import { currentAudioContext } from "audioCtxContext";

let start = 0;
let interval = 0;
let step = 0;

export function recordStepWindow(stepIndex, deadline, stepInterval) {
  if (!isFinite(stepIndex) || stepIndex < 0) return;
  step = Math.floor(stepIndex);
  start = deadline;
  interval = stepInterval;
}

export function clearStepWindow() {
  start = 0;
  interval = 0;
  step = 0;
}

// The step that just sounded, or the next one when the tap is closer to it.
export function quantizedStep(fallback, length) {
  const span = length > 0 ? length : 16;
  let index = step;
  const audioCtx = currentAudioContext();
  if (audioCtx && interval > 0 && start > 0) {
    const into = audioCtx.currentTime - start;
    if (into >= interval * 0.5) index += 1;
  } else if (isFinite(fallback) && fallback >= 0) {
    index = Math.floor(fallback);
  }
  if (!isFinite(index) || index < 0) index = 0;
  index = Math.floor(index) % span;
  if (index > 15) index = 15;
  return index;
}
