/**
 * formats the request from the user and returns it
 * @param {any} data from the user(username, password etc)
 * @returns {object} user
 */
export function signUp(payload) {
  return {
    type: 'SIGN_UP',
    payload
  };
}

/**
 * formats the request from the user and returns it
 * @param {any} data from the user(username, password etc)
 * @returns {object} user
 */
export function signIn(payload) {
  return {
    type: 'SIGN_IN',
    payload
  };
}
