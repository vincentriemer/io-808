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
    var loaderElement = document.getElementById('loader');
    loaderElement.className = "loader done";
    document.getElementById('root').className = "";
    window.setTimeout(() => {
      loaderElement.className = "";
    }, 1000);
  }
);
