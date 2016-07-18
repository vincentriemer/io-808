// import global styles
require('./globalStyles/reset.css');
require('./globalStyles/main.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

import store from './store';
import App from './layouts/app';

const mapStateToProps = (state) => ({
  storeState: state
});

const ConnectedApp = connect(mapStateToProps)(App);

render(
  <Provider store={store}><ConnectedApp /></Provider>,
  document.getElementById('root'),
  () => {
    if ('performance' in window && 'mark' in window.performance)
      performance.mark('first_layout_render');
    var loaderElement = document.getElementById('loader');
    loaderElement.className = "loader-wrapper done";
    document.getElementById('root').className = "";
  }
);
