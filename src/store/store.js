import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import logger from 'redux-logger';
import reducers from './reducers';
import {interceptRequest, onResponseError} from '../services/api';
import {logout} from './actions/authActions';

// Configure redux-persist
const persistConfig = {
  key: 'kluto',
  version: 3,
  storage: AsyncStorage,
  // blacklist: ['modals'],
  whitelist: ['auth', 'product'],
  // whitelist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers),
);

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
    immutableCheck: false,
    serializableCheck: false,
    // middleware: [...getDefaultMiddleware({immutableCheck: false})]
  }); // .concat(logger);

// Create states store
const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

// Make persistor
export const persistor = persistStore(store);

// Intercept rest api request with authorization credential
interceptRequest(req => {
  const {accessToken, business, outlet} = store.getState().auth;
  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

onResponseError(err => {
  if (
    [401, 403].includes(err.status) ||
    err?.message?.includes('Invalid business')
  ) {
    store.dispatch(logout());
  }
});

export default store;
