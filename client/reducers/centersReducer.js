import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

/**
 * @param {object} state initial state of centers reducer
 * @param {object} action dispatched action
 * @returns {object} state
 */
const centers = (state = initialState.centersReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_CENTERS:
      return { ...state, isFetching: true };
    case actionTypes.GET_CENTERS_SUCCESS:
      return { ...state, centers: action.centers, isFetching: false };
    case actionTypes.GET_CENTERS_FAILURE:
      return { ...state, isFetching: false };
    case actionTypes.ADD_CENTER:
      return { ...state, addingCenter: true };
      case actionTypes.ADD_CENTER_SUCCESS:
      return {
        ...state,
        addingCenter: false,
        center: action.center,
        centers: [...state.centers, action.center]
      };
    case actionTypes.ADD_CENTER_FAILURE:
      return { ...state, addingCenter: false, error: action.error };
    case actionTypes.GET_SINGLE_CENTER:
      return {
        ...state,
        isFetching: true,
        selectedCenter: null
      };
    case actionTypes.GET_SINGLE_CENTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedCenter: action.center
      };
    case actionTypes.DELETE_CENTER_SUCCESS:
      return {
        ...state,
        deletedCenter: action.response.selectedCenter,
        message: action.response.message
      };
    case actionTypes.DELETE_CENTER_FAILURE:
      return { ...state };
    case actionTypes.EDIT_CENTER_SUCCESS:
      return { ...state, updatedCenter: action.response.updatedCenter };
    case actionTypes.EDIT_CENTER_FAILURE:
      return { ...state };
    case actionTypes.FETCHING:
      return { ...state, fetchingCenters: action.status };
    default:
      return state;
  }
};

export default centers;
