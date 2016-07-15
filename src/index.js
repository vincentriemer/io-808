// import global styles
require('./globalStyles/reset.css');
require('./globalStyles/main.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './layouts/app';

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
  () => {
    if (performance in Window) Window.performance.mark('first_layout_render');
    var loaderElement = document.getElementById('loader');
    loaderElement.className = "loader-wrapper done";
    document.getElementById('root').className = "";
  }
);
