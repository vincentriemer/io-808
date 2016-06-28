import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import AppTitle from './';

storiesOf('AppTitle', module)
  .add('default', () => (
    <AppTitle />
  ));