import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Connected, { EventListContainer }
  from '../../../components/containers/EventListContainer';
import initialState from '../../../reducers/initialState';

let wrapper;
let props;
const mockStore = configureStore();
let store;

describe('EventListContainer Component', () => {
  beforeEach(() => {
    props = {
      events: [
        {
          id: 1,
          name: 'first event'
        }, {
          id: 2,
          name: 'second event'
        }, {
          id: 3,
          name: 'third event'
        }
      ],
      match: {url: '/events', params: 1},
      isFetching: false,
      error: null,
      paginationData: {count: 2, page: 1},
      getEvents: jest.fn(),
    }

    wrapper = shallow(<EventListContainer {...props}/>);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should call getEvents when onPageChange is called', () => {
    wrapper.instance().onPageChange();
    expect(props.getEvents).toHaveBeenCalledTimes(2);
  });

  it('should call getCenter when the page is changed', () => {
    wrapper.instance().onShowSizeChange();
    expect(props.getEvents).toHaveBeenCalledTimes(2);
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<Connected store={store} {...props}/>);
    expect(wrapper.length).toEqual(1);    
  });
});
