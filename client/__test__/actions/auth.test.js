import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';

describe('Auth Actions', () => {
  it('should create an action to sign up', () => {
    const payload = {
      username: 'demo1',
      email: 'demo1@gmail.com',
      password: 'password'
    };
    const expectedAction = {
      type: types.SIGN_UP,
      payload
    };
    expect(actions.signUp(payload)).toEqual(expectedAction);
  });

  it('should create an action to log in', () => {
    const payload = {
      email: 'test@test.com',
      password: 'password'
    };
    const expectedAction = {
      type: types.SIGN_IN,
      payload
    };
    expect(actions.signIn(payload)).toEqual(expectedAction);
  });

  it('should create an action to logout', () => {
    const expectedAction = { type: types.LOG_OUT };
    expect(actions.logout()).toEqual(expectedAction);
  });
}); // Auth actions
