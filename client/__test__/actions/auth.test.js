import * as actions from '../../actions/actionCreators';

describe('Auth Actions', () => {
  it('should create an action to sign up', () => {
    const payload = {
      username: 'demo1',
      email: 'demo1@gmail.com',
      password: 'password',
      confirmPassword: 'password'
    };
    expect(actions.signUp(payload).type).toEqual('SIGN_UP');
    expect(actions.signUp(payload).payload.username).toEqual('demo1');
    expect(actions.signUp(payload).payload.email).toEqual('demo1@gmail.com');
    expect(actions.signUp(payload).payload.password).toEqual('password');
    expect(actions.signUp(payload).payload.confirmPassword).toEqual('password');
  });

  it('should create an action to log in', () => {
    const payload = {
      email: 'test@test.com',
      password: 'password'
    };
    expect(actions.signIn(payload).type).toEqual('SIGN_IN');
    expect(actions.signIn(payload).payload.email).toEqual('test@test.com');
    expect(actions.signIn(payload).payload.password).toEqual('password');
  });

  it('should create an action to logout', () => {
    expect(actions.logout().type).toEqual('LOG_OUT');
  });
}); // Auth actions
