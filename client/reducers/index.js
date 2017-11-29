import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import signUp from './userSignUpReducer';
import signIn from './signinReducer';

const rootReducer = combineReducers({ signUp, signIn, routing:routerReducer });

export default rootReducer;
