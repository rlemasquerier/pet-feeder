import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to AsyncStorage

import { rootReducer } from './reducer';
import { rootSaga } from './saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const enhancers = [applyMiddleware(sagaMiddleware)];

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = reduxCreateStore(persistedReducer, composeEnhancers(...enhancers));
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
