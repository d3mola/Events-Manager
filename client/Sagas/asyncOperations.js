import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import history from '../history';
// Our worker Saga: will perform the async tasks

const token = localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;

/**
 * worker saga performs async calls to the api
 * @export
 * @param {any} action 
 * @returns {object} response
 */
export function* signUpAsync(action) {
  try{
      const response = yield call(axios.post, '/api/v1/users', {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password
      })
      history.push('/signin');
  } catch(error) {
			console.log('Unable to get access signup api');
			console.log(error);
  }
}

/**
 *  watcher saga listens for sign_up action type call then calls signUpAsync
 * @returns {function} to the reducer
 * @export
 */
export function* watchSignUpAsync() {
    yield takeEvery('SIGN_UP', signUpAsync)
}

/**
 * Sign in async operation
 * @export
 * @param {any} action 
 * @returns {object} response
 */
export function* signInAsync(action) {
  try{
      console.log('trying to connect to login...')
      const response = yield call(axios.post, '/api/v1/users/login', {
        email: action.payload.email,
        password: action.payload.password
      });
      localStorage.setItem('token', response.data.token);
      history.push('/centers');
  } catch (error) {
      console.log(error);
  }
}

/**
 * listens for sign_up action type call then calls signInAsync
 * @returns {function} .
 * @export
 */
export function* watchSignInAsync() {
     yield takeEvery('SIGN_IN', signInAsync)
}


/**
 * Aysnc operation to get all center
 */

/**
 * Get centers async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* centersAsync(action) {
    // const token = localStorage.getItem('token');
    try{
        const response = yield call(axios.get, '/api/v1/centers', {
					headers: { "x-access-token": token }
				});
				yield put({ type: 'GET_CENTERS_SUCCESS', response: response.data});
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
		const token = localStorage.getItem('token')
		console.log('Trying to post a center to the api...');
		const response = yield call(axios.post, 'api/v1/centers', {
			name: action.payload.name,
			location: action.payload.location,
			capacity: action.payload.capacity,
			price: action.payload.price
		});
		console.log('token====>', token);

		yield put({ type: 'ADD_CENTER_SUCCESS', response: response.data});

	} catch (error) {
		console.log('Unable to add a center', error);
	}
}

/**
 * watcher saga listens for ADD_CENTER action then calls addCenterAsync
 * @returns {function} centersAsync
 * @export
 */
export function* watchAddCenterAsync() {
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
