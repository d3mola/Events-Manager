import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
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
axios.defaults.headers.common['x-access-token'] = token;

/**
 * Aysnc operation to get a users events
 */

/**
 * Get events async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* getEventsAsync() {
  try {
    const response = yield call(axios.get, `${url}/users/auth/events`, {
      headers: { 'x-access-token': token }
    });
    yield put({
      type: types.GET_EVENTS_SUCCESS,
      events: response.data.events
    });
    // yield put({ type: types.SET_LOGIN_STATUS, isAuthenticated: true });
  } catch (error) {
    console.log('error', error);
    console.log('error', error.response.status);
    let message;
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
    yield put({ type: types.GET_EVENTS_FAILURE, error: message });
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
    console.log('issa error', error.response.data.message);
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
  try {
    const response = yield call(axios.post, `${url}/events`, {
      // token,
      title: action.event.title,
      notes: action.event.notes,
      centerId: action.event.centerId,
      date: action.event.date
    });

    yield put({ type: types.ADD_EVENT_SUCCESS, response: response.data });
    yield put({
      type: types.SUCCESS_FLASH_MESSAGE,
      response: { message: response.data.message }
    });
    yield delay(5000);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
    // yield put(push('/events'));
  } catch (error) {
    yield put({
      type: types.ADD_EVENT_ERROR,
      error: error.response.data.message
    });
    yield put({
      type: types.FAILURE_FLASH_MESSAGE,
      error: error.response.data.message
    });
    yield delay(5000);
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
  try {
    const response = yield call(axios.put, `${url}/events/${action.event.id}`, {
      token,
      title: action.event.title,
      notes: action.event.notes,
      centerId: action.event.centerId,
      date: action.event.date
    });
    yield put({ type: types.EDIT_EVENT_SUCCESS, response: response.data });
    yield put(push('/events'));
  } catch (error) {
    console.log(error.response.data.message);
    yield put({
      type: types.EDIT_EVENT_FAILURE,
      error
    });
    yield put({
      type: types.FAILURE_FLASH_MESSAGE,
      error: error.response.data.message
    });
    yield delay(5000);
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
  try {
    const response = yield call(
      axios.delete,
      `${url}/events/${action.eventId}`
    );
    yield put({ type: types.DELETE_EVENT_SUCCESS, response: response.data });
    yield put(push('/events'));
  } catch (error) {
    yield put({
      type: types.DELETE_EVENT_FAILURE,
      error: error.response.data.message
    });
    yield put({
      type: types.FAILURE_FLASH_MESSAGE,
      error: error.response.data.message
    });
    yield delay(5000);
    yield put({ type: types.CLEAR_FLASH_MESSAGE });
  }
}

export function* watchDeleteEventAsync() {
  yield takeEvery(types.DELETE_EVENT, deleteEventAsync);
}
