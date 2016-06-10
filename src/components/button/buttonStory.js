/**
 * Created by vincentriemer on 5/22/16.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from './button';

import storyStyles from './buttonStory.scss';

const handleClick = () => {
  action('clicked')('boosh');
};

storiesOf('Button', module)
  .add('base button', () => (
    <Button onClick={handleClick} />
  ))
  .add('with child elements', () => (
    <Button onClick={handleClick}>
      <p>Testing...</p>
    </Button>
  ))
  .add('with a custom style', () => (
    <Button onClick={handleClick} styles={storyStyles} />
  ));