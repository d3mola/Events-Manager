// // import SIGN_IN_FAILED from '../actions/actionCreators';

// const defaultState = {
//   email: '',
//   password: '',
// };

// /**
//  * @param {object} state defaultState of signin component
//  * @param {object} action dispatched action object
//  * @returns {object} new state 
//  */
// const SignIn = (state = defaultState, action) => {

//   switch (action.type) {

//     // case 'SIGN_IN':
//     //   console.log('signing in state', action);
//     //   return {...state, email:'yoooooooo'};
//     //   // return action.response
    
//     case 'SIGN_IN_FAILED':
//       console.log('signing in state failed:', action.error);
//       return action.error;

//     default:
//       return state;
//   }

// };

// export default SignIn;
