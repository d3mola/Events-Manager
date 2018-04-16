import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';
import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';

let action, newState, expectedState;
const payload = { username: 'demola', password: 123456 };
describe('Auth Reducers', () => {
  it('should return the initial state', () => {
    action = {};
    expectedState = {
      isLoading: false,
      isAuthenticated: false,
      token: null,
      error: null
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  it('should handle SIGN_IN', () => {
    action = actions.signIn(payload);
    newState = authReducer(initialState.authReducer, action);
    expectedState = {
      isLoading: true,
      isAuthenticated: false,
      token: null,
      error: null
    };
    expect(newState).toEqual(expectedState);
  });
  it('should handle SIGN_IN_SUCCESS', () => {
    localStorage.setItem('token', 'randomToken');
    let token = localStorage.getItem('token');
    action = {
      type: types.SIGN_IN_SUCCESS,
      token
      // response: { message: 'login successful' },
      // isAuthenticated: true
    };
    newState = authReducer(initialState.authReducer, action);
    // newState = authReducer(initialState.authReducer, types.SIGN_IN_SUCCESS);
    // expectedState = { isLoading: false, isAuthenticated: true };
    // expect(newState.isAuthenticated).toEqual(true);
    // expect(newState.response).toEqual("login successful");
    expect(newState.isLoading).toEqual(false);
    expect(newState.token).toEqual(localStorage.getItem('token'));
    expect(newState.error).toEqual(null);
  });
  it('should handle SIGN_IN_FAILURE', () => {
    action = {
      type: types.SIGN_IN_FAILURE,
      error: 'login unsuccessful'
    };
    // const wrongPassword = {...payload, password: 12345678}
    newState = authReducer(initialState.authReducer, action);
    expectedState = {
      isLoading: false,
      isAuthenticated: false,
      token: null,
      error: 'login unsuccessful'
    };
    expect(newState).toEqual(expectedState);
  });
  it('should handle LOG_OUT', () => {
    action = {
      type: types.LOG_OUT_SUCCESS,
      isAuthenticated: false,
      token: null
    };
    newState = authReducer(initialState.authReducer, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.token).toEqual(null);
  });
});
