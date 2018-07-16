import * as actions from '../../actions/actionCreators';

describe('Clear flash message', () => {
  it('should return an action to that clears error', () => {
    expect(actions.clearFlashMessage().type).toEqual(
      'CLEAR_FLASH_MESSAGE'
    );
  });
});
