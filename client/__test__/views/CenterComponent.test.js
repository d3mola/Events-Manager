import React from 'react';
import { shallow } from 'enzyme';
import CenterComponent from '../../views/CenterComponent';

describe('Center Component', () => {
  it('renders', () => {
    const props = {
      center: {
        id: 1,
        name: 'First center',
        location: 'Lagos',
        capactiy: 100,
        price: 1000
      },
      match: {
        url: 'someUrl'
      }
    }
    const wrapper = shallow(<CenterComponent {...props}/>)
    expect(wrapper.find('.card').exists()).toBeTruthy();
    expect(wrapper.find('.card').length).toBe(1);
    expect(wrapper.find('.card-text').length).toBeTruthy();
    expect(wrapper.find('.card-text').length).toBe(3);
    expect(wrapper.find('.card-header').length).toBeTruthy();
  });
});