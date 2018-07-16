import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUp } from '../../actions/actionCreators';
import Header from '../commons/Header';
import Loading from '../commons/Loading';

/**
 * @description Creates SignUpForm component
 * @class SignUpForm
 * @extends {React.Component}
 */
export class SignUp extends React.Component {
  /**
   * Creates an instance of SignUp.
   * @param {any} props
   * @memberof SignUp
   */
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //setting the initial state of the component
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  } // constructor

  /**
   * sign up handler
   * @param {any} e
   * @memberof SignUp
   * @returns {undefined}
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.signUp(this.state);
  } // handleSubmit

  /**
   * change handler
   * @param {any} e
   * @memberof SignUp
   * @returns {Undefined} sets form input values
   */
  handleChange(e) {
    // set the next state of the form
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * renders signUpForm component
   * @returns {undefined} rendered component
   * @memberof SignUp
   */
  render() {
    const { isLoading } = this.props;
    return (
      <div className="register-page">
        { isLoading && <Loading /> }

        <Header
          links={{ centers: 'centers', events: 'events', login: 'login' }}
        />
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
                <h2 className="text-center">Register!</h2>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="johndoe"
                    onChange={this.handleChange}
                  />
                </div>

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

                <div className="form-group">
                  <label htmlFor="confirm-password">Password again:</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    placeholder="Enter your password again"
                    onChange={this.handleChange}
                  />
                </div>
                <input
                  id="register-btn"
                  className="btn btn-success form-buttons"
                  type="submit"
                  value="Register"
                  disabled={isLoading}
                />
                <br />
                <p className="text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isLoading: state.authReducer.isLoading
});

export default connect(mapStateToProps, { signUp })(SignUp);
