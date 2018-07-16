import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import axios from 'axios';

import {
  watchFetchCentersAsync,
  watchAddCenterAsync,
  watchGetSingleCenterAsync,
  watchEditCenterAsync,
  watchDeleteCenterAsync,
  watchSearchCentersAysnc
} from '../../Sagas/centersSaga';

import {
  GET_CENTERS,
  GET_CENTERS_SUCCESS,
  GET_CENTERS_FAILURE,
  ADD_CENTER,
  ADD_CENTER_SUCCESS,
  EDIT_CENTER,
  EDIT_CENTER_SUCCESS,
  EDIT_CENTER_FAILURE,
  GET_SINGLE_CENTER,
  GET_SINGLE_CENTER_SUCCESS,
  GET_SINGLE_CENTER_FAILURE,
  DELETE_CENTER,
  DELETE_CENTER_SUCCESS,
  DELETE_CENTER_FAILURE,
  SEARCH_CENTERS,
  SEARCH_CENTERS_SUCCESS,
  SEARCH_CENTERS_FAILURE,
  ADD_CENTER_FAILURE
} from '../../actions/actionTypes';

localStorage.setItem('token', 'randomtoken');
let token = localStorage.getItem('token');
let headers = { 'x-access-token': token };

describe('Centers Saga Success >>>', () => {
  it('fetches centers', () => {
    const response = {
      data: {
        success: true,
        payload: {
          centers: [],
          paginationData: { page: 1, numPages: 1, count: 2 }
        }
      }
    };

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/centers?${paginationQuery}`;

    return (
      expectSaga(watchFetchCentersAsync)
        .provide([[call(axios.get, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_CENTERS_SUCCESS,
          centers: [],
          paginationData: { page: 1, numPages: 1, count: 2 }
        })

        .dispatch({ type: GET_CENTERS, page, limit })

        // run it
        .run()
    );
  });

  it('page and limitset to default if they are falsy ', () => {
    const response = {
      data: {
        success: true,
        payload: {
          centers: [],
          paginationData: { page: 1, numPages: 1, count: 2 }
        }
      }
    };

    const action = {
      page: 0,
      limit: 0
    }

    // const { page, limit } = action;

    const paginationQuery = `page=1&limit=9`;

    const url = `http://localhost:8000/api/v1/centers?${paginationQuery}`;

    return (
      expectSaga(watchFetchCentersAsync)
        .provide([[call(axios.get, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_CENTERS_SUCCESS,
          centers: [],
          paginationData: { page: 1, numPages: 1, count: 2 }
        })

        .dispatch({ type: GET_CENTERS, page: action.page, limit: action.limit })

        // run it
        .run()
    );
  });

  it.skip('adds a center', () => {
    const action = {payload: {
      name: 'andela hall',
      location: 'lagos',
      capacity: 5000,
      price: 4000,
      image: 'images.jpeg'
    }};

    const response = { data: { center: { name: 'Andela'} } };

    const url = 'http://localhost:8000/api/v1/centers';

    return (
      expectSaga(watchAddCenterAsync)
        .provide([[call(axios.post, url, action.payload, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: ADD_CENTER_SUCCESS,
          center: { name: 'Andela' }
        })

        .dispatch({ type: ADD_CENTER, payload: action.payload })

        // run it
        .run()
    );
  });

  it.skip('updates a center', () => {
    const payload = {
      name: 'andela hall',
      location: 'lagos',
      capacity: 5000,
      price: 4000
    };

    const response = {
      data: {
        center: {
          name: 'andela hall',
          location: 'lagos',
          capacity: 5000,
          price: 4000,
          image: 'image'
        }
      }
    };

    const url = 'http://localhost:8000/api/v1/centers';

    token = localStorage.getItem('token');

    headers = {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data'
    };

    return (
      expectSaga(watchAddCenterAsync)
        .provide([[call(axios.post, url, payload), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: ADD_CENTER_SUCCESS,
          center: {
            name: 'andela hall',
            location: 'lagos',
            capacity: 5000,
            price: 4000,
            image: 'image'
          }
        })

        .dispatch({ type: ADD_CENTER, payload })

        // run it
        .run()
    );
  });

  it('fetches a single center', () => {
    const response = {
      data: { center: {} }
    };

    const url = `http://localhost:8000/api/v1/centers/1`;

    return (
      expectSaga(watchGetSingleCenterAsync)
        .provide([[call(axios.get, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_SINGLE_CENTER_SUCCESS,
          center: {}
        })

        .dispatch({ type: GET_SINGLE_CENTER, centerId: 1 })

        // run it
        .run()
    );
  });

  it('deletes a center', () => {
    const response = {
      data: { message: 'Deleted' }
    };

    const url = `http://localhost:8000/api/v1/centers/1`;

    return (
      expectSaga(watchDeleteCenterAsync)
        .provide([[call(axios.delete, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: DELETE_CENTER_SUCCESS,
          message: 'Deleted'
        })

        .dispatch({ type: DELETE_CENTER, centerId: 1 })

        // run it
        .run(300)
    );
  });

  it('searches for a center', () => {
    const payload = 'lagos';

    const searchQuery = `name=${payload}&location=${payload}`;

    const response = {
      data: { payload: { centers: [], paginationData: {} } }
    };

    const url = `http://localhost:8000/api/v1/search?${searchQuery}`;

    return (
      expectSaga(watchSearchCentersAysnc)
        .provide([[call(axios.get, url, { headers }), response]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: SEARCH_CENTERS_SUCCESS,
          centers: [],
          paginationData: {}
        })

        .dispatch({ type: SEARCH_CENTERS, payload: 'lagos' })

        // run it
        .run()
    );
  });
});

describe('Center Saga Failure >>>', () => {
  it(' does not fetch all centers', () => {
    const error = { response: { data: { message: 'Something went wrong' } } };

    const page = 1;
    const limit = 2;
    const paginationQuery = `page=${page}&limit=${limit}`;

    const url = `http://localhost:8000/api/v1/centers?${paginationQuery}`;

    return (
      expectSaga(watchFetchCentersAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_CENTERS_FAILURE,
          error: 'Something went wrong'
        })

        .dispatch({ type: GET_CENTERS, page, limit })

        // run it
        .run()
    );
  });

  it(' does not fetch details the details of a center', () => {
    const error = {};

    const action = { centerId: 1 };

    const url = `http://localhost:8000/api/v1/centers/${action.centerId}`;

    return (
      expectSaga(watchGetSingleCenterAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_SINGLE_CENTER_FAILURE,
          error: 'Network error, please refresh'
        })

        .dispatch({ type: GET_SINGLE_CENTER, centerId: action.centerId })

        // run it
        .run()
    );
  });

  it('errors while fetching a single center', () => {
    const error = { response: { data: { message: 'Something went wrong' } } };

    const action = { centerId: 1 };

    const url = `http://localhost:8000/api/v1/centers/${action.centerId}`;

    return (
      expectSaga(watchGetSingleCenterAsync)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: GET_SINGLE_CENTER_FAILURE,
          error: 'Something went wrong'
        })

        .dispatch({ type: GET_SINGLE_CENTER, centerId: action.centerId })

        // run it
        .run()
    );
  });

  it('errors while searching for a center', () => {
    const payload = 'lagos';

    const searchQuery = `name=${payload}&location=${payload}`;

    const error = {
      response: { data: { message: 'Error!' } }
    };

    const url = `http://localhost:8000/api/v1/search?${searchQuery}`;

    return (
      expectSaga(watchSearchCentersAysnc)
        .provide([[call(axios.get, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: SEARCH_CENTERS_FAILURE,
          error: 'Error!'
        })

        .dispatch({ type: SEARCH_CENTERS, payload: 'lagos' })

        // run it
        .run()
    );
  });

  it.skip('errors while creating an event', () => {
    const center = {
      nmae: 'center one'
    };

    const error = { response: { data: { message: 'Something went wrong' } } };

    const url = 'http://localhost:8000/api/v1/center';

    return (
      expectSaga(watchAddCenterAsync)
        .provide([
          [call(axios.post, url, center, { headers }), throwError(error)]
        ])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: ADD_CENTER_FAILURE,
          error: 'Something went wrong'
        })

        .dispatch({ type: ADD_CENTER, center })

        // run it
        .run(1200)
    );
  });

  it.skip('errros while updating an event', () => {
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

  it('errros while deleting a center', () => {
    const error = { response: { data: { message: 'Something went wrong' } } };

    const action = { centerId: 1 }

    const url = `http://localhost:8000/api/v1/centers/${action.centerId}`;

    return (
      expectSaga(watchDeleteCenterAsync)
        .provide([[call(axios.delete, url, { headers }), throwError(error)]])
        // assert that the saga will eventually yield `put`
        // with the expected action
        .put({
          type: DELETE_CENTER_FAILURE,
          error: 'Something went wrong'
        })

        .dispatch({ type: DELETE_CENTER, centerId: 1 })

        // run it
        .run()
    );
  });
});
