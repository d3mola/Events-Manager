import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';
import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';

let action, newState, expectedState;
const payload = { username: 'demola', password: 123456 };
const newUser = {
  username: 'thanos',
  email: 'thanos@test.com',
  password: '123456',
  confirmPassword: '123456'
}
describe('Auth Reducers', () => {
  it('should return the initial state', () => {
    action = {};
    expectedState = {
      isLoading: false,
      isAuthenticated: false,
      token: null,
      error: null,
      user: null,
      isAdmin: null
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
      user: null,
      isAdmin: null,
      error: null
    };
    expect(newState.isLoading).toEqual(true);
    expect(newState.token).toEqual(null);
    expect(newState.isAdmin).toEqual(null);
    expect(newState.user).toEqual(null);
  });

  it('should handle SIGN_IN_SUCCESS', () => {
    localStorage.setItem('token', 'randomToken');
    localStorage.setItem('user', payload.username);
    localStorage.setItem('isAdmin', 'false');
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isAdmin = localStorage.getItem('isAdmin');
    action = {
      type: types.SIGN_IN_SUCCESS,
      token,
      user: {
        username: user,
        isAdmin
      }
    };
    newState = authReducer(initialState.authReducer, action);
    expectedState = {
      isLoading: false,
      isAuthenticated: false,
      token: 'randomToken',
      user: 'demola',
      isAdmin: 'false',
      error: null
    }
    expect(newState.token).toEqual('randomToken');
    expect(newState.user).toEqual('demola');
    expect(newState.isAdmin).toEqual('false');
    expect(newState.isLoading).toEqual(false);
  });

  it('should handle SIGN_IN_FAILURE', () => {
    action = {
      type: types.SIGN_IN_FAILURE,
      error: 'login unsuccessful'
    };
    newState = authReducer(initialState.authReducer, action);
    expectedState = {
      isLoading: false,
      isAuthenticated: false,
      token: null,
      isAdmin: null,
      user: null,
      error: 'login unsuccessful'
    };
    expect(newState.error).toEqual('login unsuccessful');
    expect(newState.token).toEqual(null);
    expect(newState.isAdmin).toEqual(null);
    expect(newState.user).toEqual(null);
    expect(newState.isLoading).toEqual(false);
  });

  it('should handle SIGN_UP', () => {
    action = actions.signUp(newUser);
    newState = authReducer(initialState.authReducer, action);
    expectedState = {
      isLoading: true,
      isAuthenticated: false,
      token: null,
      isAdmin: null,
      user: null,
      error: null
    };
    expect(newState.isLoading).toEqual(true);
    expect(newState.isAdmin).toEqual(null);
  });

  it('should handle SIGN_UP_SUCCESS', () => {
    localStorage.setItem('token', 'randomToken');
    action = {
      type: types.SIGN_UP_SUCCESS,
      token: localStorage.getItem('token'),
      user: {
        username: 'thanos',
        isAdmin: 'false'
      }
    };
    newState = authReducer(initialState.authReducer, action);
    expectedState = {
      isLoading: false,
      isAuthenticated: false,
      token: 'randomToken',
      isAdmin: 'false',
      user: 'thanos',
      error: null
    };
    expect(newState.isLoading).toEqual(false);
    expect(newState.token).toEqual('randomToken');
    expect(newState.isAdmin).toEqual('false');
    expect(newState.error).toEqual(null);
  });
  
  it('should handle SIGN_UP_FAILURE', () => {
    action = {
      type: types.SIGN_UP_FAILURE,
      error: 'signup unsuccessful'
    };
    newState = authReducer(initialState.authReducer, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.token).toEqual(null);
    expect(newState.isAdmin).toEqual('false');
    expect(newState.error).toEqual('signup unsuccessful');
  });

  it('should handle LOG_OUT', () => {
    action = {
      type: types.LOG_OUT_SUCCESS,
      isAuthenticated: false,
      token: null,
      user: {
        username: null,
        isAdmin: null
      }
    };
    newState = authReducer(initialState.authReducer, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.token).toEqual(null);
    expect(newState.user.username).toEqual(null);
    expect(newState.user.isAdmin).toEqual(null);
    expect(newState.error).toEqual(null);
  });
});
