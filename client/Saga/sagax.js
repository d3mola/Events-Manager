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
      console.log('trying to connect...')
      const response = yield call(axios.post, '/api/v1/users?limit=action.limit', {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password
      })
      console.log(response);
      history.push('/signin');
  }catch(e){
      console.log('ERROR!!!')
  }
}

/**
 *  watcher saga listens for sign_up action type call then calls signUpAsync
 * @returns {function} to the reducer
 * @export
 */
export function* watchSignUpAsync() {
    console.log('running!')
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
      })
      console.log(response.data);0
      localStorage.setItem('token', response.data.token);
      console.log(response);
      history.push('/');
  }catch(error){
      console.log(error);
  }
}

/**
 * listens for sign_up action type call then calls signInAsync
 * @returns {function} .
 * @export
 */
export function* watchSignInAsync() {
    console.log('running!')
     yield takeEvery('SIGN_IN', signInAsync)
}

/**
 * Get centers async operation
 * @export
 * @param {any} action
 * @returns {object} response
 */
export function* centersAsync(action) {
    // const token = localStorage.getItem('token');
    try{
			console.log('trying to get centers from the API');
        const response = yield call(axios.get, '/api/v1/centers'/*, {headers: { "x-access-token": token }}*/);
				console.log('saga response ========>', response.data);
				yield put({ type: 'GET_CENTERS_SUCCESS', response: response.data});
    }catch(error){
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
 * single entry point to start all sagas at once
 * @returns {functions} watchSignUpAsync(),watchSignInAsync(),watchCentersAsync()
 * @export
 */
export default function* rootSaga() {
    yield [
      watchSignUpAsync(),
      watchSignInAsync(),
      watchCentersAsync()
    ]
}
