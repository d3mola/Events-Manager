import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory'
import CenterComponent from '../../../components/presentationals/CenterComponent'; //eslint-disable-line

let props;
let wrapper;
const getDetails = jest.fn();
// const history = {push: jest.fn()};
const history = createHistory();
history.push = jest.fn;

describe('Center Component', () => {
    beforeEach(() => {
      props = {
        center: {
          id: 1,
          name: 'First center',
          location: 'Lagos',
          capactiy: 100,
          price: 1000
        },
        match: {
          url: '/centers'
        }
      };

      wrapper = shallow(<CenterComponent {...props} />);
    });
    
    it('renders', () => {
      // const wrapper = shallow(<CenterComponent {...props} />);
      expect(wrapper.find('.card').exists()).toBeTruthy();
      expect(wrapper.find('.card').length).toBe(1);
      expect(wrapper.find('.card-text').length).toBeTruthy();
      expect(wrapper.find('.card-text').length).toBe(4);
    });
    
    it('calls the getDetals function when card is clicked', () => {
    getDetails();
    history.push('/')
    wrapper
      .find('div')
      .first()
      .simulate('click')
    // expect(history.push).toHaveBeenCalledTimes(1);
    expect(getDetails).toHaveBeenCalledTimes(1);
  });
});
