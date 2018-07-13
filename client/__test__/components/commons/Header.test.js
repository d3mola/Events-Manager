import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Header } from '../../../components/commons/Header';
import initialState from '../../../reducers/initialState';

let mountedComponent;
let props;
let links = {

};



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

const mockStore = configureStore();

props = {
  links: {
    centers: 'centers',
    events: 'events'
  },
  token
};

describe('Loading component', () => {
  beforeEach(() => {});

  it('should successfully render the component', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toBeDefined;
    expect(wrapper.find('div').exists()).toBeTruthy();
  });
});