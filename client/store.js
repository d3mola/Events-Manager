import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers/index';
import rootSaga from './Sagas/index';
import history from './history';

const sagaMiddleware = createSagaMiddleware();
const routingMiddleware = routerMiddleware(history);

const middleware = applyMiddleware(
  sagaMiddleware,
  routingMiddleware
);

// create store
const store = createStore(
  rootReducer,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;
