import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { history } from '../routes';
// Our worker Saga: will perform the async tasks

const token = localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;

const url = 'https://party-palace.herokuapp.com';
const localUrl = 'http://localhost:8000';

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
    const response = yield call(axios.post, `${localUrl}/api/v1/users`, {
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password
    });
    console.log(response);
    history.push('/centers');
  } catch (error) {
    console.log('Unable to get access signup api');
    console.log(error.message);
  }
}

/**
 *  watcher saga listens for sign_up action type call then calls signUpAsync
 * @returns {function} to the reducer
 * @export
 */
export function* watchSignUpAsync() {
  console.log('listening for SIGN_UP');
  yield takeEvery('SIGN_UP', signUpAsync)
}

/**
 * Aysnc operation to sign in
 */

/**
 * Sign in async operation
 * @export
 * @param {any} action 
 * @returns {object} response
 */
export function* signInAsync(action) {
  try {
    console.log('trying to connect to login...', action)
    const response = yield call(axios.post, `${localUrl}/api/v1/users/login`, {
      email: action.payload.email,
      password: action.payload.password
    });
    localStorage.setItem('token', response.data.token);
    history.push('/centers');
  } catch (error) {
    console.log('saga error in sign in', error.message);
    yield put({ type: 'SIGN_IN_FAILED', error: error.massage });
  }
}

/**
 * listens for sign_up action type call then calls signInAsync
 * @returns {function} .
 * @export
 */
export function* watchSignInAsync() {
  console.log('listening for SIGN_IN');
  yield takeEvery('SIGN_IN', signInAsync)
}


/**
 * Aysnc operation to get all centers
 */

/**
 * Get centers async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* centersAsync(action) {
  try {
    console.log('trying to access get all centers api..', action);
    const response = yield call(axios.get, `${localUrl}/api/v1/centers`, {
      headers: { "x-access-token": token }
    });
    console.log('api response', response.data);
    yield put({ type: 'GET_CENTERS_SUCCESS', response: response.data });
  } catch (error) {
    console.log(error);
  }
}

/**
 * listens for get centers action type call then call signUpAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchCentersAsync() {
  console.log('listening for GET_CENTERS');
  yield takeEvery('GET_CENTERS', centersAsync)
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
    // console.log(`${localUrl}/api/v1/centers`)
    const response = yield call(axios.post, `${localUrl}/api/v1/centers`, {
    //   headers: { "x-access-token": token }
    // }, {
      token,
      name: action.payload.name,
      location: action.payload.location,
      capacity: action.payload.capacity,
      price: action.payload.price
    });

    yield put({ type: 'ADD_CENTER_SUCCESS', response: response.data });
    history.push('/centers');

  } catch (error) {
    console.log('Unable to add a center', error.message);
    // yield put({ type: 'ADD_CENTER_FAILED', response: 'ADD_CENTER_FAILED' });
  }
}

/**
 * watcher saga listens for ADD_CENTER action then calls addCenterAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchAddCenterAsync() {
    console.log('listening for ADD_CENTER');
  yield takeEvery('ADD_CENTER', addCenterAsync)
}

/**
 * single entry point to start all sagas at once
 * @returns {functions} watchSignUpAsync(),watchSignInAsync(),watchCentersAsync()
 * @export
 */
export default function* rootSaga() {
  yield [
    watchSignUpAsync(),
    watchSignInAsync(),
    watchCentersAsync(),
    watchAddCenterAsync()
  ]
}
