/**
 * 
 * 
 * @param {any} [state=[]] initial state
 * @param {any} action 
 * @returns {object} state
 */
const SignIn = ((state = [], action) => {
  switch (action.type) {
    case 'SIGN_IN':
      console.log('signing in', action);
      return state;
    default:
      return state;
  }
});

export default SignIn;
