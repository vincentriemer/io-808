import { createStore } from 'redux';

import reducer from 'reducers';
import initialState from 'initialState';

const devToolExtension = (() => {
  if ('production' !== process.env.NODE_ENV) {
    return window.devToolsExtension ? window.devToolsExtension() : undefined;
  } else {
    return undefined;
  }
})();

export default createStore(reducer, initialState, devToolExtension);
