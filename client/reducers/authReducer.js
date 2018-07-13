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
        isAdmin: action.user.isAdmin.toString(),
        token: action.token,
        error: null
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        token: null,
        error: action.error
      };
    case types.SIGN_UP:
      return { ...state, isLoading: true };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.user.username,
        isAdmin: action.user.isAdmin.toString(),
        token: action.token
      };
    case types.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        token: null,
        isAdmin: 'false',
        user: null
      };
    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
        user: action.user,
        isAdmin: action.isAdmin
      };
    default:
      return state;
  }
};

export default authReducer;
