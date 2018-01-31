import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import signUp from './userSignUpReducer';
import signIn from './signinReducer';
import centers from './centersReducer';
import eventsReducer from './eventsReducer';

const rootReducer = combineReducers({
  signUp,
  signIn,
  centers,
  eventsReducer,
  router: routerReducer
});

export default rootReducer;
