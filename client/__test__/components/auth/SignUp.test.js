import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import initialState from '../../../reducers/initialState';

import ConnectedSignUp, { SignUp } from '../../../components/auth/SignUp';

const mockStore = configureStore();

let wrapper;
let store;
let props;

describe('Sign up Component', () => {
  beforeEach(() => {
    props = {
      isLoading: false,
      signUp: jest.fn(),
      token: 'token'
    };

    wrapper = shallow(<SignUp {...props} />);

  });

  it('should render successfully', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render a Loading indicator when submitting payload', () => {
    wrapper = shallow(<SignUp {...props} isLoading={true} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('should call handleChange when the input is changed', () => {
    const spy = sinon.spy(SignUp.prototype, 'handleChange');
    wrapper = shallow(<SignUp {...props} />);
    wrapper
      .find('input')
      .first()
      .simulate('change', {
        target: { name: 'email', value: 'thanos@test.com' }
      });
    expect(spy.called).toBeTruthy();
    spy.restore();
  });

  it('should call handleSubmit when the input is changed', () => {
    const spy = sinon.spy(SignUp.prototype, 'handleSubmit');
    wrapper = shallow(<SignUp {...props} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => null });
    expect(spy.called).toBeTruthy();
    spy.restore();
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedSignUp store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
