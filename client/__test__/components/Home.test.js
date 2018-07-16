import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home';

describe('Home', () => {
  const wrapper = shallow(<Home />);
  it('successfully rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

