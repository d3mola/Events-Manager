function SignUp(state = [], action) {
  switch(action.type) {
    case 'SIGN_UP' :
      console.log('Incrementing RECIPES');
      return state
    default:
      return state;
  }
}

export default SignUp;
