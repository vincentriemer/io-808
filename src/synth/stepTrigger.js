// constants
import {
  ACCENT, BASS_DRUM, SNARE_DRUM, LOW_CONGA_LOW_TOM, MID_CONGA_MID_TOM, HI_CONGA_HI_TOM, CLAVES_RIMSHOT,
  MARACAS_HANDCLAP, COWBELL, CYMBAL, OPEN_HIHAT, CLSD_HIHAT
} from 'constants';

// drum modules
import bassDrum from 'synth/drumModules/bassDrum';
import snareDrum from 'synth/drumModules/snareDrum';
import tomConga from 'synth/drumModules/tomConga';
import maracasHandclap from 'synth/drumModules/maracasHandclap';
import clsdHat from 'synth/drumModules/clsdHat';
import openHat from 'synth/drumModules/openHat';
import cymbal from 'synth/drumModules/cymbal';
import cowbell from 'synth/drumModules/cowbell';
import claveRimshot from 'synth/drumModules/claveRimshot';

import VCA from 'synth/basics/vca';

// selectors
import patternSelector from 'selectors/pattern';
import variationSelector from 'selectors/variation';
import stepSelector from 'selectors/step';
import { getCurrentPart } from 'selectors/common';

// helpers
import { stepKey, equalPower } from 'helpers';

const drumModuleMapping = [
  [BASS_DRUM, bassDrum],
  [SNARE_DRUM, snareDrum],
  [LOW_CONGA_LOW_TOM, tomConga('low')],
  [MID_CONGA_MID_TOM, tomConga('mid')],
  [HI_CONGA_HI_TOM, tomConga('high')],
  [CLAVES_RIMSHOT, claveRimshot],
  [MARACAS_HANDCLAP, maracasHandclap],
  [COWBELL, cowbell],
  [CYMBAL, cymbal],
  [OPEN_HIHAT, openHat],
  [CLSD_HIHAT, clsdHat]
];


/*
 * Store a cache of the previous output VCAs so that we can silence them before the new drum is triggered
 *
 * NOTE: this is a bit of a hack and adds state mutation to the trigger step but it's self contained enough that I
 * don't think it should cause to many issues
 */
const previousTriggers = {
  [BASS_DRUM]: null,
  [SNARE_DRUM]: null,
  [LOW_CONGA_LOW_TOM]: null,
  [MID_CONGA_MID_TOM]: null,
  [HI_CONGA_HI_TOM]: null,
  [CLAVES_RIMSHOT]: null,
  [MARACAS_HANDCLAP]: null,
  [COWBELL]: null,
  [CYMBAL]: null,
  [OPEN_HIHAT]: null,
  [CLSD_HIHAT]: null
};

function getAccentGain(currentPattern, currentPart, currentVariation, currentStep, storeState) {
  const stepId = stepKey(currentPattern, ACCENT, currentPart, currentVariation, currentStep);
  const accentActive = storeState.steps[stepId];

  const accentLevel = storeState.instrumentState[ACCENT].level;
  const inactiveGainAmt = equalPower(100 - (accentLevel / 1.5));

  return accentActive ? 1.0 : inactiveGainAmt;
}

export default function (storeState, deadline, destination, clock, audioCtx) {
  // select relevant values from the global state
  const currentPattern = patternSelector(storeState);
  const currentPart = getCurrentPart(storeState);
  const currentVariation = variationSelector(storeState);
  const currentStep = stepSelector(storeState);

  // accent destination node
  const accentGain = getAccentGain(currentPattern, currentPart, currentVariation, currentStep, storeState);
  const accentVCA = new VCA(audioCtx);
  accentVCA.amplitude.value = accentGain;
  accentVCA.connect(destination);

  // accentVCA cleanup
  window.setTimeout(() => accentVCA.disconnect, (deadline - audioCtx.currentTime) + 2000);

  drumModuleMapping.forEach(([drumID, drumModuleTrigger]) => {
    const stepID = stepKey(currentPattern, drumID, currentPart, currentVariation, currentStep);
    const drumState = storeState.instrumentState[drumID];

    if (storeState.steps[stepID]) {
      // set gain on previous triggers to zero
      if (previousTriggers[drumID] != null) {
        const prevModule = previousTriggers[drumID];
        prevModule.amplitude.cancelScheduledValues(audioCtx.currentTime);
        prevModule.amplitude.setValueAtTime(prevModule.amplitude.value, audioCtx.currentTime);
        prevModule.amplitude.linearRampToValueAtTime(0, deadline);

        // remove reference from cache to let the garbage collector know to clean it up
        previousTriggers[drumID] = null;
      }

      // start a new trigger and store output gain node in cache
      previousTriggers[drumID] = drumModuleTrigger(audioCtx, accentVCA, deadline, drumState);
    }
  });
}