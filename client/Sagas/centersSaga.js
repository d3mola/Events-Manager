import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import toastr from 'toastr';
import setApiUrl from '../utils/setUrl';

import * as types from '../actions/actionTypes';

let url = setApiUrl(process.env.NODE_ENV);

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-custom",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

/**
 * Aysnc operation to get all centers
 */

/**
 * Get centers async operation to fetch centers
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* fetchcentersAsync(action) {
  const page = action.page || 1;
  const limit = action.limit || 9;
  const paginationQuery = `page=${page}&limit=${limit}`;
  const token = localStorage.getItem('token');
  try {
    const response = yield call(
      axios.get,
      `${url}/centers?${paginationQuery}`,
      { headers: { 'x-access-token': token } }
    );
    yield put({
      type: types.GET_CENTERS_SUCCESS,
      centers: response.data.payload.centers,
      paginationData: response.data.payload.paginationData
    });
  } catch (error) {
    yield put({
      type: types.GET_CENTERS_FAILURE,
      error: error.response.data.message
    });
    yield put({ type: types.CLEAR_FLASH_MESSAGE});
  }
}

/**
 * listens for get centers action type call then call signUpAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchFetchCentersAsync() {
  yield takeLatest(types.GET_CENTERS, fetchcentersAsync);
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
  const token = localStorage.getItem('token');
  try {
    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('location', action.payload.location);
    formData.append('capacity', action.payload.capacity);
    formData.append('price', action.payload.price);
    formData.append('image', action.payload.image);
    const headers = {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data'
    };
    const response = yield call(
      axios.post,
      `${url}/centers`,
      formData,
      { headers }
    );
    yield put({ type: types.ADD_CENTER_SUCCESS, center: response.data.center });
    toastr.success(response.data.message);
    yield put(push('/centers'));
  } catch (error) {
    yield put({
      type: types.ADD_CENTER_FAILURE,
      error: error.response.data.message
    });
    toastr.error(error.response.data.message);
    error.response.status.message === (401 || 403)
    ? yield put(push('/login'))
    : null;
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

/**
 * watcher saga listens for ADD_CENTER action then calls addCenterAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchAddCenterAsync() {
  yield takeEvery(types.ADD_CENTER, addCenterAsync);
}


/**
 * get a single center
 */

 /**
 * worker saga performs async operation to fetch a single center
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* fetchSingleCenterAsync(action) {
  const token = localStorage.getItem('token');
  try {
    const response = yield call(
      axios.get,
      `${url}/centers/${action.centerId}`,
      { headers: { 'x-access-token': token } }
    );
    yield put({
      type: types.GET_SINGLE_CENTER_SUCCESS,
      center: response.data.center
    });
  } catch (error) {
    if (!error.response) {
      toastr.error('Network error, please refresh');
      yield put({
        type: types.GET_SINGLE_CENTER_FAILURE,
        error: 'Network error, please refresh'
      });
      yield put({ type: types.CLEAR_FLASH_MESSAGE });
    } else {
      toastr.error(error.response.data.message);
      yield put({
        type: types.GET_SINGLE_CENTER_FAILURE,
        error: error.response.data.message });
      yield({ type: types.CLEAR_FLASH_MESSAGE });
      
    }
  }
}

/**
 * watcher saga listens for GET_SINGLE_CENTER action
 * then calls fetchSingleCenterAsync
 * @returns {object} centersAsync
 * @export
 */
export function* watchGetSingleCenterAsync() {
  yield takeEvery(types.GET_SINGLE_CENTER, fetchSingleCenterAsync);
}

/**
 * update center saga
 */


 /**
 * worker saga performs async operation to update a center
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* editCenterAsync(action) {
  const token = localStorage.getItem('token');
  try {
    const formData = new FormData();
    formData.append('name', action.center.name);
    formData.append('location', action.center.location);
    formData.append('capacity', action.center.capacity);
    formData.append('price', action.center.price);
    if (action.center.image) formData.append('image', action.center.image);
    const headers = {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data'
    };
    const response = yield call(
      axios.put,
      `${url}/centers/${action.center.id}`,
      formData,
      { headers }
    );
    yield put({
      type: types.EDIT_CENTER_SUCCESS,
      response: response.data
    });
    toastr.success(response.data.message);
    yield put(push('/centers'));
  } catch (error) {
    yield put({
      type: types.EDIT_CENTER_FAILURE,
      error: error.response.data.message || 'error editing'
    });
    toastr.error(error.response.data.message);
  }
}


/**
 * watcher saga listens for EDIT_CENTER action
 * then calls editCenterAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchEditCenterAsync() {
  yield takeEvery(types.EDIT_CENTER, editCenterAsync);
}

/**
 * delete center saga
 */

 /**
 * worker saga performs async operation to delete a center
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* deleteCenterAsync(action) {
  const token = localStorage.getItem('token');
  try {
    const response = yield call(
      axios.delete,
      `${url}/centers/${action.centerId}`,
      { headers: { 'x-access-token': token } }
    );
    yield put({
      type: types.DELETE_CENTER_SUCCESS,
      message: response.data.message
    });
    toastr.success(response.data.message);
    yield put(push('/centers'));
  } catch (error) {
    yield put({
      type: types.DELETE_CENTER_FAILURE,
      error: error.response.data.message
    });
    toastr.error(error.response.data.message);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

// listens for DELETE_CENTER action and calls deleteCenterAsync
export function* watchDeleteCenterAsync() {
  yield takeEvery(types.DELETE_CENTER, deleteCenterAsync);
}


// search centers saga

/**
 * worker saga performs async operation to search a center
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* searchCentersAysnc({ type, payload }) {
  const token = localStorage.getItem('token');
  const searchQuery = `name=${payload}&location=${payload}`;
  try {
    const response = yield call(axios.get, `${url}/search?${searchQuery}`, {
      headers: { 'x-access-token': token }
    });

    yield put({
      type: types.SEARCH_CENTERS_SUCCESS,
      centers: response.data.payload.centers,
      paginationData: response.data.payload.paginationData
    });
  } catch (error) {
    yield put({
      type: types.SEARCH_CENTERS_FAILURE,
      error: error.response.data.message
    });
    toastr.error(error.response.data.message);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

/**
 * watcher saga listens for SEARCH_CENTERS action
 * then calls editCenterAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchSearchCentersAysnc() {
  yield takeLatest(types.SEARCH_CENTERS, searchCentersAysnc);
}
