import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';

describe('Event Actions', () => {
  it('should return an action to fetch all events', () => {
    const expectedAction = { type: types.GET_EVENTS };
    expect(actions.getEvents()).toEqual(expectedAction);
  });
  it('should return an action to fetch a single event', () => {
    const eventId = 4;
    const expectedAction = { type: types.GET_SINGLE_EVENT, eventId };
    expect(actions.getSingleEvent(eventId)).toEqual(expectedAction);
  });
  it('should return an action to create an event', () => {
    const expectedAction = { type: types.ADD_EVENT };
    expect(actions.addEvent()).toEqual(expectedAction);
  });
  it('should return an action to update an event', () => {
    const event = {};
    const expectedAction = { type: types.EDIT_EVENT, event };
    expect(actions.editEvent(event)).toEqual(expectedAction);
  });
  it('should return an action to delete an event', () => {
    const eventId = 5;
    const expectedAction = { type: types.DELETE_EVENT, eventId };
    expect(actions.deleteEvent(eventId)).toEqual(expectedAction);
  });
}); // Event actions
