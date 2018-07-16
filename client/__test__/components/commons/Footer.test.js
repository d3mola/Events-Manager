import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/commons/Footer';

describe('Footer Component >>> ', () => {
  it('should render', ()  => {
    const wrapper = shallow(<Footer />);
    expect (wrapper).toMatchSnapshot();
  });
});
