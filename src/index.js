// import global styles
require('globalStyles/reset.css');
require('globalStyles/main.css');

// Add a warning to Firefox users due to a buggy AudioParam implementation
import browser from 'bowser';
if (browser.gecko) {
  window.alert('WARNING: Firefox currently has a buggy Web Audio API implementation which causes loud pops and clicks, continue at your own risk');
}

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store';
import AppLayout from 'layouts/app';
import Sequencer from 'sequencer';

render(
  <Provider store={store}>
    <div style={{width: '100%', height: '100%'}}>
      <Sequencer />
      <AppLayout />
    </div>
  </Provider>,
  document.getElementById('root'),
  () => {
    // Custom performance marker
    if ('performance' in window && 'mark' in window.performance)
      performance.mark('first_layout_render');

    // Hide loading spinner and reveal the app layout
    var loaderElement = document.getElementById('loader');
    loaderElement.className = "loader-wrapper done";
    document.getElementById('root').className = "";
  }
);
