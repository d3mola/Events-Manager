import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Header from './Header';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../template/stylesheet/style.css';


/**
 * @description Creates AddCenter component
 * @class AddCenter
 * @extends {React.Component}
 */
class AddCenter extends React.Component {

  /**
   * Creates an instance of SignUp.
   * @param {any} props 
   * @memberof SignUp
   */
  constructor(props) {
    super(props);

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    // //setting the initial state of the component
    // this.state = {
    //   name: '',
    //   location: '',
    //   capacity: '',
    //   price: '',
    // };
  }

  /**
   *  get centers as soon as component renders
   * @returns {object} centers
   * @memberof Centers
  */
  // componentDidMount(){
  //   this.props.addCenter();
  //   this.setState({center: this.props});
  // }

 
  /**
   * submit handler
   * @param {any} e 
   * @memberof SignUp
   * @returns {undefined} 
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.addCenter(this.state);
  }// handleSubmit

  /**
  * sadd center handler
  * @param {any} e
  * @memberof AddCenter
  * @returns {Undefined} sets form input values
  */
  // handleChange(e) {
  //   // set the next state of the form
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  //   console.log(this.state)
  // }// handleSubmit

/**
 * renders signUpForm component
 * @returns {undefined} rendered component
 * @memberof AddCenter
 */
render() {
    return (
      <div className="container">
        <Header />
        <h1>Add a center</h1>
        <form id="form-box" action="" method="post">
          <h2 className="text-center">Create A Center!</h2>
          <div className="form-group">
            <label htmlFor="center-name">Name:</label>
            <input className="form-control" type="text" name="center-name" id="center-name" placeholder="Ruby hall" />
          </div>

          <div className="form-group">
            <label htmlFor="center-location">Location:</label>
            <input className="form-control" type="text" name="center-location" id="center-location" placeholder="No 46, Victoria Island Lagos" />
          </div>

          <div className="form-group">
            <label htmlFor="center-capacity">Capacity:</label>
            <input className="form-control" type="text" name="center-capacity" id="center-capacity" placeholder="5000" />
          </div>

          <div className="form-group">
            <label htmlFor="center-price">Price:</label>
            <input className="form-control" type="text" name="center-price" id="center-price" placeholder="100000" />
          </div>
          
          <input className="btn btn-outline-success" type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

/**
 * @param {any} state 
 * @returns {object} reducer
 */
const mapStateToProps = (state) => {
  return {
    addCenter: state.addCenter,
  };
}

/**
 * @param {any} dispatch 
 * @returns {object} actions
 */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCenter);
