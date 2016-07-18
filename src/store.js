import { createStore } from 'redux';

import reducer from './reducers';
import initialState from './initialState';

const store = createStore(reducer, initialState,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default store;
