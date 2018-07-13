import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Connected, { EventDetailsContainer }
  from '../../../components/containers/EventDetailsContainer';
import initialState from '../../../reducers/initialState';

let wrapper;
let props;
const mockStore = configureStore();
let store;

describe('EventDetailsContainer Component', () => {
  beforeEach(() => {
    props = {
      currentEvent: {
        id: 1,
        name: 'event name'
      },
      getSingleEvent: jest.fn(),
      deleteEvent: jest.fn(),
      match: {url: '/events', params: 1},
      isFetching: false
    }

    wrapper = shallow(<EventDetailsContainer {...props}/>);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should call getSingleEvent when component mounts', () => {
    expect(props.getSingleEvent).toHaveBeenCalledTimes(1);
  });

  it('should call deleteCenter when handleCenterDelete is called', () => {
    wrapper.instance().handleEventDelete();
    expect(props.deleteEvent).toHaveBeenCalledTimes(1);
    expect(wrapper.state().open).toEqual(false);
  });

  it('should call onOpenModal method', () => {
    expect(wrapper.find('div').length).toBe(1);
    wrapper.instance().onOpenModal();
    expect(wrapper.state().open).toEqual(true);
  });

  it('should call onCloseModal method', () => {
    wrapper.instance().onCloseModal();
    expect(wrapper.state().open).toEqual(false);    
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<Connected store={store} {...props}/>);
    expect(wrapper.length).toEqual(1);    
  });
});

