import * as actions from '../../actions/actionCreators';

describe('Event Actions', () => {
  it('should return an action to fetch all events', () => {
    expect(actions.getEvents().type).toEqual('GET_EVENTS');
  });
  it('should return an action to fetch a single event', () => {
    const eventId = 4;
    expect(actions.getSingleEvent(eventId).type).toEqual('GET_SINGLE_EVENT');
    expect(actions.getSingleEvent(eventId).eventId).toEqual(4);
  });
  it('should return an action to create an event', () => {
    expect(actions.addEvent().type).toEqual('ADD_EVENT');
  });
  it('should return an action to update an event', () => {
    const event = {};
    expect(actions.editEvent(event).type).toEqual('EDIT_EVENT');
    expect(actions.editEvent(event).event).toEqual({});
  });
  it('should return an action to delete an event', () => {
    const eventId = 5;
    expect(actions.deleteEvent(eventId).type).toEqual('DELETE_EVENT');
    expect(actions.deleteEvent(eventId).eventId).toEqual(5);
  });
}); // Event actions
