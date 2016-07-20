import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from './';

const customStyle = {
  button: {
    width: 100, height: 50,
    borderRadius: 4,
    backgroundColor: '#F55D02'
  }
};

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
    <Button onClick={handleClick} style={customStyle.button} />
  ));