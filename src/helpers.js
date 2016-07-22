export function stepKey(track, instrument, part, variation, step) {
  return `TRACK_${track}-INSTRUMENT_${instrument}-${part}-${variation}-STEP_${step}`;
}

export function trackLengthKey(track, part) {
  return `TRACK_${track}-${part}-LENGTH`;
}

export function snap(number, increment, offset) {
  return Math.round(number / increment ) * increment + offset;
}