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
// console.log('**', token)
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};

const mockStore = configureStore();
// let wrapper;

/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mounted
 */
// const getComponent = () => {
//   if (!mountedComponent) {
//     props = {
//       links,
//       token
//     };
//     history.push = jest.fn();
//     mountedComponent = shallow(<Header {...props} />);
//   }
//   console.log('_____', token)
//   return mountedComponent;
// };

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
    // wrapper = getComponent();
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toBeDefined;
    expect(wrapper.find('div').exists()).toBeTruthy();
  });
});