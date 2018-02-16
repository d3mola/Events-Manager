import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';

describe('Center Actions', () => {
  it('should create an action to get all centers', () => {
    const expectedAction = { type: types.GET_CENTERS };
    expect(actions.getCenters()).toEqual(expectedAction);
  });
  it('should create an action to get a single center', () => {
    const centerId = 3;
    const expectedAction = {
      type: types.GET_SINGLE_CENTER,
      centerId
    };
    expect(actions.fetchSingleCenter(centerId)).toEqual(expectedAction);
  });
  it('should create an action to create a center', () => {
    const expectedAction = {
      type: types.ADD_CENTER
    };
    expect(actions.addCenter()).toEqual(expectedAction);
  });
  it('should create an action to update a center', () => {
    const center = {};
    const expectedAction = {
      type: types.EDIT_CENTER,
      center
    };
    expect(actions.updateCenter(center)).toEqual(expectedAction);
  });
  it('should create an action to delete a center', () => {
    const centerId = 6;
    const expectedAction = {
      type: types.DELETE_CENTER,
      centerId
    };
    expect(actions.deleteCenter(centerId)).toEqual(expectedAction);
  });
}); // Center actions