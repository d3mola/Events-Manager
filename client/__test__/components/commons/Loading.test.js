import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../../components/commons/Loading';

describe('Loading component', () => {
  it('renders', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toBeDefined;
    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.find('Loader').exists()).toBeTruthy();
  });
});