/**
 * 
 * 
 * @param {any} [state=[]] 
 * @param {any} action 
 * @returns {object} state
 */
function SignIn(state = [], action) {
  switch (action.type) {
    case 'SIGN_IN':
      console.log('signing in');
      return state;
    default:
      return state;
  }
}

export default SignIn;
