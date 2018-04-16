import { delay } from 'redux-saga';
import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import setApiUrl from '../utils/setUrl';

import * as types from '../actions/actionTypes';

let url = setApiUrl(process.env.NODE_ENV);

/**
 * Aysnc operation to sign up
 */

/**
 * worker saga performs async calls to the api
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* signUpAsync(action) {
  try {
    const response = yield call(axios.post, `${url}/users`, {
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password
    });
    yield put({ type: types.SUCCESS_FLASH_MESSAGE, response: response.data });
    yield delay(500);
    yield put(push('/centers'));
  } catch (error) {
    yield put({
      type: types.FAILURE_FLASH_MESSAGE,
      error: error.response.data.message
    });
    yield delay(5000);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

/**
 *  watcher saga listens for sign_up action type call then calls signUpAsync
 * @returns {function} to the reducer
 * @export
 */
export function* watchSignUpAsync() {
  yield takeEvery(types.SIGN_UP, signUpAsync);
}

/**
 * Aysnc operation to sign in
 */

/**
 * Login async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* loginAsync(action) {
  try {
    const response = yield call(axios.post, `${url}/users/login`, {
      email: action.payload.email,
      password: action.payload.password
    });
    let token = response.data.token;
    yield put({ type: types.SIGN_IN_SUCCESS, token });
    console.log('dispatching sign in success', action);
    localStorage.setItem('token', token);
    yield put(push('/centers'));
  } catch (error) {
    console.log('login async error', error);
    console.log('login async error ------>', error.response);
    let message;
    if (error.response) {
      switch (error.response.status) {
        case 500:
          message = 'Internal Server Error';
          break;
        case 401:
          message = 'Invalid credentials';
          break;
        default:
          message = 'Something went wrong';
      }
    }
    yield put({ type: types.SIGN_IN_FAILURE, error: message });
    localStorage.removeItem('token');
  }
}

/**
 * listens for sign_up action type call then calls signInAsync
 * @returns {function} .
 * @export
 */
export function* watchSignInAsync() {
  yield takeLatest(types.SIGN_IN, loginAsync);
  // yield takeLatest(types.SIGN_IN, signInAsync);
}

/**
 *  log out saga
 */

export function* logout() {
  try {
    localStorage.removeItem('token');
    yield put({
      type: types.LOG_OUT_SUCCESS,
      isAuthenticated: false,
      token: null
    });
    yield put(push('/'));
  } catch (error) {
    console.log(error);
  }
}

export function* watchLogout() {
  yield takeLatest(types.LOG_OUT, logout);
}
