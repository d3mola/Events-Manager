import * as actions from '../../actions/actionCreators';

describe('Center Actions', () => {
  it('should create an action to get all centers', () => {
    expect(actions.getCenters().type).toEqual('GET_CENTERS');
  });
  it('should create an action to get a single center', () => {
    const centerId = 3;
    expect(actions.fetchSingleCenter(centerId).type).toEqual('GET_SINGLE_CENTER');
    expect(actions.fetchSingleCenter(centerId).centerId).toEqual(3);
  });
  it('should create an action to create a center', () => {
    expect(actions.addCenter().type).toEqual('ADD_CENTER');
  });
  it('should create an action to update a center', () => {
    const center = {};
    expect(actions.updateCenter(center).type).toEqual('EDIT_CENTER');
    expect(actions.updateCenter(center).center).toEqual({});
  });
  it('should create an action to delete a center', () => {
    const centerId = 6;
    expect(actions.deleteCenter(centerId).type).toEqual('DELETE_CENTER');
    expect(actions.deleteCenter(centerId).centerId).toEqual(6);
  });
  it('should create an action to search for a center', () => {
    const payload = 'lagos';
    expect(actions.searchCenters(payload).type).toEqual('SEARCH_CENTERS');
    expect(actions.searchCenters(payload).payload).toEqual('lagos');
  });
}); // Center actions
