import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import signUp from './userSignUpReducer';
import signIn from './signinReducer';
import centers from './centersReducer';

const rootReducer = combineReducers({ signUp, signIn, centers, routing:routerReducer });

export default rootReducer;
