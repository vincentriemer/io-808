import { compose, createStore } from 'redux';
import Immutable from 'seamless-immutable';

import persistState, { mergePersistedState, transformState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import debounce from 'redux-localstorage-debounce';
import filter from 'redux-localstorage-filter';

import rootReducer from 'reducers';
import initialState from 'initialState';

const middleware = [];

if ('production' !== process.env.NODE_ENV && window.devToolsExtension) {
  middleware.push(window.devToolsExtension());
}

const reducer = compose(
  mergePersistedState(
    (initialState, persistedState) => initialState.merge(persistedState)
  )
)(rootReducer);

const storage = compose(
  transformState(null, Immutable),
  filter([
    'instrumentState',
    'rhythmLengths',
    'steps',
    'masterVolume',
    'tempo',
    'fineTempo'
  ]),
  debounce(100)
)(adapter(window.localStorage));

middleware.push(persistState(storage, 'io-808'));

const enhancer = compose(...middleware);

export default createStore(reducer, initialState, enhancer);
