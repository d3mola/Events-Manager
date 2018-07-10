import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import initialState from '../../../reducers/initialState';

import ConnectedEditEventForm, { EditEventForm }
  from '../../../components/forms/EditEventForm';

const mockStore = configureStore();

let wrapper;
let store;
let props;

describe('AddEvent Component', () => {
  beforeEach(() => {
    props = {
      currentEvent: { name: 'selected center', id: 1 },
      getSingleEvent: jest.fn(),
      editEvent: jest.fn(),
      match: { params: 1 },
      centers: [
        {name: 'first center', id: 1 },
        {name: 'second center', id: 2 }
      ],
      getCenters: jest.fn()
    }

    wrapper = shallow(<EditEventForm {...props}/>);
  })

  
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a Loading indicator when submitting payload', () => {
    const alteredProps = {...props, currentEvent: {}}
    wrapper = shallow(<EditEventForm {...alteredProps} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('should call handleChange when the input is changed', () => {
    sinon.spy(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(
      { target: { name: 'title',  value: 'new eve...' } }
    );
    expect(wrapper.instance().handleChange.calledOnce).toEqual(true);
    expect(wrapper.state().title).toEqual('new eve...');
  });

  it('should call EditEventForm when handleSubmit is called', () => {
    const spy = sinon.spy(wrapper.instance(), 'handleSubmit');
    const event = {
      target: { name: 'title',  value: 'new title' }
    }
    event.preventDefault = jest.fn();
    
    wrapper.instance().handleSubmit(event);
    expect(spy.calledOnce).toBeTruthy();
    expect(props.editEvent).toHaveBeenCalledTimes(1);
    expect(wrapper.state().title).toEqual('');
  });

  it('should update the form inputs with the data of selected center', () => {
    const spy = sinon.spy(wrapper.instance(), 'componentWillReceiveProps');
    const newProps= {
      currentEvent: {
        title: 'received props', notes: 'received notes'
      }
    };
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(spy.calledOnce).toBeTruthy();
    expect(wrapper.state().title).toEqual('received props');
    expect(wrapper.state().notes).toEqual('received notes');
  });


});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedEditEventForm store={store}/>);
    expect(wrapper.length).toEqual(1);
  });
});
