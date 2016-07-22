// import global styles
require('globalStyles/reset.css');
require('globalStyles/main.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

import { onTick, onBlinkTick } from 'actionCreators';

import store from 'store';
import App from 'layouts/app';

const mapStateToProps = (state) => ({
  storeState: state
});

const mapDispatchToProps = (dispatch) => ({
  handleTick: () => dispatch(onTick()),
  handleBlinkTick: () => dispatch(onBlinkTick())
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store={store}><ConnectedApp /></Provider>,
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
