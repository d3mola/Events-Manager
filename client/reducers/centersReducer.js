import initialState from './initialState';
import * as types from '../actions/actionTypes';

/**
 * @param {object} state initial state of centers reducer
 * @param {object} action dispatched action
 * @returns {object} state
 */
const centers = (state = initialState.centersReducer, action) => {
  switch (action.type) {
    case types.GET_CENTERS:
      return { ...state, isFetching: true };
    case types.GET_CENTERS_SUCCESS:
      return { ...state, centers: action.centers, isFetching: false, paginationData: action.paginationData };
    case types.GET_CENTERS_FAILURE:
      return { ...state, isFetching: false , error: action.error};
    case types.ADD_CENTER:
      return { ...state, addingCenter: true };
      case types.ADD_CENTER_SUCCESS:
      return {
        ...state,
        addingCenter: false,
        center: action.center,
        centers: [...state.centers, action.center]
      };
    case types.ADD_CENTER_FAILURE:
      return { ...state, addingCenter: false, error: action.error };
    case types.GET_SINGLE_CENTER:
      return {
        ...state,
        isFetching: true,
        selectedCenter: null
      };
    case types.GET_SINGLE_CENTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedCenter: action.center,
      };
    case types.GET_SINGLE_CENTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case types.DELETE_CENTER_SUCCESS:
      return {
        ...state,
        message: action.message
      };
    case types.DELETE_CENTER_FAILURE:
      return { ...state, error: action.error };
    case types.EDIT_CENTER:
      return { ...state, editingCenter: true }
    case types.EDIT_CENTER_SUCCESS:
      return { ...state, error: null, updatedCenter: action.response.updatedCenter, editingCenter: false };
    case types.EDIT_CENTER_FAILURE:
      return { ...state, editingCenter: false , error: action.error};
    case types.SEARCH_CENTERS:
      return { ...state, isFetching: true };
    case types.SEARCH_CENTERS_SUCCESS:
      return { ...state, isFetching: false, centers: action.centers, paginationData: action.paginationData };
    case types.SEARCH_CENTERS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    case types.CLEAR_FLASH_MESSAGE:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default centers;
