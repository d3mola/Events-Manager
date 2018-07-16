import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';

describe('Clear flash message', () => {
  it('should return an action to that clears error', () => {
    const expectedAction = { type: types.CLEAR_FLASH_MESSAGE };
    expect(actions.clearFlashMessage()).toEqual(
      expectedAction
    );
  });
});
