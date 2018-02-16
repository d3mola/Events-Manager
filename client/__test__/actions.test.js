import * as actions from '../actions/actionCreators';
import * as types from '../actions/actionTypes';

describe('Actions', () => {
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
  }); // Auth actions
  describe('Center Actions', () => {
    it('should create an action to get all centers');
    it('should create an action to get a single center');
    it('should create an action to create a center');
    it('should create an action to update a center');
    it('should create an action to delete a center');
  });
});
