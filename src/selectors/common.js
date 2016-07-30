import {A_VARIATION, B_VARIATION} from 'constants';

export const getIntroFillVariationPosition = (state) =>
  [A_VARIATION, B_VARIATION][state.introFillVariationPosition];

export const getPlaying = (state) => state.playing;

export const getCurrentPattern = (state) => state.currentPattern;

export const getSelectedMode = (state) => state.selectedMode;

export const getCurrentVariation = (state) => state.currentVariation;

export const getCurrentStep = (state) => state.currentStep;

export const getBasicVaritionPosition = (state) => state.basicVariationPosition;

export const getClearPressed = (state) => state.clearPressed;

export const getSteps = (state) => state.steps;

export const getSelectedInstrumentTrack = (state) => state.selectedInstrumentTrack;

export const getPatternLengths = (state) => state.patternLengths;

export const getFillScheduled = (state) => state.fillScheduled;

export const getSelectedPlayPattern = (state) => state.selectedPlayPattern;

export const getSelectedPlayFillPattern = (state) => state.selectedPlayFillPattern;

export const getCurrentPart = (state) => state.currentPart;
