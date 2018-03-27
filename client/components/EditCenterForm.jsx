import React from 'react';

import PropTypes from 'prop-types';
// import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchSingleCenter, updateCenter } from '../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';

/**
 * Edits center details
 * @class AddCenter
 * @extends {React.Component}
 */
class EditCenterForm extends React.Component {
  /**
   * Creates an instance of EditCenterForm.
   * @param {object} props
   * @memberof EditCenterForm
   */
  constructor(props) {
    super(props);

    //sets the initial state of the component
    this.state = {
      name: '',
      location: '',
      capacity: '',
      price: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * renders once the component mounts the DOM
   * @returns {Promise} fetches single center based on the route params
   * @memberof Centers
   */
  componentDidMount() {
    this.props.fetchSingleCenter(this.props.match.params.id);
  }

  /**
   * function called when component receives new props
   * @param {object} newProps
   * @returns {undefined} changes the state based on the newProps received
   */
  componentWillReceiveProps(newProps) {
    this.setState(newProps.selectedCenter);
  }

  /**
   * form submission handler
   * @param {object} event
   * @memberof SignUp
   * @returns {undefined} submits form
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateCenter(this.state);
  }

  /**
   * changes state when form fields are changed
   * @param {any} event
   * @memberof EditCenterForm
   * @returns {undefined} calls setState
   */
  handleChange(event) {
    // set the next state of the form
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * renders signUpForm component
   * @returns {JSX} rendered component
   * @memberof EditCenterForm
   */
  render() {
    const { name, location, price, capacity } = this.state;
    return !this.props.selectedCenter ? (
      <h1>select a center to edit</h1>
    ) : (
      <div className="">
        <Header
          links={{ centers: 'centers', events: 'events', logout: 'logout' }}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form
                className="jumbotron edit-center-form mt-5"
                id="form-box"
                action=""
                method="post"
                onSubmit={this.handleSubmit}
              >
                <h2 className="text-center mb-4">EDIT CENTER</h2>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Gold hall"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="location"
                    id="location"
                    placeholder="No 46, Victoria Island Lagos"
                    value={location}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="capacity"
                    id="capacity"
                    placeholder="5000"
                    value={capacity}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="price"
                    id="price"
                    placeholder="100000"
                    value={price}
                    onChange={this.handleChange}
                  />
                </div>

                <input
                  className="btn btn-outline-success"
                  type="submit"
                  value="Save"
                />
              </form>
            </div>
          </div>
        </div>
        <hr />
        <Footer />
      </div>
    );
  }
}

EditCenterForm.propTypes = {
  match: PropTypes.object.isRequired,
  fetchSingleCenter: PropTypes.func.isRequired,
  updateCenter: PropTypes.func.isRequired,
  selectedCenter: PropTypes.object.isRequired
};

/** maps reux state to props
 * @param {any} state
 * @returns {object} props
 */
const mapStateToProps = state => {
  return {
    selectedCenter: state.centersReducer.selectedCenter
  };
};

export default connect(mapStateToProps, { fetchSingleCenter, updateCenter })(
  EditCenterForm
);
