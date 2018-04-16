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
    // console.log('66666666666', initialState.centersReducer.centers)
    return initialState.centersReducer.centers = centers
  });

  // afterEach(() => {
  //   return initialState.centersReducer.centers = []
  // })
  it('should return the initial state', () => {
    expect(centersReducer(initialState.centersReducer, {})).toEqual(
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
    action = { type: types.GET_CENTERS_FAILURE, error };
    newState = centersReducer(initialState.centersReducer, action);
    expect(newState.centers.length).toBe(2);
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
    expect(recievedState.centers).toEqual([...centers]);
    expect(recievedState.centers.length).toEqual(2);
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
      { type: types.GET_SINGLE_CENTER_SUCCESS }
    );
    expect(recievedState.selectedCenter).toEqual(firstCenter);
    expect(recievedState.isFetching).toEqual(false);
  });
  it('should handle DELETE_CENTER', () => {});
  it('should handle DELETE_CENTER_SUCCESS', () => {});
  it('should handle DELETE_CENTER_FAILURE', () => {});
  it('should handle EDIT_CENTER', () => {});
  it('should handle EDIT_CENTER_FAILURE', () => {});
  it('should handle EDIT_CENTER_SUCCESS', () => {});
});
