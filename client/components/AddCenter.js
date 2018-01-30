import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as actionCreators from '../actions/actionCreators';
import { addCenter } from '../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';

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

    //setting the initial state of the component
    this.state = {
      name: '',
      location: '',
      capacity: '',
      price: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
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
    // console.log('submitting.......');
    // console.log(this.props.addCenter(this.state));
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
    // console.log(this.state)
  }

/**
 * renders signUpForm component
 * @returns {undefined} rendered component
 * @memberof AddCenter
 */
render() {
    return (
      <div className="add-center-page">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
            <form className="jumbotron center-form-box" id="form-box" action="" method="post" onSubmit={this.handleSubmit}>
              <h2 className="text-center">Create A Center!</h2>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input className="form-control" type="text" name="name" id="name" placeholder="Gold hall" onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input className="form-control" type="text" name="location" id="location" placeholder="No 46, Victoria Island Lagos" onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="capacity">Capacity:</label>
                <input className="form-control" type="text" name="capacity" id="capacity" placeholder="5000" onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input className="form-control" type="text" name="price" id="price" placeholder="100000" onChange={this.handleChange} />
              </div>
              
              <input className="btn btn-outline-success" type="submit" value="Create" />
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
 * @param {any} state 
 * @returns {object} reducer
 */
// const mapStateToProps = (state) => {
//   return {
//     //centers: state.center
//   };
// }

/**
 * @param {any} dispatch 
 * @returns {object} actions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    addCenter: (payload) => dispatch(addCenter(payload))
  }
}

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(actionCreators, dispatch);
// }

export default connect(null, mapDispatchToProps)(AddCenter);
