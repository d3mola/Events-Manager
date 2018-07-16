import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import initialState from '../../../reducers/initialState';

import ConnectedEditCenterForm, { EditCenterForm }
  from '../../../components/forms/EditCenterForm';

const mockStore = configureStore();

let wrapper;
let store;
let props;

describe('AddEvent Component', () => {
  beforeEach(() => {
    props = {
      selectedCenter: { name: 'selected center', id: 1 },
      fetchSingleCenter: jest.fn(),
      updateCenter: jest.fn(),
      editingCenter: false,
      match: { params: 1 }
    }

    wrapper = shallow(<EditCenterForm {...props}/>);
  })

  
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a Loading indicator when submitting payload', () => {
    wrapper = shallow(<EditCenterForm {...props} editingCenter={true} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('should call handleChange when the input is changed', () => {
    sinon.spy(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(
      { target: { name: 'name', value: 'new cen...' } }
    );

    expect(wrapper.instance().handleChange.calledOnce).toEqual(true);
    expect(wrapper.state().name).toEqual('new cen...');
  });

  it('should call EditCenterForm when handleSubmit is called', () => {
    const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
    const event = {
      target: { name: 'name', value: 'new center' }
    }
    event.preventDefault = jest.fn();
    
    wrapper.instance().handleSubmit(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(props.updateCenter).toHaveBeenCalledTimes(1);
    expect(wrapper.state().name).toEqual('');
  });

  it('should display a message if no center was selected', () => {
    wrapper.setProps({ selectedCenter: null });
    expect(wrapper.find('h1').exists()).toBeTruthy();
  });

  it('should update the form inputs with the data of selected center', () => {
    const spy = sinon.spy(wrapper.instance(), 'componentWillReceiveProps');
    const newProps= {
      selectedCenter: {
        name: 'received props', locations: 'recieved location'
      }
    };
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().name).toEqual('received props');
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedEditCenterForm store={store}/>);
    expect(wrapper.length).toEqual(1);
  });
});
