import React from 'react';
import { shallow } from 'enzyme';
import EventDetailsComponent from '../../views/EventDetailsComponent';

describe(' Center Details Component', () => {

  const props = {
    currentEvent: {
      id: 1,
      title: 'Wedding',
      notes: 'Ogun State',
      centerId: 2,
    },
    handleDelete: jest.fn(),
    match: {
      url: 'someUrl',
      params: {
        id: 1
      }
    },
    isFetching: false
  };

  it('renders', () => {
    const wrapper = shallow(<EventDetailsComponent {...props} />);
    expect(wrapper.find('div.container').exists()).toBeTruthy();
    expect(wrapper).toBeDefined();
  });
  it('renders a loading indicator while processing data', () => {
    const alteredProps = { ...props, isFetching: true};
    const wrapper = shallow(<EventDetailsComponent {...alteredProps} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
    expect(wrapper.children.length).toBe(1);
    expect(wrapper.find('div.container').exists()).toBeFalsy();
  });
  it('calls the handleDelete function when button is clicked', () => {
    const wrapper = shallow(<EventDetailsComponent {...props} />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.handleDelete).toHaveBeenCalled();
  });
  it('renders a p tag if center no event exists');
  const alteredProps = {
    ...props,
    currentEvent: null
  };
  const wrapper = shallow(<EventDetailsComponent {...alteredProps} />);
  expect(wrapper.find('.container').exists()).toBeFalsy();
  expect(wrapper.find('p').exists()).toBeTruthy();
});
