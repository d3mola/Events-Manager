import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import toastr from 'toastr';

import setApiUrl from '../utils/setUrl';
import * as types from '../actions/actionTypes';

let url = setApiUrl(process.env.NODE_ENV);

/**
 * Aysnc operation to get a users events
 */

/**
 * Get events async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* getEventsAsync(action) {
  const page = action.page || 1;
  const limit = action.limit || 10;
  const paginationQuery = `page=${page}&limit=${limit}`;
  const token = localStorage.getItem('token');
  try {
    const response = yield call(
      axios.get,
      `${url}/users/auth/events?${paginationQuery}`,
      { headers: { 'x-access-token': token } }
    );
    yield put({
      type: types.GET_EVENTS_SUCCESS,
      events: response.data.payload.events,
      paginationData: response.data.payload.paginationData
    });
  } catch (error) {
    let message;
    if (!error.response) {
      message = 'Possible network error, please reload the page';
    } else {
      switch (error.response.status) {
        case 401:
          message = 'You need to login';
          yield put(push('/login'));
          break;
        case 500:
          message = 'Server error, try again';
          break;
        case 404:
          message = 'no events, do you wish to create one?';
          break;
        default:
          message = 'Something went wrong';
          console.log(
            'error - remember to dispatch get events failure action here'
          );
      }
    }
    yield put({ type: types.GET_EVENTS_FAILURE, error: message });
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
    toastr.error(message);
  }
}

/**
 * listens for get centers action type call then call signUpAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchGetEventsAsync() {
  // console.log('listening for GET_EVENTS');
  yield takeEvery(types.GET_EVENTS, getEventsAsync);
}

/**
 * Aysnc operation to fetch the details of a single event
 */

/**
 * Get single event async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* getSingleEventAsync(action) {
  const token = localStorage.getItem('token');
  try {
    console.log('trying to fetch details of a single event api..', action);
    const response = yield call(
      axios.get,
      `${url}/users/auth/events/${action.eventId}`,
      {
        headers: { 'x-access-token': token }
      }
    );
    yield put({
      type: types.GET_SINGLE_EVENT_SUCCESS,
      response: response.data
    });
  } catch (error) {
    yield put({
      type: types.GET_SINGLE_EVENT_FAILURE,
      error: error.response.data.message || error.message
    });
  }
}

/**
 * listens for get centers action type call then call signUpAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchGetSingleEventAsync() {
  yield takeEvery(types.GET_SINGLE_EVENT, getSingleEventAsync);
}

/**
 * Async operation to add an event
 */

export function* addEventAsync(action) {
  const token = localStorage.getItem('token');
  try {
    const response = yield call(axios.post, `${url}/events`, {
      title: action.event.title,
      notes: action.event.notes,
      centerId: action.event.centerId,
      date: action.event.date
    },{ headers: { 'x-access-token': token } });

    yield put({ type: types.ADD_EVENT_SUCCESS, response: response.data });
    yield put({
      type: types.SUCCESS_FLASH_MESSAGE,
      response: { message: response.data.message }
    });
    toastr.success(response.data.message);
    yield put(push('/events'));
  } catch (error) {
    yield put({
      type: types.ADD_EVENT_ERROR,
      error: error.response.data.message
    });
    toastr.error(error.response.data.message);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

/**
 * listens for 'ADD_EVENT' action always, then calls 'addEventAsync'
 * @returns {function} addEventAsync
 */
export function* watchAddEventAsync() {
  // console.log('listening for ADD_EVENT');
  yield takeEvery(types.ADD_EVENT, addEventAsync);
}

/**
 * Async operation to edit an event
 */

export function* editEventAsync(action) {
  const token = localStorage.getItem('token');
  try {
    const response = yield call(axios.put, `${url}/events/${action.event.id}`, {
      title: action.event.title,
      notes: action.event.notes,
      centerId: action.event.centerId,
      date: action.event.date
    },{ headers: { 'x-access-token': token } });
    yield put({ type: types.EDIT_EVENT_SUCCESS, response: response.data });
    toastr.success(response.data.message);
    yield put(push('/events'));
  } catch (error) {
    yield put({
      type: types.EDIT_EVENT_FAILURE,
      error
    });
    toastr.error(error.response.data.message);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

/**
 * listens for 'ADD_EVENT' action always, then calls 'addEventAsync'
 * @returns {function} addEventAsync
 */
export function* watchEditEventAsync() {
  yield takeEvery(types.EDIT_EVENT, editEventAsync);
}

/**
 * Delete Event Async
 */

export function* deleteEventAsync(action) {
  const token = localStorage.getItem('token');
  try {
    const response = yield call(
      axios.delete,
      `${url}/events/${action.eventId}`,
      { headers: { 'x-access-token': token } }
    );
    yield put({ type: types.DELETE_EVENT_SUCCESS, response: response.data });
    toastr.success(response.data.message);
    yield put(push('/events'));
  } catch (error) {
    yield put({
      type: types.DELETE_EVENT_FAILURE,
      error: error.response.data.message
    });
    toastr.error(error.response.data.message);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

export function* watchDeleteEventAsync() {
  yield takeEvery(types.DELETE_EVENT, deleteEventAsync);
}
