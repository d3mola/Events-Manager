function SignUp(state = [], action) {
  switch(action.type) {
    case 'SIGN_UP' :
      console.log('signing up');
      return state
    default:
      return state;
  }
}

export default SignUp;
