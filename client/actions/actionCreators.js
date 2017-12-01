/**
 * formats the request from the user and returns it
 * @param {any} payload from the user(username, password etc)
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
 * @param {any} payload from the user(username, password etc)
 * @returns {object} user
 */
export function signIn(payload) {
  return {
    type: 'SIGN_IN',
    payload
  };
}

/**
 * @returns {object} centers
 */
export function centers() {
  return {
    type: 'GET_CENTERS',
  };
}

// export function centers() {
//   return {
//     type: 'GET_CENTERS_SUCCESS'
//   }
// }