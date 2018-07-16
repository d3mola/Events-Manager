import React from 'react';
import { shallow, mount, render } from 'enzyme';
import configureStore from 'redux-mock-store';
// import { ConnectedRouter as Router } from 'react-router-redux';
import { MemoryRouter } from 'react-router';

import history from '../../../history';
import initialState from '../../../reducers/initialState';

import { AdminRoute } from '../../../components/customRoutes/AdminRoute';

const mockStore = configureStore();

let props, wrapper, newwrapper;
const dispatch = jest.fn();

let component = () => <div></div>;

component = jest.fn();

describe.skip('Admin Route Component', () => {
  beforeEach(() => {
    props = {
      component,
      isAdmin: 'true'
    };

    wrapper = shallow(
      <MemoryRouter>
        <AdminRoute {...props} />
      </MemoryRouter>
    );

    // wrapperRouter = shallow(<Router/>);
    newwrapper = wrapper.dive();
  });

  it('should render Component', () => {
    // expect(newwrapper).toMatchSnapshot();
    // expect(wrapper).toHaveLength(1);
    expect(newwrapper.find('Component').exists()).toBeTruthy();
  });

  it('should not render render Component', () => {
    wrapper.setProps({
      isAdmin: 'false'
    });
    // expect(wrapper).toHaveLength(1);
    expect(newwrapper.find('Component').exists()).toBeFalsy();
  });
});
