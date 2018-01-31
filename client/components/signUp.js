import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';

/**
 * @description Creates SignUpForm component
 * @class SignUpForm
 * @extends {React.Component}
 */
class SignUp extends React.Component {
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
      confirmPassword: '',
    };
  }// constructor


  /**
   * submit handler
   * @param {any} e 
   * @memberof SignUp
   * @returns {undefined} 
   */
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.signUp(this.state);
  }// handleSubmit

  /**
  * sign up handler
  * @param {any} e
  * @memberof SignUp
  * @returns {Undefined} sets form input values
  */
  handleChange(e) {
    // set the next state of the form
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state)
  }// handleSubmit

  /**
   * renders signUpForm component
   * @returns {undefined} rendered component
   * @memberof SignUp
   */
  render() {
    return (
      <div className="register-page">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form id="form-box" className="jumbotron" action="" method="post" onSubmit={this.handleSubmit}>
                <h2 className="text-center">Register!</h2>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input className="form-control" type="text" name="username" id="username" placeholder="johndoe" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input className="form-control" type="email" name="email" id="email" placeholder="johndoe@email.com" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input className="form-control" type="password" name="password" id="password" placeholder="Enter your password" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">Password again:</label>
                  <input className="form-control" type="password" name="confirm-password" id="confirm-password" placeholder="Enter your password again" onChange={this.handleChange} />
                </div>
                <input className="btn btn-outline-success" type="submit" value="Register" />
                <br />
                <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
              </form>
            </div>
          </div>
        </div><hr/>
        <Footer />
      </div>
    );
  }
}


/**
 * 
 * @param {any} dispatch 
 * @returns {object} actions
 */
const mapDispatchToProps = (dispatch => {
  return bindActionCreators(actionCreators, dispatch);
})

export default connect(null, mapDispatchToProps)(SignUp);
