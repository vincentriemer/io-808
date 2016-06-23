import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import InstrumentColumn from '.';
import InstrumentLabel from '../../components/instrumentLabel';
import DrumSwitch from '../../components/drumSwitch/drumSwitch';
import DrumKnob from '../../components/drumKnob/drumKnob';

const handleEvent = (name) => ((value) => action(name)(value));

storiesOf('InstrumentColumnLayout', module)
  .add('with no alternative instrument mode', () => (
    <InstrumentColumn labels={[
      <InstrumentLabel label={['*B', 'ASS ', '*D', 'RUM']} />
    ]}>
      <DrumKnob label='LEVEL' level />
      <DrumKnob label='TONE' />
      <DrumKnob label='DECAY' />
    </InstrumentColumn>
  ))
  .add('with an alternative instrument mode', () => (
    <InstrumentColumn labels={[
      <InstrumentLabel label={['*M', 'ID ', '*C', 'ONGA']} />,
      <DrumSwitch />,
      <InstrumentLabel label={['*M', 'ID ', '*T', 'OM']} />
    ]}>
      <DrumKnob label='LEVEL' level />
      <DrumKnob label='TUNING' />
    </InstrumentColumn>
  ));