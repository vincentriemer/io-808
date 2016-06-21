import { configure } from '@kadira/storybook';
import './index.css';

function loadStories() {
  require('../src/components/drumKnob/drumKnobStory');
  require('../src/components/switch/switchStory');
  require('../src/components/light/lightStory');
  require('../src/components/button/buttonStory');
  require('../src/components/tempoKnob/tempoKnobStory');
  require('../src/components/fineTempoKnob/fineTempoKnobStory');
  require('../src/components/autoFillInKnob/autoFillInKnobStory');
  require('../src/components/modeKnob/modeKnobStory');
  require('../src/components/instrumentSelectorKnob/instrumentSelectorKnobStory');
  require('../src/components/masterVolumeKnob/masterVolumeKnobStory');
  require('../src/components/IFVariationSwtich/IFVariationSwitchStory');
  require('../src/components/basicVariationSwitch/basicVariationSwitchStory');
  require('../src/components/drumSwitch/drumSwitchStory');
  require('../src/components/preScaleSwitch/preScaleSwitchStory');
}

configure(loadStories, module);