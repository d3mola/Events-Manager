import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

const eventsReducer = (state=initialState.events, action) => {
  switch (action.type) {

    case actionTypes.ADD_EVENT_LOADING:
      return {...state, addingEvent: true};

    case actionTypes.ADD_EVENT_SUCCESS:
      console.log('redcucer success===> ', {...state, addingEvent:false})
      return {...state, addingEvent: false};

    case actionTypes.ADD_EVENT_ERROR:
      return {...state, error: action.error, addingEvent: false};
      
    default:
      return state;
  }
}

export default eventsReducer;