/**
 * @param {any} payload
 * @returns {object} user
 */
export function signUp(payload) {
  return {
    type: 'SIGN_UP',
    payload
  };
}

export function signIn(payload) {
  return {
    type: 'SIGN_IN',
    payload
  };
}
