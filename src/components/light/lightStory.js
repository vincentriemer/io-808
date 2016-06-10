/**
 * Created by vincentriemer on 5/22/16.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Light from './light';

storiesOf('Light', module)
  .add('Unactive', () => (
    <Light active={false} />
)).add('Active', () => (
    <Light active={true} />
));