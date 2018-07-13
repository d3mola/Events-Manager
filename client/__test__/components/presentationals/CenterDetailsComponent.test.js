import React from 'react';
import { shallow } from 'enzyme';
import CenterDetailsComponent from '../../../components/presentationals/CenterDetailsComponent'; //eslint-disable-line

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
    },
    isFetching: false,
    handleModalOpen: jest.fn(),
    token: 'eyadbeubf.fdhweiu.dfsms.jds',
    isAdmin: 'true'
  };

  it('renders', () => {
    const wrapper = shallow(<CenterDetailsComponent {...props} />);
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper).toBeDefined();
  });

  it('renders a loading indicator while processing data', () => {
    const alteredProps = { ...props, selectedCenter: null };
    const wrapper = shallow(<CenterDetailsComponent {...alteredProps} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
    expect(wrapper.children.length).toBe(1);
    expect(wrapper.find('.card-main').exists()).toBeFalsy();
  });

  it('calls the handleModalOpen function prop when button is clicked', () => {
    const wrapper = shallow(<CenterDetailsComponent {...props} />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.handleModalOpen).toHaveBeenCalledTimes(1);
  });
});
