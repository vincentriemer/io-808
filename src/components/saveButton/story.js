import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SaveButton from './';

import StoreState from 'initialState';

storiesOf('SaveButton', module)
  .add('default', () => (
    <SaveButton storeState={StoreState} />
  ));
