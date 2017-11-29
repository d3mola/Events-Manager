import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
// Our worker Saga: will perform the async increment task
// const rootUrl = 'https://jsonplaceholder.typicode.com';

const userUrl = '/api/v1/users';

export function* incrementAsync(action) {
  try{
      console.log('trying to connect...')
      const response = yield call(axios.post, userUrl, {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password
      })
      console.log(response);
      // setTimeout(() => {
      //   <Redirect to='/home'/>
      // }, 2000)
  }catch(e){
      console.log('ERROR!!!')
  }
}

export function* watchIncrementAsync() {
    console.log('running!')
    yield takeEvery('SIGN_UP', incrementAsync)
}

export function* signinfunc(action) {
  try{
      console.log('trying to connect to login...')
      const response = yield call(axios.post, '/api/v1/users/login', {
        email: action.payload.email,
        password: action.payload.password
      })
      console.log(response);
      // setTimeout(() => {
      //   <Redirect to='/home'/>
      // }, 2000)
  }catch(e){
      console.log('ERROR!!!')
  }
}

export function* watchInsiginfunc() {
    console.log('running!')
    yield takeEvery('SIGN_IN', signinfunc)
}

export default function* rootSaga() {
    yield [
      watchIncrementAsync(),
      watchInsiginfunc()
    ]
}
