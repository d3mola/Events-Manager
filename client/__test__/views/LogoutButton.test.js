import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from '../../views/LogoutButton';
// import {logout} from '../../actions/actionCreators'

describe('Logout Compoonent', () => {
  const props = {
    handleLogout: jest.fn(),
    logout: jest.fn()
  };

  it('renders succesfully', () => {
    const wrapper = shallow(<Logout {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('button').exists()).toBeTruthy();
  });
  it('calls handleLogout function when logout button is clicked', () => {
    const wrapper = shallow(<Logout {...props} />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.logout).toHaveBeenCalled();
  });
});
