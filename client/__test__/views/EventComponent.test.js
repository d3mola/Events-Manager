import React from 'react';
import { shallow } from 'enzyme';
import EventComponent from '../../views/EventComponent';

describe('Center Component', () => {
  it('renders succesfully', () => {
    const props = {
      singleEvent: {
        id: 1,
        title: 'First center',
        description: 'Lagos'
      },
      match: {
        url: 'someUrl'
      }
    }
    const wrapper = shallow(<EventComponent {...props}/>)
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.find('Event').exists()).toBeTruthy();
    expect(wrapper).toBeDefined();
  });
});