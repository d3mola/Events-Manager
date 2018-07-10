import React from 'react';
import { shallow } from 'enzyme';
import CenterListComponent from '../../../components/presentationals/CenterListComponent'; //eslint-disable-line

describe('CenterListComponent', () => {
  const props = {
    centers: [{
      id: 1,
      name: 'first center'
    }, {
      id: 2,
      name: 'second center'
    }, {
      id: 3,
      name: 'third center'
    }
    ],
    match: {},
    isFetching: false
  };

  it('renders succesfully', () => {
    const wrapper = shallow(<CenterListComponent {...props} />);
    expect(wrapper).toBeDefined;
    expect(wrapper.find('.fill-viewport').exists()).toBeFalsy;
  });

  it('renders a list of centers', () => {
    const wrapper = shallow(<CenterListComponent {...props} />);
    expect(wrapper.find('div.center-list').length).toBe(3);
  });

  it('renders loading indicator if it is still fetching centers', () => {
    const alteredProps = { ...props, isFetching: true };
    const wrapper = shallow(<CenterListComponent {...alteredProps} />);
    expect(wrapper.find('div.center-list').length).toBe(0);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('renders a "no centers component" if there are no centers', () => {
    const alteredProps = { ...props, centers: [] };
    const wrapper = shallow(<CenterListComponent {...alteredProps} />);
    expect(wrapper.find('div.center-list').length).toBe(0);
    expect(wrapper.find('h3').exists()).toBeTruthy();
  });
});
