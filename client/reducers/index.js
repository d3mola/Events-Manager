import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import signUp from './userSignUpReducer';
// import signIn from './signinReducer';
import centersReducer from './centersReducer';
import eventsReducer from './eventsReducer';
import flashMessages from './flashMessages';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  flashMessages,
  // signUp,
  // signIn,
  authReducer,
  centersReducer,
  eventsReducer,
  router: routerReducer
});

export default rootReducer;
