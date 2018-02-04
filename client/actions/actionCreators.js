import * as actionTypes from './actionTypes';

export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

/**
 * formats the request from the user and returns it
 * @param {any} payload from the user(username, password etc)
 * @returns {object} user
 */
export const signUp = payload => {
  return {
    type: 'SIGN_UP',
    payload
  };
};

/**
 * formats the request from the user and returns it
 * @param {any} payload from the user(username, password etc)
 * @returns {object} user
 */
export const signIn = payload => {
  return {
    type: 'SIGN_IN',
    payload
  };
};

/**
 * @returns {object} centers
 */
export const getCenters = () => {
  return {
    type: 'GET_CENTERS',
  };
};

/**
 * @param {any} payload from the user(name, location etc)
 * @returns {object} centers
 */
export const addCenter = payload => {
  return {
    type: 'ADD_CENTER',
    payload
  };
};

export const addEvent = event => {
  return {
    type: actionTypes.ADD_EVENT,
    event
  };
};

export const editEvent = (event) => ({
  type: actionTypes.EDIT_EVENT,
  event,
});

export const getEvents = () => ({
  type: actionTypes.GET_EVENTS,
});

export const getSingleEvent = (eventId) => ({
  type: actionTypes.GET_SINGLE_EVENT,
  eventId
});

export const deleteEvent = eventId => ({
  type: actionTypes.DELETE_EVENT,
  eventId
});

export const fetchSingleCenter = (centerId) => ({
  type: actionTypes.GET_SINGLE_CENTER,
  centerId
});

export const showEditForm = () => ({
  type: actionTypes.SHOW_EDIT_FORM
});

export const deleteCenter = (centerId) => ({
  type: actionTypes.DELETE_CENTER,
  centerId
});

export const updateCenter = (center) => ({
  type: actionTypes.EDIT_CENTER,
  center
});