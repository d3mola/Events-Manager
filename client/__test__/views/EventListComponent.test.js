import React from 'react';
import { shallow } from 'enzyme';
import EventListComponent from '../../views/EventListComponent';

describe('EventListComponent', () => {
  const props = {
    events: [
      {
        id: 1,
        title: 'Wedding',
        notes: 'Ogun State',
        centerId: 2
      },
      {
        id: 2,
        title: 'Convocation',
        notes: 'Lagos State',
        centerId: 2
      },
      {
        id: 3,
        title: 'Birthday',
        notes: 'Oyo State',
        centerId: 2
      }
    ],
    match: {},
    isFetching: false,
    error: ''
  };

  it('renders succesfully', () => {
    const wrapper = shallow(<EventListComponent {...props} />);
    expect(wrapper).toBeDefined();
  });
  it('renders a list of centers', () => {
    const wrapper = shallow(<EventListComponent {...props} />);
    expect(wrapper.find('EventComponent').length).toBe(3);
  });
  it('renders loading indicator if it is still fetching centers', () => {
    const alteredProps = { ...props, isFetching: true };
    const wrapper = shallow(<EventListComponent {...alteredProps} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });
  it('renders a "no centers component" if there are no centers', () => {
    const alteredProps = { ...props, events: [] };
    const wrapper = shallow(<EventListComponent {...alteredProps} />);
    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.find('Link').exists()).toBeTruthy();
  });
});
