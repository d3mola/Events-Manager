import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import toastr from 'toastr';

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
    const token  = response.data.token;
    const user  = response.data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', user.isAdmin);
    localStorage.setItem('user', user.username);
    yield put({ type: types.SIGN_UP_SUCCESS, token, user });
    toastr.success('Registration successful!');
    yield put(push('/centers'));
  } catch (error) {
    yield put({ type: types.SIGN_UP_FAILURE,error: error.response.data.message});
    toastr.error(error.response.data.message);
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
    let user = response.data.user;
    yield put({ type: types.SIGN_IN_SUCCESS, token, user });
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', user.isAdmin);
    localStorage.setItem('user', user.username);// change user to isAdmin
    toastr.success(`Welcome ${user.username}!`);
    yield put(push('/centers'));
  } catch (error) {
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
    toastr.error(error.response.data.message);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

/**
 * listens for sign_up action type call then calls signInAsync
 * @returns {function} .
 * @export
 */
export function* watchSignInAsync() {
  yield takeLatest(types.SIGN_IN, loginAsync);
}

/**
 *  log out saga
 */

export function* logout() {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    yield put({
      type: types.LOG_OUT_SUCCESS,
      isAuthenticated: false,
      token: null,
      user: null,
      isAdmin: false
    });
    yield put(push('/'));
  } catch (error) {
    console.log(error);
  }
}

export function* watchLogout() {
  yield takeLatest(types.LOG_OUT, logout);
}
