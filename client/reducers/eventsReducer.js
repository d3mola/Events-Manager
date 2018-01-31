import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

const eventsReducer = (state=initialState.eventsReducer, action) => {
  let events, currentEvent;
  switch (action.type) {

    case actionTypes.ADD_EVENT_LOADING:
      return {...state, addingEvent: true};

    case actionTypes.ADD_EVENT_SUCCESS:
      // console.log('redcucer success===> ', {...state, addingEvent:false})
      return {...state, addingEvent: false};

    case actionTypes.ADD_EVENT_ERROR:
      return {...state, error: action.error, addingEvent: false};

    case actionTypes.EDIT_EVENT_SUCCESS:
      // console.log('redcucer success===> ', {...state})
      return {...state};

    case actionTypes.EDIT_EVENT_FAILURE:
      return {...state, error: action.error};
      
    case actionTypes.GET_EVENTS_SUCCESS:
      // console.log('Reducer==> get events successfull', {...state, events: action.response.events});
      // return [...action.response.events];
      return {...state, events: action.response.events};

    case actionTypes.GET_SINGLE_EVENT_SUCCESS:
      // console.log('Reducer==> get single event successfull', {...state, currentEvent: action.response.event});
      return {...state, currentEvent: action.response.event};

    case actionTypes.DELETE_EVENT_SUCCESS:
      events = state.events.filter(event => event.id !== action.response.event.id);
      // if the details of an event is currently showing and it is succesfully deleted, clear the event
      currentEvent = events.some(event => state.currentEvent.id === event.id) ? state.currentEvent : null;
      return {...state, events, currentEvent};

    case actionTypes.DELETE_EVENT_FAILURE:
      // console.log('Reducer==> delete events unsuccessfull', action.response);
      return {...state};
        
    default:
      return {...state};
  }
}

export default eventsReducer;