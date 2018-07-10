import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Connected, { CenterDetailsContainer }
  from '../../../components/containers/CenterDetailsContainer';
import initialState from '../../../reducers/initialState';

let wrapper;
let props;
const mockStore = configureStore();
let store;

describe('CenterDetailsContainer Component', () => {
  beforeEach(() => {
    props = {
      selectedCenter: {
        id: 1,
        name: 'center name',
        location: 'lagos'
      },
      fetchSingleCenter: jest.fn(),
      deleteCenter: jest.fn(),
      match: {url: '/centers', params: 1},
      isFetching: false
    }

    wrapper = shallow(<CenterDetailsContainer {...props}/>);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should call fetchSingleCenter when component mounts', () => {
    expect(props.fetchSingleCenter).toHaveBeenCalledTimes(1);
  });

  it('should call deleteCenter when handleCenterDelete is called', () => {
    wrapper.instance().handleCenterDelete();
    expect(props.deleteCenter).toHaveBeenCalledTimes(1);
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

