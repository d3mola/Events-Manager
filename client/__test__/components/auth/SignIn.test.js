import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import initialState from '../../../reducers/initialState';

import ConnectedSignIn, { SignIn } from '../../../components/auth/SignIn';

const mockStore = configureStore();

let wrapper;
let store;
let props;

describe('Sign in Component', () => {
  beforeEach(() => {
    props = {
      isLoading: false,
      signIn: jest.fn(),
      token: 'token'
    }

    wrapper = shallow(<SignIn {...props}/>);
  });

  it('should render successfully', () => {
    expect(wrapper.length).toEqual(1);
  });
  
  it('should render a Loading indicator when submitting payload', () => {
    wrapper = shallow(<SignIn {...props} isLoading={true} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  it('should call handleChange when the input is changed', () => {
    const spy = sinon.spy(SignIn.prototype, 'handleChange');
    wrapper = shallow(<SignIn {...props}/>);
    wrapper
      .find('input')
      .first()
      .simulate('change',
      { target: {name: 'email', value: 'demola@test.com'} })
    expect(spy.called).toBeTruthy();
    expect(wrapper.state().email).toEqual('demola@test.com');
    spy.restore()
  });

  it('should call handleSubmit when the input is changed', () => {
    const spy = sinon.spy(SignIn.prototype, 'handleSubmit');
    wrapper = shallow(<SignIn {...props}/>);
    wrapper
      .find('form')
      .simulate('submit', { preventDefault: () => null });
    expect(spy.calledOnce).toBeTruthy();
    spy.restore()
  });
});

describe('Connected Component', () => {
  it('should render the connected component with all props', () => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedSignIn store={store}/>);
    expect(wrapper.length).toEqual(1);
  });
});