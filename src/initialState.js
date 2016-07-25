import Immutable from 'seamless-immutable';

import {
  ACCENT, BASS_DRUM, SNARE_DRUM, LOW_CONGA_LOW_TOM, MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM, CLAVES_RIMSHOT, MARACAS_HANDCLAP, COWBELL, CYMBAL,
  OPEN_HIHAT, CLSD_HIHAT,

  FIRST_PART, SECOND_PART, A_VARIATION, B_VARIATION
} from 'constants';

import { stepKey, trackLengthKey } from 'helpers';

const PARTS = [FIRST_PART, SECOND_PART];
const VARIATIONS = [A_VARIATION, B_VARIATION];

const initialStepsState = (() => {
  const steps = {};
  for (let track = 0; track < 16; track++) {
    for (let instrument = 0; instrument < 12; instrument++) {
      PARTS.forEach(part => {
        VARIATIONS.forEach(variation => {
          for (let step = 0; step < 16; step++) {
            const key = stepKey(track, instrument, part, variation, step);
            steps[key] = false;
          }
        })
      });
    }
  }
  return steps;
})();

const initialRhythmLengthState = (() => {
  const lengths = {};
  for (let track = 0; track < 16; track++) {
    lengths[trackLengthKey(track, FIRST_PART)] = 16;
    lengths[trackLengthKey(track, SECOND_PART)] = 0;
  }
  return lengths;
})();

const initialInstrumentState = {
  [ACCENT]: {
    level: 100
  },
  [BASS_DRUM]: {
    level: 100,
    tone: 50,
    decay: 50
  },
  [SNARE_DRUM]: {
    level: 100,
    tone: 50,
    snappy: 50
  },
  [LOW_CONGA_LOW_TOM]: {
    level: 100,
    tuning: 50,
    switch: 1
  },
  [MID_CONGA_MID_TOM]: {
    level: 100,
    tuning: 50,
    switch: 1
  },
  [HI_CONGA_HI_TOM]: {
    level: 100,
    tuning: 50,
    switch: 1
  },
  [CLAVES_RIMSHOT]: {
    level: 100,
    switch: 1
  },
  [MARACAS_HANDCLAP]: {
    level: 100,
    switch: 1
  },
  [COWBELL]: {
    level: 100
  },
  [CYMBAL]: {
    level: 100,
    tone: 50,
    decay: 50
  },
  [OPEN_HIHAT]: {
    level: 100,
    decay: 50
  },
  [CLSD_HIHAT]: {
    level: 100
  }
};

export default Immutable({
  instrumentState: initialInstrumentState,

  rhythmLengths: initialRhythmLengthState,

  steps: initialStepsState,
  selectedRhythm: 0,
  currentPart: FIRST_PART,
  currentVariation: A_VARIATION,
  playing: false,

  selectedMode: 0,
  selectedInstrumentTrack: 0,

  masterVolume: 100,

  autoFillInPosition: 0,

  basicVariationPosition: 0,
  introFillVariationPosition: 0,

  tempo: 135,
  fineTempo: 0,

  currentStep: 0,

  blinkState: true,

  clearPressed: false,
  clearDragging: false
})