import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

/**
 * @param {*} state
 * @param {*} action
 * @returns {array} state
 */
const centers = (state = initialState.centersReducer, action) => {
  switch (action.type) {
    // case actionTypes.GET_CENTERS:
    //   return { ...state, isFetching: true };

    case actionTypes.GET_CENTERS_SUCCESS:
      return { ...state, centers: action.centers, isFetching: false };

    case actionTypes.GET_CENTERS_FAILURE:
      return { ...state, isFetching: false };

    case actionTypes.ADD_CENTER_SUCCESS:
      return { ...state, center: action.center };

    case actionTypes.ADD_CENTER_FAILURE:
      return state;

    case actionTypes.GET_SINGLE_CENTER_SUCCESS:
      return { ...state, selectedCenter: action.response.center };

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
