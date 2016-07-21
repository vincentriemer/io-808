export function stepKey(track, instrument, part, variation, step) {
  return `TRACK_${track}-INSTRUMENT_${instrument}-${part}-${variation}-STEP_${step}`;
}

export function snap(number, increment, offset) {
  return Math.round(number / increment ) * increment + offset;
}