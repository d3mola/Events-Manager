import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.flashMessages, action) => {
  switch (action.type) {
    case actionTypes.FLASH_MESSAGE:
      return { ...state, payload: action.payload };
    case actionTypes.SUCCESS_FLASH_MESSAGE:
      return {
        ...state,
        message: action.response.message,
        className: 'alert-success'
      };
    case actionTypes.FAILURE_FLASH_MESSAGE:
      return { ...state, error: action.error, className: 'alert-danger' };
    case actionTypes.CLEAR_FLASH_MESSAGE:
      return { ...state, message: null, className: null, error: null };
    default:
      return state;
  }
};
