import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import initialState from '../../../reducers/initialState';

import ConnectedAddCenter, { AddCenter }
  from '../../../components/forms/AddCenter';

const mockStore = configureStore();

let wrapper;
let store;
let props;

describe('AddCenter Component', () => {
  beforeEach(() => {
    props = {
      addCenter: jest.fn(),
      addingCenter: false
    }

    wrapper = shallow(<AddCenter {...props}/>);
  })


  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a Loading indicator when submitting payload', () => {
    wrapper = shallow(<AddCenter {...props} addingCenter={true} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('should call handleChange when the input is changed', () => {
    const spy = sinon.spy(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(
      {target: { name: 'name', value: 'first center' }}
    );

    expect(wrapper.instance().handleChange.calledOnce).toEqual(true);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().name).toBe('first center');
  });

  it('should call addCenter when handleSubmit is called', () => {
    const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
    const event = {
      target: { name: 'location', value: 'lagos' }
    }
    event.preventDefault = jest.fn();
    
    wrapper.instance().handleSubmit(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().location).toEqual('');
  });


});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedAddCenter store={store}/>);
    expect(wrapper.length).toEqual(1);
  });
});
