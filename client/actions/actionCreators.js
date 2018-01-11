export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const ADD_EVENT = 'ADD_EVENT';

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
    type: ADD_EVENT,
    event
  };
};