import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import initialState from '../../../reducers/initialState';

import ConnectedAddEvent, { AddEvent }
  from '../../../components/forms/AddEvent';

const mockStore = configureStore();

let wrapper;
let store;
let props;

describe('AddEvent Component', () => {
  beforeEach(() => {
    props = {
      addEvent: jest.fn(),
      getCenters: jest.fn(),
      addingEvent: false,
      centers: [
        { name: 'first', id: 1 },
        { name: 'first', id: 1 }
      ],
      error: null,
    }

    wrapper = shallow(<AddEvent {...props}/>);
  })


  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a Loading indicator when submitting payload', () => {
    wrapper = shallow(<AddEvent {...props} addingEvent={true} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('should call handleChange when the input is changed', () => {
    sinon.spy(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(
      { target: { name: 'title', value: 'first event' } }
    );

    expect(wrapper.instance().handleChange.calledOnce).toEqual(true);
    expect(wrapper.state().data.title).toBe('first event');
  });

  it('should call AddEvent when handleSubmit is called', () => {
    const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
    const event = {
      target: { name: 'title', value: 'dummy event' }
    }
    event.preventDefault = jest.fn();
    
    wrapper.instance().handleSubmit(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().data.title).toEqual('');
  });


});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedAddEvent store={store}/>);
    expect(wrapper.length).toEqual(1);
  });
});
