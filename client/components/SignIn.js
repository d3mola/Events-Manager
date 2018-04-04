import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';

import { signIn, sendFlashMessage } from '../actions/actionCreators';
// import FlashMessage from './FlashMessage';
// import UserAction from "./UserAction";

/**
 * @description Creates SignIn component
 * @class SignIn
 * @extends {React.Component}
 */
class SignIn extends React.Component {
  /**
   * Creates an instance of SignIn.
   * @param {any} props
   * @memberof SignIn
   */
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //setting the initial state of the component
    this.state = {
      email: '',
      password: ''
    };
  } // constructor

  /**
   *
   * @param {any} e
   * @memberof SignIn
   * @returns {function} null
   */
  handleChange(e) {
    // set the next state of the form
    this.setState({
      [e.target.name]: e.target.value
    });
  } // handleSubmit

  /**
   *
   * @param {any} e
   * @memberof SignIn
   * @returns {function} null
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.state);
  } // handleSubmit

  /**
   * renders signUpForm component
   * @returns rendered component
   * @memberof SignIn
   * @returns {object} signin
   */
  render() {
    const { isLoading } = this.props;
    const loadingIndicator = isLoading ? (
      // <Loader type="TailSpin" color="#5cb85c" height="50" width="50" />
      <Loading />
    ) : null;
    return (
      <div className="login-page">
        <Header
          links={{ centers: 'centers', events: 'events', register: 'register' }}
        />
        {/* <FlashMessage /> */}
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form
                id="form-box"
                className="jumbotron"
                action=""
                method="post"
                onSubmit={this.handleSubmit}
              >
                <h2 className="text-center">Sign In!</h2>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="johndoe@email.com"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                  />
                </div>
                {loadingIndicator}
                {/* <div className="text-center">{loadingIndicator}</div> */}
                {/* {isLoading ? <h1>loading...dan..</h1> : <h1>empty...dan..</h1>} */}
                <input
                  className="btn btn-outline-success"
                  type="submit"
                  value="Sign in"
                />
                <br />
                <p className="text-center">
                  Dont have an account yet? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
            {/* <hr/> */}
            {/* <UserAction /> */}
          </div>
        </div>
        <hr />
        <Footer />
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  sendFlashMessage: PropTypes.func,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { authReducer } = state;
  // console.log('mapSTP------', authReducer);
  return {
    isLoading: authReducer.isLoading
  };
};

export default connect(mapStateToProps, { signIn, sendFlashMessage })(SignIn);
