import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

describe('Index', () => {
  const wrapper = shallow(<App />);
  it('successfully rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

