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

    case actionTypes.EDIT_EVENT_SUCCESS:
      console.log('redcucer success===> ', {...state})
      return {...state};

    case actionTypes.EDIT_EVENT_ERROR:
      return {...state, error: action.error};

    case actionTypes.GET_EVENTS_SUCCESS:
      console.log('Reducer==> get events successfull', action.response.events);
      return [...action.response.events];
        
    default:
      return state;
  }
}

export default eventsReducer;