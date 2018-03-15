import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';
import centersReducer from '../../reducers/centersReducer';
import initialState from '../../reducers/initialState';

let action, newState;
const centers = ['First Hall', 'Second Hall'];
const center = 'Extra center';
const error = 'this is an error';

describe('Centers Reducers', () => {
  it('should return the initial state', () => {
    expect(centersReducer(initialState.centersReducer, {})).toEqual(
      initialState.centersReducer
    );
  });
  it('should handle GET_CENTERS', () => {
    action = { type: types.GET_CENTERS };
    newState = centersReducer(initialState.centersReducer, action);
    // check other methods of comparson in jext eg toBe
    expect(newState.centers.length).toEqual(0);
    expect(newState.isFetching).toEqual(true);
  });
  it('should handle GET_CENTERS_SUCCESS', () => {
    action = { type: types.GET_CENTERS_SUCCESS, centers };
    newState = centersReducer(initialState.centersReducer, action);
    expect(newState.centers).toEqual(centers);
    expect(newState.isFetching).toEqual(false);
  });
  it('should handle GET_CENTERS_FAILURE', () => {
    action = { type: types.GET_CENTERS_FAILURE, error };
    newState = centersReducer(initialState.centersReducer, action);
    expect(newState.centers.length).toEqual(0);
    expect(newState.isFetching).toEqual(false);
  });
  it('should handle ADD_CENTER_SUCCESS', () => {
    action = { type: types.ADD_CENTER_SUCCESS, center };
    newState = centersReducer(initialState.centersReducer, action);
    console.log('................', newState);
    expect(newState.isFetching).toEqual(false);
    expect(newState.center).toEqual(center);
    expect(newState.centers).toEqual([center]);
    expect(newState.centers.length).toEqual(1);
  });
  it('should handle ADD_CENTER_FAILED', () => {});
  it('should handle GET_SINGLE_CENTER_SUCCESS', () => {});
  it('should handle DELETE_CENTER_SUCCESS', () => {});
  it('should handle DELETE_CENTER_FAILURE', () => {});
  it('should handle EDIT_CENTER_SUCCESS', () => {});
  it('should handle EDIT_CENTER_FAILURE', () => {});
});
