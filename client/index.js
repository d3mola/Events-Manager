import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

import App from './components/App';
import store from './store';
import './static/scss/home.scss';
/**
 * allows/provides for communication between the components and the store
 */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
