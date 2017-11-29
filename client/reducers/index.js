import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import signUp from './userSignUpReducer';

const rootReducer = combineReducers({ signUp, routing:routerReducer });

export default rootReducer;
