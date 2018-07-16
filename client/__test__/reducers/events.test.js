import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';
import eventsReducer from '../../reducers/eventsReducer';
import initialState from '../../reducers/initialState';

let action, newState, receivedState;
const firstEvent = {
  id: 1,
  title: 'first event',
  notes: 'first note',
  centerId: '1',
  date: '2018-12-05'
}
const secondEvent = {
  id: 2,
  title: 'second event',
  notes: 'second note',
  centerId: '1',
  date: '2018-12-06'
}
const newEvent = {
  id: 3,
  title: 'new event',
  notes: 'new note',
  centerId: '1',
  date: '2018-12-07'
}
const events = [firstEvent, secondEvent];

describe('Event Reducer', () => {
  it('should return the initial state', () => {
    expect(eventsReducer(initialState.eventsReducer, {})).toEqual(
      initialState.eventsReducer
    );
  });

  it('should return the initial state', () => {
    expect(eventsReducer(undefined, {})).toEqual(
      initialState.eventsReducer
    );
  });

  it('should handle ADD_EVENT', () => {
    receivedState = eventsReducer(
      initialState.eventsReducer,
      actions.addEvent(firstEvent)
    );
    expect(receivedState.addingEvent).toEqual(true);
  });

  it('should handle ADD_EVENT_SUCCESS', () => {
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.ADD_EVENT_SUCCESS }
    );
    expect(receivedState.addingEvent).toEqual(false);
  });

  it('should handle ADD_EVENT_ERROR', () => {
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.ADD_EVENT_ERROR, error: 'failed' }
    );
    expect(receivedState.addingEvent).toEqual(false);
    expect(receivedState.error).toEqual('failed');
  });

  it('should handle EDIT_EVENT_SUCCESS', () => {
    const response = {
      updatedEvent: newEvent
    };
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.EDIT_EVENT_SUCCESS, response }
    );
    expect(receivedState.error).toEqual(null);
  });

  it('should handle EDIT_EVENT_FAILURE', () => {
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.EDIT_EVENT_FAILURE, error: 'failed' }
    );
    expect(receivedState.error).toEqual('failed');
  });

  it('should handle GET_EVENTS', () => {
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.GET_EVENTS }
    );
    expect(receivedState.error).toEqual(null);
    expect(receivedState.events).toEqual(events);
    expect(receivedState.isFetching).toEqual(true);
  });

  it('should handle GET_EVENTS_SUCCESS', () => {
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.GET_EVENTS_SUCCESS, events }
    );
    expect(receivedState.error).toEqual(null);
    expect(receivedState.events).toEqual(events);
    expect(receivedState.isFetching).toEqual(false);
  });

  it('should handle GET_EVENTS_FAILURE', () => {
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.GET_EVENTS_FAILURE, error: 'error' }
    );
    expect(receivedState.error).toEqual('error');
    expect(receivedState.isFetching).toEqual(false);
  });

  it('should handle GET_SINGLE_EVENT', () => {
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.GET_SINGLE_EVENT }
    );
    expect(receivedState.error).toEqual(null);
    expect(receivedState.isFetching).toEqual(true);
  });

  it('should handle GET_SINGLE_EVENT_SUCCESS', () => {
    const response = {
      event: firstEvent
    };
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.GET_SINGLE_EVENT_SUCCESS, response }
    );
    expect(receivedState.error).toEqual(null);
    expect(receivedState.isFetching).toEqual(false);
  });

  it('should handle GET_SINGLE_EVENT_FAILURE', () => {
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.GET_SINGLE_EVENT_FAILURE, error: 'error' }
    );
    expect(receivedState.error).toEqual('error');
    expect(receivedState.isFetching).toEqual(false);
  });

  it('should handle DELETE_EVENT_SUCCESS', () => {
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.DELETE_EVENT_SUCCESS, response: {
        event: { id : 1 }
      }}
    );
    expect(receivedState.error).toEqual(null);
  });

  it('should handle DELETE_EVENT_FAILURE', () => {
    initialState.eventsReducer.events  = events;
    receivedState = eventsReducer(
      initialState.eventsReducer,
      { type: types.DELETE_EVENT_FAILURE, error: 'error' }
    );
    expect(receivedState.error).toEqual('error');
  });
});
