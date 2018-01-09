const defaultState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
console.log('initial state: ', defaultState)

/** 
* 
* @param {any} [state=[]] initial state
* @param {any} action 
* @returns {object} state
*/
const signUp = (state = defaultState, action) => {
  switch(action.type) {
    case 'SIGN_UP' :
      console.log('signing up');
      return state
    default:
      return state;
  }
};

export default signUp;
