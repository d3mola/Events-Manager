import { delay } from 'redux-saga';
import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
// import dotenv from 'dotenv';

import * as types from '../actions/actionTypes';

// Load .env
// dotenv.config();

const api = '/api/v1';
const url =
  process.env.NODE_ENV === ('development' || 'test')
    ? `http://localhost:8000${api}`
    : `https://party-palace.herokuapp.com${api}`;
// const url = `http://localhost:8000${api}`;
const token = localStorage.getItem('token');
// axios.defaults.headers.common['x-access-token'] = token;

/**
 * Aysnc operation to get all centers
 */

/**
 * Get centers async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* fetchcentersAsync() {
  try {
    const response = yield call(axios.get, `${url}/centers`, {
      headers: { 'x-access-token': token }
    });
    yield put({
      type: types.GET_CENTERS_SUCCESS,
      centers: response.data.centers
    });
  } catch (error) {
    console.log(
      'GET_CENTERS_FAILURE ---> ',
      error.response.status,
      error.response.data.message
    );
    yield put({
      type: types.GET_CENTERS_FAILURE,
      error: error.response.data.message
    });
    let errorStatus = error.response.status;
    switch (errorStatus) {
      case 401:
        yield put(push('/login'));
        break;
      case 500:
        yield put(push('/centers'));
        break;
      default:
        return errorStatus;
    }
  }
}

/**
 * listens for get centers action type call then call signUpAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchFetchCentersAsync() {
  yield takeLatest(types.GET_CENTERS, fetchcentersAsync);
  // yield takeEvery(types.GET_CENTERS, fetchcentersAsync);
}

/**
 * Aysnc operation to add a center
 */

/**
 * worker saga performs async operation to add a center
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* addCenterAsync(action) {
  try {
    console.log('Trying to post a center to the api..  ', action);
    // console.log(`${url}/api/v1/centers`)
    const response = yield call(axios.post, `${url}/centers`, {
      //   headers: { "x-access-token": token }
      // }, {
      token,
      name: action.payload.name,
      location: action.payload.location,
      capacity: action.payload.capacity,
      price: action.payload.price
    });
    yield put({ type: types.ADD_CENTER_SUCCESS, center: response.data.center });
    yield put({
      type: types.SUCCESS_FLASH_MESSAGE,
      response: { message: response.data.message }
    });
    yield delay(10000);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
    // yield put(push('/centers'));
  } catch (error) {
    yield put({
      type: types.FAILURE_FLASH_MESSAGE,
      error: error.response.data.message
    });
    yield delay(5000);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
    error.response.status.message === (401 || 403)
      ? yield put(push('/login'))
      : null; // redirect to an error page
    // yield put({ type: types.ADD_CENTER_FAILURE,
    // response: 'ADD_CENTER_FAILED' });
  }
}

/**
 * watcher saga listens for ADD_CENTER action then calls addCenterAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchAddCenterAsync() {
  // console.log('listening for ADD_CENTER');
  yield takeEvery(types.ADD_CENTER, addCenterAsync);
}

/**
 * get a single center
 */

export function* fetchSingleCenterAsync(action) {
  try {
    const response = yield call(axios.get, `${url}/centers/${action.centerId}`);
    yield put({
      type: types.GET_SINGLE_CENTER_SUCCESS,
      response: response.data
    });
  } catch (error) {
    console.log(error.response.data.message);
    yield put({
      type: types.GET_SINGLE_CENTER_FAILURE,
      error: error.reponse.data.message
    });
  }
}

export function* watchGetSingleCenterAsync() {
  yield takeEvery(types.GET_SINGLE_CENTER, fetchSingleCenterAsync);
}

/**
 * update center saga
 */

export function* editCenterAsync(action) {
  try {
    const response = yield call(
      axios.put,
      `${url}/centers/${action.center.id}`,
      {
        token,
        name: action.center.name,
        capacity: action.center.capacity,
        location: action.center.location,
        price: action.center.price
      }
    );
    yield put({
      type: types.EDIT_CENTER_SUCCESS,
      response: response.data
    });
    yield put(push('/centers'));
  } catch (error) {
    yield put({ type: types.EDIT_CENTER_FAILURE, error: error });
  }
}

export function* watchEditCenterAsync() {
  yield takeEvery(types.EDIT_CENTER, editCenterAsync);
}

/**
 * delete center saga
 */

export function* deleteCenterAsync(action) {
  try {
    const response = yield call(
      axios.delete,
      `${url}/centers/${action.centerId}`
    );
    yield put({
      type: types.DELETE_CENTER_SUCCESS,
      response: response.data
    });
    yield put(push('/centers'));
  } catch (error) {
    yield put({
      type: types.DELETE_CENTER_FAILURE,
      error: error.response.data.message
    });
  }
}

export function* watchDeleteCenterAsync() {
  yield takeEvery(types.DELETE_CENTER, deleteCenterAsync);
}
