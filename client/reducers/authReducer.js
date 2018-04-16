import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.authReducer, action) => {
  switch (action.type) {
    // case types.SET_LOADING_INDICATOR:
    //   return { ...state, isLoading: true };
    case types.SIGN_IN:
      return { ...state, isLoading: true, isAuthenticated: false };
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // isAuthenticated: action.isAuthenticated,
        // response: action.response.message,
        token: action.token, // most useful based on new implementataion
        error: null
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        // isAuthenticated: false,
        // error: action.error, // prev implementation from signInAsyn saga
        error: action.error // new implementation from loginAsync Saga
      };
    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.isAuthenticated,
        token: action.token
      };
    // case types.SET_LOGIN_STATUS:
    //   return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
};

export default authReducer;
