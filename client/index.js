import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store, { history } from './store';

/**
 * allows/provides for communication between the components and the store
 */
const router = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(router, document.getElementById('app'));