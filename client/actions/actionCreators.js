import * as types from './actionTypes';

export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

/**
 * formats the request from the user and returns it
 * @param {any} payload from the user(username, password etc)
 * @returns {object} user
 */
export const signUp = payload => ({
  type: types.SIGN_UP,
  payload
});

/**
 * formats the request from the user and returns it
 * @param {any} payload from the user(username, password etc)
 * @returns {object} user
 */
export const signIn = payload => ({
  type: types.SIGN_IN,
  payload
});

/**
 * @returns {object} centers
 */
export const getCenters = () => ({
  type: types.GET_CENTERS
});

/**
 * formats request from user and returns it
 * @param {Number} centerId
 * @returns {Object} center
 */
export const fetchSingleCenter = centerId => ({
  type: types.GET_SINGLE_CENTER,
  centerId
});

/**
 * @param {object} payload from the user(name, location etc)
 * @returns {object} centers
 */
export const addCenter = payload => ({
  type: types.ADD_CENTER,
  payload
});

/**
 * @param {object} center center to be updated
 * @return {object} updatedCenter
 */
export const updateCenter = center => ({
  type: types.EDIT_CENTER,
  center
});

/**
 * @param {number} centerId center id from user
 * @returns {Object} center
 */
export const deleteCenter = centerId => ({
  type: types.DELETE_CENTER,
  centerId
});

/**
 * Event
 */

export const getEvents = () => ({
  type: types.GET_EVENTS
});

export const getSingleEvent = eventId => ({
  type: types.GET_SINGLE_EVENT,
  eventId
});

export const addEvent = event => {
  return {
    type: types.ADD_EVENT,
    event
  };
};

export const editEvent = event => ({
  type: types.EDIT_EVENT,
  event
});

export const deleteEvent = eventId => ({
  type: types.DELETE_EVENT,
  eventId
});

export const showEditForm = () => ({
  type: types.SHOW_EDIT_FORM
});

export const sendFlashMessage = (message, className) => ({
  type: types.FLASH_MESSAGE,
  payload: {
    message,
    className
  }
});
