import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ConnectedHeader, { Header } from '../../../components/commons/Header';
import Logout from '../../../components/auth/LogoutButton';
import initialState from '../../../reducers/initialState';

const mockStore = configureStore();

let props;
let links = {};

localStorage.setItem('token', 'headerToken');
let token = localStorage.getItem('token');

let tokenHasExpired = () => false;

tokenHasExpired = jest.fn();
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};

props = {
  links: {
    centers: 'centers',
    events: 'events'
  },
  token: 'headerToken'
};

describe('Loading component', () => {
  beforeEach(() => {});

  it('should successfully render the component', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toBeDefined;
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('should render Logout component if user is logged in', () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({user: 'demola'});
    expect(wrapper.find('p').exists()).toBeTruthy();
    expect(wrapper.find(Logout).exists()).toBeTruthy();
  });
});

describe('Header Container', () => {
  it('should render connected component', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedHeader store={store} {...props}/>);
    expect(wrapper.length).toEqual(1);
  });
});
