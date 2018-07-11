import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import axios from 'axios';

import {
  watchGetEventsAsync,
  watchGetSingleEventAsync,
  watchAddEventAsync,
  watchEditEventAsync,
  watchDeleteEventAsync
} from '../../Sagas/eventsSaga';

import {
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  GET_SINGLE_EVENT,
  GET_SINGLE_EVENT_SUCCESS,
  GET_SINGLE_EVENT_FAILURE,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_ERROR,
  EDIT_EVENT,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE
} from '../../actions/actionTypes';

localStorage.setItem('token', 'randomtoken');
let token = localStorage.getItem('token');
let headers = { 'x-access-token': token };

describe('Event Saga Success >>>', () => {
  it('fetches all events', () => {
    const response = {
      data: {
        success: true,
        payload: {
          events: [],
          paginationData: { page: 1, numPages: 1, count: 2 }
        }
      }
    };

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/users/auth/events?${paginationQuery}`;

    return (
      expectSaga(watchGetEventsAsync)
        .provide([[call(axios.get, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_EVENTS_SUCCESS,
          events: response.data.payload.events,
          paginationData: { page: 1, numPages: 1, count: 2 }
        })

        .dispatch({ type: GET_EVENTS, page, limit })

        // run it
        .run()
    );
  });

  it('fetches all events if pagination query is not supplied', () => {
    const response = {
      data: {
        success: true,
        payload: {
          events: [],
          paginationData: { page: 1, numPages: 1, count: 2 }
        }
      }
    };

    const page =1 ;
    const limit = 10;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/users/auth/events?${paginationQuery}`;

    return (
      expectSaga(watchGetEventsAsync)
        .provide([[call(axios.get, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_EVENTS_SUCCESS,
          events: response.data.payload.events,
          paginationData: { page: 1, numPages: 1, count: 2 }
        })

        .dispatch({ type: GET_EVENTS })

        // run it
        .run()
    );
  });

  it('fetches a single event', () => {
    const response = {
      data: {
        success: true,
        payload: {
          events: {}
        }
      }
    };

    const url = `http://localhost:8000/api/v1/users/auth/events/1`;

    return (
      expectSaga(watchGetSingleEventAsync)
        .provide([[call(axios.get, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_SINGLE_EVENT_SUCCESS,
          response: response.data
        })

        .dispatch({ type: GET_SINGLE_EVENT, eventId: 1 })

        // run it
        .run()
    );
  });

  it('creates an event', () => {
    const event = {
      title: 'event one',
      notes: 'notes',
      centerId: 1,
      date: '12-12-2002'
    };

    const response = {
      data: {}
    };

    const url = 'http://localhost:8000/api/v1/events';

    return (
      expectSaga(watchAddEventAsync)
        .provide([[call(axios.post, url, event, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: ADD_EVENT_SUCCESS,
          response: {}
        })

        .dispatch({ type: ADD_EVENT, event })

        // run it
        .run()
    );
  });

  it('updates an event', () => {
    const event = {
      id: 1,
      title: 'event two',
      notes: 'notes',
      centerId: 1,
      date: '12-12-2002'
    };

    const response = {
      data: { message: 'Edited', success: true, updatedEvent: {} }
    };

    const url = `http://localhost:8000/api/v1/events/${event.id}`;

    return (
      expectSaga(watchEditEventAsync)
        .provide([
          [
            call(
              axios.put,
              url,
              {
                title: 'event two',
                notes: 'notes',
                centerId: 1,
                date: '12-12-2002'
              },
              { headers }
            ),
            response
          ]
        ])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: EDIT_EVENT_SUCCESS,
          response: response.data
        })

        .dispatch({ type: EDIT_EVENT, event })

        // run it
        .run()
    );
  });

  it('deletes an event', () => {
    const response = {
      data: { message: 'Deleted' }
    };

    const url = `http://localhost:8000/api/v1/events/1`;

    return (
      expectSaga(watchDeleteEventAsync)
        .provide([[call(axios.delete, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: DELETE_EVENT_SUCCESS,
          response: response.data
        })

        .dispatch({ type: DELETE_EVENT, eventId: 1 })

        // run it
        .run()
    );
  });
});

describe('Event Saga Failure >>>', () => {
  it(' does not fetch all events', () => {
    const error = { response: { data: { message: 'Something went wrong' } } };

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/users/auth/events?${paginationQuery}`;

    return (
      expectSaga(watchGetEventsAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_EVENTS_FAILURE,
          error: error.response.data.message
        })

        .dispatch({ type: GET_EVENTS, page, limit })

        // run it
        .run()
    );
  });

  it(' does not fetch all events', () => {
    const error = {};

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/users/auth/events?${paginationQuery}`;

    return (
      expectSaga(watchGetEventsAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_EVENTS_FAILURE,
          error: 'Possible network error, please reload the page'
        })

        .dispatch({ type: GET_EVENTS, page, limit })

        // run it
        .run()
    );
  });

  it(' does not fetch all events - status 500', () => {
    const error = {
      response: { status: 500, data: { message: 'Server error, try again' } }
    };

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/users/auth/events?${paginationQuery}`; //eslint-disable-line

    return (
      expectSaga(watchGetEventsAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_EVENTS_FAILURE,
          error: error.response.data.message
        })

        .dispatch({ type: GET_EVENTS, page, limit })

        // run it
        .run()
    );
  });

  it(' does not fetch all events - status 401', () => {
    const error = {
      response: { status: 401, data: { message: 'You need to login' } }
    };

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/users/auth/events?${paginationQuery}`; //eslint-disable-line

    return (
      expectSaga(watchGetEventsAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_EVENTS_FAILURE,
          error: error.response.data.message
        })

        .dispatch({ type: GET_EVENTS, page, limit })

        // run it
        .run()
    );
  });

  it(' does not fetch all events - status 404', () => {
    const error = {
      response: { status: 404, data: { message: 'no events, do you wish to create one?' } }
    };

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/users/auth/events?${paginationQuery}`; //eslint-disable-line

    return (
      expectSaga(watchGetEventsAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_EVENTS_FAILURE,
          error: error.response.data.message
        })

        .dispatch({ type: GET_EVENTS, page, limit })

        // run it
        .run()
    );
  });

  it('errors while fetching a single event', () => {
    const error = { response: { data: { message: 'Something went wrong' } } };

    const url = `http://localhost:8000/api/v1/users/auth/events/1`;

    return (
      expectSaga(watchGetSingleEventAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_SINGLE_EVENT_FAILURE,
          error: 'Something went wrong'
        })

        .dispatch({ type: GET_SINGLE_EVENT, eventId: 1 })

        // run it
        .run()
    );
  });

  it('errors while fetching a single event 2', () => {
    const error = { message: 'Fallback error', response: { data: {} } };

    const url = `http://localhost:8000/api/v1/users/auth/events/1`;

    return (
      expectSaga(watchGetSingleEventAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_SINGLE_EVENT_FAILURE,
          error: 'Fallback error'
        })

        .dispatch({ type: GET_SINGLE_EVENT, eventId: 1 })

        // run it
        .run()
    );
  });

  it('errors while creating an event', () => {
    const event = {
      title: 'event one',
      notes: 'notes',
      centerId: 1,
      date: '12-12-2002'
    };

    const error = { response: { data: { message: 'Something went wrong' } } };

    const url = 'http://localhost:8000/api/v1/events';

    return (
      expectSaga(watchAddEventAsync)
        .provide([[call(axios.post, url, event, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: ADD_EVENT_ERROR,
          error: 'Something went wrong'
        })

        .dispatch({ type: ADD_EVENT, event })

        // run it
        .run()
    );
  });

  it('errros while updating an event', () => {
    const event = {
      id: 1,
      title: 'event two',
      notes: 'notes',
      centerId: 1,
      date: '12-12-2002'
    };

    const error = { response: { data: { message: 'Something went wrong' } } };

    const url = `http://localhost:8000/api/v1/events/${event.id}`;

    return (
      expectSaga(watchEditEventAsync)
        .provide([
          [
            call(
              axios.put,
              url,
              {
                title: 'event two',
                notes: 'notes',
                centerId: 1,
                date: '12-12-2002'
              },
              { headers }
            ),
            throwError(error)
          ]
        ])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: EDIT_EVENT_FAILURE,
          error: 'Something went wrong'
        })

        .dispatch({ type: EDIT_EVENT, event })

        // run it
        .run()
    );
  });

  it('errros while deleting an event', () => {
    const error = { response: { data: { message: 'Something went wrong' } } };

    const url = `http://localhost:8000/api/v1/events/1`;

    return (
      expectSaga(watchDeleteEventAsync)
        .provide([[call(axios.delete, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: DELETE_EVENT_FAILURE,
          error: 'Something went wrong'
        })

        .dispatch({ type: DELETE_EVENT, eventId: 1 })

        // run it
        .run()
    );
  });
});
