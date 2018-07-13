import React from 'react';
import { shallow } from 'enzyme';
import EventDetailsComponent from '../../../components/presentationals/EventDetailsComponent'; //eslint-disable-line

describe(' Event Details Component', () => {

  const props = {
    currentEvent: {
      id: 1,
      title: 'Wedding',
      notes: 'Ogun State',
      centerId: 2,
    },
    match: {
      url: 'someUrl',
      params: {
        id: 1
      }
    },
    isFetching: false,
    handleModalOpen: jest.fn()
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

  it('calls the handleModalOpen function when button is clicked', () => {
    const wrapper = shallow(<EventDetailsComponent {...props} />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.handleModalOpen).toHaveBeenCalledTimes(1);
  });

  it('renders a message tag if event doesnt exists');
  const alteredProps = {
    ...props,
    currentEvent: null
  };
  const wrapper = shallow(<EventDetailsComponent {...alteredProps} />);
  expect(wrapper.find('.container').exists()).toBeFalsy();
  expect(wrapper.find('h3').exists()).toBeTruthy();
});
