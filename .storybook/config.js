import { configure } from '@kadira/storybook';
import './index.css';

function loadStories() {
  require('../src/components/drumKnob/story');
  require('../src/components/switch/story');
  require('../src/components/light/story');
  require('../src/components/button/story');
  require('../src/components/tempoKnob/story');
  require('../src/components/fineTempoKnob/story');
  require('../src/components/autoFillInKnob/story');
  require('../src/components/modeKnob/story');
  require('../src/components/instrumentSelectorKnob/story');
  require('../src/components/masterVolumeKnob/story');
  require('../src/components/IFVariationSwtich/story');
  require('../src/components/basicVariationSwitch/story');
  require('../src/components/drumSwitch/story');
  require('../src/components/preScaleSwitch/story');
  require('../src/layouts/instrumentColumn/story');
  require('../src/components/appTitle/story');
  require('../src/components/arrowLabel/story');
  require('../src/components/partLights/story');
  require('../src/components/stepButton/story');
}

configure(loadStories, module);