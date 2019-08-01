import { compose, createStore } from "redux";
import { setAutoFreeze } from "immer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "reducers";
import initialState from "initialState";

import { PERSISTANCE_FILTER } from "store-constants";

setAutoFreeze(false);

const middleware = [];

if ("production" !== process.env.NODE_ENV && window.devToolsExtension) {
  middleware.push(window.devToolsExtension());
}

const persistConfig = {
  key: "io-808",
  storage: storage,
  whitelist: PERSISTANCE_FILTER,
  throttle: 100
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancer = compose(...middleware);

export const store = createStore(persistedReducer, initialState, enhancer);
export const persistor = persistStore(store);
