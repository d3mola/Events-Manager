import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';

describe('Send flash message', () => {
  it('should return an action to send flash messages', () => {
    const message = 'Log in succesful';
    const className = 'btn-success';
    const expectedAction = {
      type: types.FLASH_MESSAGE,
      payload: {
        message,
        className
      }
    };
    expect(actions.sendFlashMessage(message, className)).toEqual(
      expectedAction
    );
  });
});
