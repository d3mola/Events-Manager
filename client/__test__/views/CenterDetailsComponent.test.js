import React from 'react';
import { shallow } from 'enzyme';
import CenterDetailsComponent from '../../views/CenterDetailsComponent';

describe(' Center Details Component', () => {
  const birthday = {
      title: 'birthday',
      description: 'Guess who turns 26',
      centerId: 1,
      date: '2018/12/1'
    },
    wedding = {
      title: 'wedding',
      description: 'DeDe 2018',
      centerId: 1,
      date: '2018/12/2'
    },
    convocation = {
      title: 'convocation',
      description: 'I graduated!',
      centerId: 1,
      date: '2018/12/3'
    };

  const props = {
    selectedCenter: {
      events: [birthday, wedding, convocation],
      name: 'Adesoye Hall',
      location: 'Ogun State',
      price: 278374,
      capacity: 8563
    },
    handleDelete: jest.fn(),
    match: {
      url: 'someUrl',
      params: {
        id: 1
      }
    }
  };

  it('renders', () => {
    const wrapper = shallow(<CenterDetailsComponent {...props} />);
    expect(wrapper.find('div.container').exists()).toBeTruthy();
    expect(wrapper).toBeDefined();
  });
  it('renders a loading indicator while processing data', () => {
    const alteredProps = { ...props, selectedCenter: null };
    // const wrapper = shallow(<CenterDetailsComponent />);
    const wrapper = shallow(<CenterDetailsComponent {...alteredProps} />);
    expect(wrapper.find('div').exists()).toBeFalsy();
    expect(wrapper.children.length).toBe(1);
    expect(wrapper.find('div.container').exists()).toBeFalsy();
  });
  it('calls the handleDelete function prop when button is clicked', () => {
    const wrapper = shallow(<CenterDetailsComponent {...props} />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.handleDelete).toHaveBeenCalled();
  });
  it('renders a list of events if events exist', () => {
    const wrapper = shallow(<CenterDetailsComponent {...props} />);
    expect(wrapper.find('ul').exists()).toBeTruthy();
  });
  it('renders a p tag if center no event exists');
  const alteredProps = {
    ...props,
    selectedCenter: {
      events: []
    }
  };
  const wrapper = shallow(<CenterDetailsComponent {...alteredProps} />);
  // console.log({ ...props, selectedCenter: null }, '<<<<<<<<<<<<<<<<<');
  expect(wrapper.find('ul').exists()).toBeFalsy();
  expect(wrapper.find('p').exists()).toBeTruthy();
});
