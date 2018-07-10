import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

const eventsReducer = (state = initialState.eventsReducer, action) => {
  let events, currentEvent;
  switch (action.type) {
    case actionTypes.ADD_EVENT:
      return { ...state, addingEvent: true,  };

    case actionTypes.ADD_EVENT_SUCCESS:
      return { ...state, addingEvent: false };

    case actionTypes.ADD_EVENT_ERROR:
      return { ...state, error: action.error, addingEvent: false };

    case actionTypes.EDIT_EVENT_SUCCESS:
      return {
        ...state,
        currentEvent: action.response.updatedEvent,
      };

    case actionTypes.EDIT_EVENT_FAILURE:
      return { ...state, error: action.error };

    case actionTypes.GET_EVENTS:
      return { ...state, isFetching: true };
    case actionTypes.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.events,
        paginationData: action.paginationData,
        isFetching: false,
        error: null
      };
    case actionTypes.GET_EVENTS_FAILURE:
      return { ...state, error: action.error, isFetching: false };

    case actionTypes.GET_SINGLE_EVENT:
      return { ...state, currentEvent: null, isFetching: true };

    case actionTypes.GET_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        currentEvent: action.response.event,
        isFetching: false
      };
    case actionTypes.GET_SINGLE_EVENT_FAILURE:
      return {
        ...state,
        currentEvent: null,
        isFetching: false,
        error: action.error
      };
    case actionTypes.DELETE_EVENT_SUCCESS:
      // events = state.events.filter(
      //   event => event.id !== action.response.event.id
      // );
      // if the details of an event is currently showing and it is succesfully deleted, clear the event
      // currentEvent = events.some(event => state.currentEvent.id === event.id)
      //   ? state.currentEvent
      //   : null;
      return { ...state, error: null };

    case actionTypes.DELETE_EVENT_FAILURE:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default eventsReducer;
