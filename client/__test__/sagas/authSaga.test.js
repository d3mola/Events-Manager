import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import axios from 'axios';

import {
  watchSignUpAsync,
  watchSignInAsync,
  watchLogout
} from '../../Sagas/authSaga';

import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  CLEAR_FLASH_MESSAGE
} from '../../actions/actionTypes';



describe('Auth Saga Success >>>', () => {
  it('signs up a user', () => {

    const payload = {
      username: 'thanos',
      email: 'thanos@test.com',
      password: 'password',
      confirmPassword: 'password',
    }

    const response = {
      data: {
        token: 'random token',
        user: {
          username: 'thanos',
          email: 'thanos@test.com',
          userId: 1,
          isAdmin: false
        }
      }
    }

    const url = 'http://localhost:8000/api/v1/users';

    localStorage.setItem('token', 'random token');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('user', 'thanos');

    return expectSaga(watchSignUpAsync)

      .provide([[call(axios.post, url, payload), response]])
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({
        type: SIGN_UP_SUCCESS,
        token: 'random token',
        user: {
          username: 'thanos',
          email: 'thanos@test.com',
          userId: 1,
          isAdmin: false
        }
      })

      .dispatch({ type: SIGN_UP, payload })
  
      // run it
      .run();
  });

  it('logs in a user', () => {

    const payload = {
      email: 'thanos@test.com',
      password: 'password',
    }

    const response = {
      data: {
        token: 'random token',
        user: {
          username: 'thanos',
          email: 'thanos@test.com',
          userId: 1,
          isAdmin: false
        }
      }
    }

    const url = 'http://localhost:8000/api/v1/users/login';

    localStorage.setItem('token', 'random token');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('user', 'thanos');

    return expectSaga(watchSignInAsync)

      .provide([[call(axios.post, url, payload), response]])
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({
        type: SIGN_IN_SUCCESS,
        token: 'random token',
        user: {
          username: 'thanos',
          email: 'thanos@test.com',
          userId: 1,
          isAdmin: false
        }
      })

      .dispatch({ type: SIGN_IN, payload })
  
      // run it
      .run();
  });

  it('logs out a user', () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');

    return expectSaga(watchLogout)
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({
        type: LOG_OUT_SUCCESS,
        isAuthenticated: false,
        token: null,
        user: null,
        isAdmin: false
      })

      .dispatch({ type: LOG_OUT })
  
      // run it
      .run();
  });
});

describe('Auth Saga Failure >>>', () => {
  it('fails on sign up', () => {
    const payload = {
      username: 'thanos',
      email: 'thanos@test.com',
      password: 'password',
      confirmPassword: 'password',
    }

    const error = { response: { data: { message: 'error message' } } };

    const url = 'http://localhost:8000/api/v1/users';

    localStorage.setItem('token', 'random token');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('user', 'thanos');

    return expectSaga(watchSignUpAsync)

      .provide([[call(axios.post, url, payload), throwError(error)]])
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({
        type: SIGN_UP_FAILURE,
        error: 'error message'
      })

      .dispatch({ type: SIGN_UP, payload })
  
      // run it
      .run();
  });

  it('fails on login', () => {

    const payload = {
      email: 'thanos@test.com',
      password: 'password',
    }

    const error = { response: { data: { message: 'error message' } } };
    const message = 'Something went wrong';

    const url = 'http://localhost:8000/api/v1/users/login';

    localStorage.setItem('token', 'random token');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('user', 'thanos');

    return expectSaga(watchSignInAsync)

      .provide([[call(axios.post, url, payload), throwError(error)]])
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({ type: SIGN_IN_FAILURE, error: message })

      .put({ type: CLEAR_FLASH_MESSAGE })

      .dispatch({ type: SIGN_IN, payload })
  
      // run it
      .run();
  });

  it('fails on login with status 500', () => {

    const payload = {
      email: 'thanos@test.com',
      password: 'password',
    }

    const error = { response: { status: 500 ,data: { message: 'error message' } } };
    const message = 'Internal Server Error';

    const url = 'http://localhost:8000/api/v1/users/login';

    localStorage.setItem('token', 'random token');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('user', 'thanos');

    return expectSaga(watchSignInAsync)

      .provide([[call(axios.post, url, payload), throwError(error)]])
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({ type: SIGN_IN_FAILURE, error: message })

      .put({ type: CLEAR_FLASH_MESSAGE })

      .dispatch({ type: SIGN_IN, payload })
  
      // run it
      .run();
  });

  it('fails on login with status 401', () => {

    const payload = {
      email: 'thanos@test.com',
      password: 'password',
    }

    const error = { response: { status: 401 ,data: { message: 'error message' } } };
    const message = 'Invalid credentials';

    const url = 'http://localhost:8000/api/v1/users/login';

    localStorage.setItem('token', 'random token');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('user', 'thanos');

    return expectSaga(watchSignInAsync)

      .provide([[call(axios.post, url, payload), throwError(error)]])
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({ type: SIGN_IN_FAILURE, error: message })

      .put({ type: CLEAR_FLASH_MESSAGE })

      .dispatch({ type: SIGN_IN, payload })
  
      // run it
      .run();
  });

  it('fails if there is no response', () => {

    const payload = {
      email: 'thanos@test.com',
      password: 'password',
    }

    const error = {};

    const url = 'http://localhost:8000/api/v1/users/login';

    localStorage.setItem('token', 'random token');
    localStorage.setItem('isAdmin', false);
    localStorage.setItem('user', 'thanos');

    return expectSaga(watchSignInAsync)

      .provide([[call(axios.post, url, payload), throwError(error)]])
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({ type: SIGN_IN_FAILURE, error: undefined })

      .put({ type: CLEAR_FLASH_MESSAGE })

      .dispatch({ type: SIGN_IN, payload })
  
      // run it
      .run();
  });
});
