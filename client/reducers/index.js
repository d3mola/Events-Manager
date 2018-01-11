import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import signUp from './userSignUpReducer';
import signIn from './signinReducer';
import centers from './centersReducer';
import events from './eventsReducer';

const rootReducer = combineReducers({
  signUp,
  signIn,
  centers,
  events,
  routing: routerReducer
});

export default rootReducer;
