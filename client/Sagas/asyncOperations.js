import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';

// import { SIGN_IN_FAILED } from '../actions/actionCreators'
import * as actionTypes from '../actions/actionTypes';
// Our worker Saga: will perform the async tasks

const token = localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;

const url = 'https://party-palace.herokuapp.com';
const localUrl = 'http://localhost:8000';

// /**
//  * Aysnc operation to sign up
//  */

// /**
//  * worker saga performs async calls to the api
//  * @export
//  * @param {any} action
//  * @returns {object} response
//  */
// export function* signUpAsync(action) {
//   try {
//     const response = yield call(axios.post, `${localUrl}/api/v1/users`, {
//       username: action.payload.username,
//       email: action.payload.email,
//       password: action.payload.password
//     });
//     yield put({ type: actionTypes.SUCCESS_FLASH_MESSAGE, response: response.data });
//     yield delay(500);
//     yield put(push('/centers'));
//   } catch (error) {
//     yield put({ type: actionTypes.FAILURE_FLASH_MESSAGE, error: error.response.data.message });
//     yield delay(5000);
//     yield put({ type: actionTypes.CLEAR_FLASH_MESSAGE });
//   }
// }

// /**
//  *  watcher saga listens for sign_up action type call then calls signUpAsync
//  * @returns {function} to the reducer
//  * @export
//  */
// export function* watchSignUpAsync() {
//   // console.log('listening for SIGN_UP');
//   yield takeEvery('SIGN_UP', signUpAsync)
// }

// /**
//  * Aysnc operation to sign in
//  */

// /**
//  * Sign in async operation
//  * @export
//  * @param {any} action
//  * @returns {object} response
//  */
// export function* signInAsync(action) {
//   try {
//     console.log('trying to connect to login...', action)
//     const response = yield call(axios.post, `${localUrl}/api/v1/users/login`, {
//       email: action.payload.email,
//       password: action.payload.password
//     });
//     localStorage.setItem('token', response.data.token);
//     // yield put({ type: actionTypes.FLASH_MESSAGE, payload:{message: response.data.message, className:'alert-success'} });
//     // yield delay(2000);
//     yield put(push('/centers'));
//   } catch (error) {
//     console.log('saga error in sign in', error.response.data.message);
//     yield put({ type: SIGN_IN_FAILED, error: error.response.data.message });
//     yield put({ type: actionTypes.FAILURE_FLASH_MESSAGE, error: error.response.data.message });
//     yield delay(5000);
//     yield put({ type: actionTypes.CLEAR_FLASH_MESSAGE });
//   }
// }

// /**
//  * listens for sign_up action type call then calls signInAsync
//  * @returns {function} .
//  * @export
//  */
// export function* watchSignInAsync() {
//   // console.log('listening for SIGN_IN');
//   yield takeEvery('SIGN_IN', signInAsync)
// }

// /**
//  * Aysnc operation to get all centers
//  */

// /**
//  * Get centers async operation
//  * @export
//  * @param {any} action
//  * @returns {object} response
//  */
// export function* fetchcentersAsync() {
//   try {
//     // console.log('trying to access get all centers api..', action);
//     const response = yield call(axios.get, `${localUrl}/api/v1/centers`, {
//       headers: { "x-access-token": token }
//     });
//     // console.log('api response', response.data);
//     yield put({ type: 'GET_CENTERS_SUCCESS', response: response.data });
//   } catch (error) {
//     console.log(error.response.data.message );
//   }
// }

// /**
//  * listens for get centers action type call then call signUpAsync
//  * @returns {function} centersAsync
//  * @export
//  */
// export function* watchFetchCentersAsync() {
//   // console.log('listening for GET_CENTERS');
//   yield takeEvery('GET_CENTERS', fetchcentersAsync)
// }

// /**
//  * Aysnc operation to add a center
//  */

// /**
//  * worker saga performs async operation to add a center
//  * @export
//  * @param {any} action
//  * @returns {object} response
//  */
// export function* addCenterAsync(action) {
//   try {
//     console.log('Trying to post a center to the api..  ', action);
//     // console.log(`${localUrl}/api/v1/centers`)
//     const response = yield call(axios.post, `${localUrl}/api/v1/centers`, {
//     //   headers: { "x-access-token": token }
//     // }, {
//       token,
//       name: action.payload.name,
//       location: action.payload.location,
//       capacity: action.payload.capacity,
//       price: action.payload.price
//     });

//     yield put({ type: 'ADD_CENTER_SUCCESS', response: response.data });
//     yield put(push('/centers'));

//   } catch (error) {
//     yield put({ type: actionTypes.FAILURE_FLASH_MESSAGE, error: error.response.data.message });
//     yield delay(5000);
//     yield put({ type: actionTypes.CLEAR_FLASH_MESSAGE });
//     error.response.data.message === 'token issues'?
//     yield put(push('/login')): yield put(push('/error'));// redirect to an error page
//     // yield put({ type: 'ADD_CENTER_FAILED', response: 'ADD_CENTER_FAILED' });
//   }
// }

// /**
//  * watcher saga listens for ADD_CENTER action then calls addCenterAsync
//  * @returns {function} centersAsync
//  * @export
//  */
// export function* watchAddCenterAsync() {
//   // console.log('listening for ADD_CENTER');
//   yield takeEvery('ADD_CENTER', addCenterAsync)
// }

// /**
//  * Async operation to add an event
//  */

// export function* addEventAsync(action) {
//   try {
//     console.log('attempting to add a center to the api', action);
//     const response = yield call(axios.post, `${localUrl}/api/v1/events`, {
//       // token,
//       title: action.event.title,
//       notes: action.event.notes,
//       centerId: action.event.centerId,
//       date: action.event.date
//     });

//     yield put({ type: actionTypes.ADD_EVENT_SUCCESS, response: response.data });
//     yield put(push('/events'));

//   } catch (error) {
//     console.log(error.response.data.message);
//     yield put({
//       type: actionTypes.ADD_EVENT_ERROR,
//       error
//     });
//     yield put({ type: actionTypes.FAILURE_FLASH_MESSAGE, error: error.response.data.message });
//     yield delay(5000);
//     yield put({ type: actionTypes.CLEAR_FLASH_MESSAGE });
//   }
// }

// /**
//  * listens for 'ADD_EVENT' action always, then calls 'addEventAsync'
//  * @returns {function} addEventAsync
//  */
// export function* watchAddEventAsync() {
//   // console.log('listening for ADD_EVENT');
//   yield takeEvery(actionTypes.ADD_EVENT, addEventAsync);
// }

// /**
//  * Async operation to edit an event
//  */

// export function* editEventAsync(action) {
//   try {
//     const response = yield call(axios.put, `${localUrl}/api/v1/events/${action.event.id}`, {
//       token,
//       title: action.event.title,
//       notes: action.event.notes,
//       centerId: action.event.centerId,
//       date: action.event.date
//     });
//     yield put({ type: actionTypes.EDIT_EVENT_SUCCESS, response: response.data });
//     yield put(push('/events'));

//   } catch (error) {
//     console.log(error.response.data.message);
//     yield put({
//       type: actionTypes.EDIT_EVENT_FAILURE,
//       error
//     });
//     yield put({ type: actionTypes.FAILURE_FLASH_MESSAGE, error: error.response.data.message });
//     yield delay(5000);
//     yield put({ type: actionTypes.CLEAR_FLASH_MESSAGE });
//   }
// }

// /**
//  * listens for 'ADD_EVENT' action always, then calls 'addEventAsync'
//  * @returns {function} addEventAsync
//  */
// export function* watchEditEventAsync() {
//   yield takeEvery(actionTypes.EDIT_EVENT, editEventAsync);
// }

// /**
//  * Aysnc operation to get a users events
//  */

// /**
//  * Get events async operation
//  * @export
//  * @param {any} action
//  * @returns {object} response
//  */
// export function* getEventsAsync(action) {
//   try {
//     const response = yield call(axios.get, `${localUrl}/api/v1/users/auth/events`, {
//       headers: { "x-access-token": token }
//     });
//     yield put({ type: actionTypes.GET_EVENTS_SUCCESS, response: response.data });
//   } catch (error) {
//     console.log('error', error.response.data.message);
//     (error.response.data.message === 'token issues') ?
//     yield put(push('/login')):
//     console.log('error - remember to dispatch get events failure action here');
//   }
// }

// /**
//  * listens for get centers action type call then call signUpAsync
//  * @returns {function} centersAsync
//  * @export
//  */
// export function* watchGetEventsAsync() {
//   // console.log('listening for GET_EVENTS');
//   yield takeEvery(actionTypes.GET_EVENTS, getEventsAsync)
// }

// /**
//  * Aysnc operation to fetch the details of a single event
//  */

// /**
//  * Get single event async operation
//  * @export
//  * @param {any} action
//  * @returns {object} response
//  */
// export function* getSingleEventAsync(action) {
//   try {
//     console.log('trying to fetch details of a single event api..', action);
//     const response = yield call(axios.get, `${localUrl}/api/v1/users/auth/events/${action.eventId}`, {
//       headers: { "x-access-token": token }
//     });
//     yield put({ type: actionTypes.GET_SINGLE_EVENT_SUCCESS, response: response.data });
//   } catch (error) {
//     console.log('issa error', error.response.data.message);
//   }
// }

// /**
//  * listens for get centers action type call then call signUpAsync
//  * @returns {function} centersAsync
//  * @export
//  */
// export function* watchGetSingleEventAsync() {
//   yield takeEvery(actionTypes.GET_SINGLE_EVENT, getSingleEventAsync)
// }

// /**
//  * Delete Event Async
//  */

// export function* deleteEventAsync(action) {
//   try {
//     const response = yield call(axios.delete,`${localUrl}/api/v1/events/${action.eventId}`);
//     yield put({type: actionTypes.DELETE_EVENT_SUCCESS, response: response.data});

//   } catch (error) {
//     yield put({ type: actionTypes.DELETE_EVENT_FAILURE, error: error.response.data.message });
//     yield put({ type: actionTypes.FAILURE_FLASH_MESSAGE, error: error.response.data.message });
//     yield delay(5000);
//     yield put({ type: actionTypes.CLEAR_FLASH_MESSAGE });
//   }
// }

// export function* watchDeleteEventAsync() {
//   yield takeEvery(actionTypes.DELETE_EVENT, deleteEventAsync)
// }

// /**
//  * get a single center
//  */

// export function* fetchSingleCenterAsync(action) {
//   try {
//     const response = yield call(axios.get, `${localUrl}/api/v1/centers/${action.centerId}`);
//     yield put({type: actionTypes.GET_SINGLE_CENTER_SUCCESS, response: response.data});
//   } catch (error) {
//     console.log(error.response.data.message);
//     yield put({type: actionTypes.GET_SINGLE_CENTER_FAILURE, error: error.reponse.data.message});
//   }
// }

// export function* watchGetSingleCenterAsync() {
//   yield takeEvery(actionTypes.GET_SINGLE_CENTER, fetchSingleCenterAsync);
// }

export function* showEditFormAsync(action) {
  try {
    yield put({ type: actionTypes.SHOW_EDIT_FORM_SUCCESS });
  } catch (error) {
    console.log(error);
  }
}

export function* watchshowEditFormAsync() {
  yield takeEvery(actionTypes.SHOW_EDIT_FORM, showEditFormAsync);
}

// export function* deleteCenterAsync(action) {
//   try {
//     const response = yield call(axios.delete, `${localUrl}/api/v1/centers/${action.centerId}`);
//     yield put({ type: actionTypes.DELETE_CENTER_SUCCESS, response: response.data });
//     yield put(push('/centers'));
//   } catch (error) {
//     yield put({type: actionTypes.DELETE_CENTER_FAILURE, error: error.response.data.message});
//   }
// }

// export function* watchDeleteCenterAsync() {
//   yield takeEvery(actionTypes.DELETE_CENTER, deleteCenterAsync);
// }

// export function* editCenterAsync(action) {
//   try {
//     const response = yield call(axios.put, `${localUrl}/api/v1/centers/${action.center.id}`, {
//       token,
//       name: action.center.name,
//       capacity: action.center.capacity,
//       location: action.center.location,
//       price: action.center.price
//     });
//     yield put({ type: actionTypes.EDIT_CENTER_SUCCESS, response: response.data });
//     yield put(push('/centers'))
//   } catch (error) {
//     yield put({type: actionTypes.EDIT_CENTER_FAILURE, error: error});
//   }
// }

// export function* watchEditCenterAsync() {
//   yield takeEvery(actionTypes.EDIT_CENTER, editCenterAsync);
// }

/**
 * single entry point to start all sagas at once
 * @returns {functions} forked sagas
 * @export
 */
export default function* rootSaga() {
  yield [
    watchSignUpAsync(),
    watchSignInAsync(),
    watchFetchCentersAsync(),
    watchAddCenterAsync(),
    watchAddEventAsync(),
    watchEditEventAsync(),
    watchGetEventsAsync(),
    watchDeleteEventAsync(),
    watchGetSingleEventAsync(),
    watchGetSingleCenterAsync(),
    watchshowEditFormAsync(),
    watchDeleteCenterAsync(),
    watchEditCenterAsync()
  ];
}
