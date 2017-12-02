import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Header from './SignupHeader';
import '../static/scss/main.scss';

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
      password: '',
    };
  }// constructor


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
    console.log(this.state)
  }// handleSubmit

  /**
   * 
   * @param {any} e 
   * @memberof SignIn
   * @returns {function} null
   */
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.signIn(this.state);
  }// handleSubmit

/**
 * renders signUpForm component
 * @returns rendered component
 * @memberof SignIn
 * @returns {object} signin
 */
 render() {
   return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-6 mx-auto">
            <form id="form-box" className="jumbotron" action="" method="post" onSubmit={this.handleSubmit}>
              <h2 className="text-center">Sign In!</h2>

              <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input className="form-control" type="email" name="email" id="email" placeholder="johndoe@email.com" onChange={this.handleChange} />
              </div>

              <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input className="form-control" type="password" name="password" id="password" placeholder="Enter your password" onChange={this.handleChange} />                  
              </div>
              <input className="btn btn-outline-success" type="submit" value="Sign in" />
              <br />
              <p className="text-center">Don't have an account yet? <Link href to={"/signup"}>Register</Link></p>
            </form>
        </div>
      </div>
    </div>

   );
 }
}

/**
 * @param {any} state 
 * @returns {object} actions
 */
const mapStateToProps = (state => {
  return {
    signinReducer: state.SignIn,
  };
})

/**
 * @param {any} dispatch 
 * @returns {object} actions
 */
const mapDispatchToProps = (dispatch => {
  return bindActionCreators(actionCreators, dispatch);
});

const signinReducer = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default signinReducer;