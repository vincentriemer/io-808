import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './sequencer';
import App from './layouts/app';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
