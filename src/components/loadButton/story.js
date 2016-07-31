import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LoadButton from './';

function onLoadedState(loadedState) {
  console.log(loadedState);
}

storiesOf('LoadButton', module)
  .add('default', () => (
    <LoadButton playing={false} onLoadedState={onLoadedState} size={50} />
  ));