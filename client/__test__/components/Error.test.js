import React from 'react';
import { shallow } from 'enzyme';
import Error from '../../components/Error';

describe('Error', () => {
  const wrapper = shallow(<Error />);
  it('successfully rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

