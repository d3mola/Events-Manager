import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.authReducer, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return { ...state, isLoading: true, isAuthenticated: false };
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.user.username,
        isAdmin: action.user.isAdmin,
        // response: action.response.message,
        token: action.token, // most useful based on new implementataion
        error: null
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        token: null,
        // isAuthenticated: false,
        // error: action.error, // prev implementation from signInAsyn saga
        error: action.error // new implementation from loginAsync Saga
      };
    case types.SIGN_UP:
      return { ...state, isLoading: true };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.user.username,
        isAdmin: action.user.isAdmin,
        token: action.token
      };
    case types.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        token: null,
        isAdmin: false,
        user: null
      };
    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.isAuthenticated,
        token: action.token
      };
    default:
      return state;
  }
};

export default authReducer;
