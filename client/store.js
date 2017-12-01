import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers/index';
import rootSaga from './Saga/sagax';


const sagaMiddleware = createSagaMiddleware();

// create the store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export const history = syncHistoryWithStore(createBrowserHistory(), store);

sagaMiddleware.run(rootSaga);

console.log(store.getState());// get current state of the store

export default store;
