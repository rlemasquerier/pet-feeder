import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import { rootSaga } from './saga';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const enhancers = [applyMiddleware(sagaMiddleware)];

export const store = reduxCreateStore(rootReducer, composeEnhancers(...enhancers));
sagaMiddleware.run(rootSaga);
