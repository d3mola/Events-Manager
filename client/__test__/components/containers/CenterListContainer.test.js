import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Connected, { CenterListContainer }
  from '../../../components/containers/CenterListContainer';
import initialState from '../../../reducers/initialState';

let wrapper;
let props;
const mockStore = configureStore();
let store;

describe('CenterListContainer Component', () => {
  beforeEach(() => {
    props = {
      centers: [
        {
          id: 1,
          name: 'first center'
        }, {
          id: 2,
          name: 'second center'
        }, {
          id: 3,
          name: 'third center'
        }
      ],
      getSingleEvent: jest.fn(),
      deleteEvent: jest.fn(),
      match: {url: '/events', params: 1},
      isFetching: false,
      error: null,
      paginationData: {count: 2, page: 1},
      isAdmin: 'true',
      getCenters: jest.fn(),
      searchCenters: jest.fn(),
    }

    wrapper = shallow(<CenterListContainer {...props}/>);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should call getCenters when onPageChange is called', () => {
    wrapper.instance().onPageChange();
    expect(props.getCenters).toHaveBeenCalledTimes(2);
  });

  it('should call getCenter when the page is changed', () => {
    wrapper.instance().onShowSizeChange();
    expect(props.getCenters).toHaveBeenCalledTimes(2);
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<Connected store={store} {...props}/>);
    expect(wrapper.length).toEqual(1);    
  });
});

