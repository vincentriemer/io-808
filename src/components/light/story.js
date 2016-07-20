import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Light from './';

storiesOf('Light', module)
  .add('Unactive', () => (
    <Light active={false} />
)).add('Active', () => (
    <Light active={true} />
));