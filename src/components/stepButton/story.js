import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import StepButton from './';

storiesOf('StepButton', module)
  .add('not active', () => (
    <StepButton color="#EEE24C" onClick={() => action('clicked')()} active={false} />
  ))
  .add('active', () => (
    <StepButton color="#EEE24C" onClick={() => action('clicked')()} active={true} />
  ));