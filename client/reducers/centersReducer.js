import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

/**
 * @param {*} state
 * @param {*} action
 * @returns {array} state
 */
const centers = (state = initialState.centersReducer, action) => {
  switch (action.type) {

    case 'GET_CENTERS_SUCCESS':
      return {...state, centers: action.response.centers};

    case 'ADD_CENTER_SUCCESS':
      return {...state, center: action.response.center};

    case 'ADD_CENTER_FAILED':
      return state;
      
    case actionTypes.GET_SINGLE_CENTER_SUCCESS:
      return {...state, selectedCenter: action.response.center }

    default:
      return state;
  }
};

export default centers;

