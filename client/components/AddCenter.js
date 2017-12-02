import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Header from './Header';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../template/stylesheet/style.css';


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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //setting the initial state of the component
    this.state = {
      name: '',
      location: '',
      capacity: '',
      price: '',
    };
  }

  /**
   *  get centers as soon as component renders
   * @returns {object} centers
   * @memberof Centers
  */
  componentDidMount(){
    this.props.addCenter();
    this.setState({center: this.props});
  }

 
  /**
   * submit handler
   * @param {any} e 
   * @memberof SignUp
   * @returns {undefined} 
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.state);
  }// handleSubmit

  /**
  * sadd center handler
  * @param {any} e
  * @memberof AddCenter
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
 * @memberof AddCenter
 */
render() {
    return (
      <div className="container">
        <Header />
        <h1>Add a center</h1>
      </div>
    );
  }
}

/**
 * @param {any} state 
 * @returns {object} reducer
 */
const mapStateToProps = (state => {
  return {
    centersReducer: state.addCenter,
  };
})

/**
 * @param {any} dispatch 
 * @returns {object} actions
 */
const mapDispatchToProps = (dispatch => {
  return bindActionCreators(actionCreators, dispatch);
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCenter);
