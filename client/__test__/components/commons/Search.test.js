import React from 'react';
import { shallow } from 'enzyme';

import Search from '../../../components/commons/Search';

let wrapper;
let props;
let event = {
  target: { query: '' }
};


describe('Search Component', () => {
  beforeEach(() => {
    props = {
      onclearFlashMessage: jest.fn(),
      onSearch: jest.fn(),
      getCenters: jest.fn()
    }

    wrapper = shallow(<Search {...props}/>);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should call handleChange', () => {
    event = {
      target: {
        name: 'query',
        value: 'l'
      }
    }
    wrapper.instance().handleChange(event);
    expect(props.getCenters).toHaveBeenCalledTimes(0);
    expect(wrapper.state().query).toBe('l');
  });

  it('should go back to initial state when input is cleared', () => {
    event = {
      target: {
        name: 'query',
        value: 'london'
      }
    }
    wrapper.instance().handleChange(event);
    expect(props.getCenters).toHaveBeenCalledTimes(0);
    expect(wrapper.state().query).toBe('london');
    wrapper.find('input').first().simulate('change', {target:{ value: ''}})
    expect(wrapper.state().query).toBe('');
    expect(props.getCenters).toHaveBeenCalledTimes(1);

  });

  it('should call handleSearch', () => {
    event = {
      target: {
        name: 'query',
        value: ''
      }
    }
    event.preventDefault = jest.fn();
    wrapper.instance().handleSearch(event);
    expect(props.onSearch).toHaveBeenCalledTimes(1);
  });
});
