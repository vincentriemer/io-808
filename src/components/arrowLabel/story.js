import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ArrowLabel from './';

import {grey, darkGrey} from 'theme/variables';

const width  = 110;
const height = 30;

storiesOf('ArrowLabel', module)
  .add('pointing right', () => (
    <ArrowLabel label='STEP NO' width={width} height={height} textColor={darkGrey} backgroundColor={grey} direction='right' />
  ))
  .add('pointing left', () => (
    <ArrowLabel label='STEP NO' width={width} height={height} textColor={darkGrey} backgroundColor={grey} direction='left' />
  ));