import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';
import centersReducer from '../../reducers/centersReducer';
import initialState from '../../reducers/initialState';

let action, newState, recievedState;
const firstCenter = {
  centerId: 1,
  name: 'First Center',
  location: 'Ibadan',
  capacity: 1000,
  price: 10000
}
const secondCenter = {
  centerId: 2,
  name: 'Second Center',
  location: 'Lagos',
  capacity: 2000,
  price: 20000
}
const newCenter = {
  centerId: 3,
  name: 'New Center',
  location: 'Kano',
  capacity: 3000,
  price: 30000
}
const centers = [firstCenter, secondCenter];
const error = 'this is an error';

describe('Centers Reducers', () => {
  beforeEach(() => {
    return initialState.centersReducer.centers = centers
  });

  it('should return the initial state', () => {
    expect(centersReducer(initialState.centersReducer, {})).toEqual(
      initialState.centersReducer
    );
  });

  it('should return the initial state', () => {
    expect(centersReducer(undefined, {})).toEqual(
      initialState.centersReducer
    );
  });

  it('should handle GET_CENTERS', () => {
    action = { type: types.GET_CENTERS };
    recievedState = centersReducer(initialState.centersReducer, action);
    expect(recievedState.isFetching).toEqual(true);
    expect(recievedState.centers.length).toBe(2)
  });

  it('should handle GET_CENTERS_SUCCESS', () => {
    action = { type: types.GET_CENTERS_SUCCESS, centers };
    newState = centersReducer(initialState.centersReducer, action);
    expect(newState.centers).toEqual(centers);
    expect(newState.centers.length).toBe(2);
    expect(newState.isFetching).toEqual(false);
  });

  it('should handle GET_CENTERS_FAILURE', () => {
    action = { type: types.GET_CENTERS_FAILURE, error: 'failed' };
    newState = centersReducer(initialState.centersReducer, action);
    expect(newState.error).toEqual('failed');
    expect(newState.isFetching).toEqual(false);
  });

  it('should handle ADD_CENTER', () => {
    initialState.centersReducer.centers = centers;
    action = { type: types.ADD_CENTER, newCenter };
    recievedState = centersReducer(initialState.centersReducer, action);
    expect(recievedState.addingCenter).toEqual(true);
    expect(recievedState.centers.length).toEqual(2);
  });

  it('should handle ADD_CENTER_SUCCESS', () => {
    action = { type: types.ADD_CENTER_SUCCESS, center: newCenter };
    newState = centersReducer(initialState.centersReducer, action);
    expect(newState.isFetching).toEqual(false);
    expect(newState.center).toEqual(newCenter);
    expect(newState.centers).toEqual([...centers, newCenter]);
    expect(newState.centers.length).toEqual(3);
    expect(newState.addingCenter).toEqual(false);
  });

  it('should handle ADD_CENTER_FAILURE', () => {
    action = { type: types.ADD_CENTER_FAILURE, error };
    recievedState = centersReducer(initialState.centersReducer, action);
    expect(recievedState.addingCenter).toEqual(false);
    expect(recievedState.center).toEqual(undefined);
    expect(recievedState.error).toEqual('this is an error');
  });

  it('should handle GET_SINGLE_CENTER', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      actions.fetchSingleCenter(1)
    );
    expect(recievedState.selectedCenter).toEqual(null);
    expect(recievedState.isFetching).toEqual(true);
  });

  it('should handle GET_SINGLE_CENTER_SUCCESS', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.GET_SINGLE_CENTER_SUCCESS, center: firstCenter }
    );
    expect(recievedState.selectedCenter).toEqual(firstCenter);
    expect(recievedState.isFetching).toEqual(false);
  });

  it('should handle GET_SINGLE_CENTER_FAILURE', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.GET_SINGLE_CENTER_FAILURE, error: 'Could not fetch center' }
    );
    expect(recievedState.selectedCenter).toEqual({});
    expect(recievedState.isFetching).toEqual(false);
    expect(recievedState.error).toEqual('Could not fetch center');
  });

  it('should handle DELETE_CENTER', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.DELETE_CENTER, centerId: firstCenter.centerId }
    );
    expect(recievedState.centers).toEqual([ ...centers ]);
    expect(recievedState.centers.length).toEqual(2);
  });

  it('should handle DELETE_CENTER_SUCCESS', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.DELETE_CENTER_SUCCESS, message: 'Center deleted' }
    );
    expect(recievedState.centers.length).toEqual(2);
    expect(recievedState.message).toEqual('Center deleted');
  });

  it('should handle DELETE_CENTER_FAILURE', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.DELETE_CENTER_FAILURE, error: 'Unsuccessful' }
    );
    expect(recievedState.centers).toEqual([ ...centers ]);
    expect(recievedState.centers.length).toEqual(2);
    expect(recievedState.error).toEqual('Unsuccessful');
  });

  it('should handle EDIT_CENTER', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.EDIT_CENTER, center: firstCenter }
    );
    expect(recievedState.centers).toEqual([ ...centers ]);
    expect(recievedState.centers.length).toEqual(2);
    expect(recievedState.editingCenter).toEqual(true);
  });

  it('should handle EDIT_CENTER_SUCCESS', () => {
    recievedState = centersReducer(
      initialState.centersReducer, {
        type: types.EDIT_CENTER_SUCCESS,
        response: {
          updatedCenter: { name: 'updated center' }
      } }
    );
    expect(recievedState.centers).toEqual([ ...centers ]);
    expect(recievedState.centers.length).toEqual(2);
    expect(recievedState.updatedCenter.name).toEqual('updated center');
    expect(recievedState.editingCenter).toEqual(false);
  });

  it('should handle EDIT_CENTER_FAILURE', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.EDIT_CENTER_FAILURE, error: 'failed' }
    );
    expect(recievedState.centers).toEqual([ ...centers ]);
    expect(recievedState.editingCenter).toEqual(false);
    expect(recievedState.error).toEqual('failed');
  });

  it('should handle SEARCH_CENTERS', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.SEARCH_CENTERS, payload: firstCenter.location }
    );
    expect(recievedState.centers).toEqual([ ...centers ]);
    expect(recievedState.centers.length).toEqual(2);
    expect(recievedState.isFetching).toEqual(true);
  });

  it('should handle SEARCH_CENTERS_SUCCESS', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.SEARCH_CENTERS_SUCCESS, centers: [firstCenter] }
    );
    expect(recievedState.centers).toEqual([firstCenter]);
    expect(recievedState.centers.length).toEqual(1);
    expect(recievedState.isFetching).toEqual(false);
  });

  it('should handle SEARCH_CENTERS_FAILURE', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.SEARCH_CENTERS_FAILURE, error: 'failed' }
    );
    expect(recievedState.centers).toEqual([ ...centers ]);
    expect(recievedState.isFetching).toEqual(false);
    expect(recievedState.error).toEqual('failed');
  });

  it('should handle CLEAR_FLASH_MESSAGE', () => {
    recievedState = centersReducer(
      initialState.centersReducer,
      { type: types.CLEAR_FLASH_MESSAGE }
    );
    expect(recievedState.error).toEqual(null);
  });
});
