import React from 'react';
import { storiesOf } from '@kadira/storybook';
import PartLights from './';

storiesOf('PartLights', module)
  .add('default', () => (
    <PartLights width={200} height={100} firstActive={false} secondActive={true} />
  ));