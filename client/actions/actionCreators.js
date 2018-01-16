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
export const centers = () => {
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

// export const deleteEvent = event => ({
//   type: actionTypes.DELETE_EVENT,
//   event
// });
