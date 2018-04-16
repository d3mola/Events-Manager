import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addCenter } from '../actions/actionCreators';
import Header from './Header';
import Footer from './Footer';
import FlashMessage from './FlashMessage';

/**
 * @description Creates AddCenter component
 * @class AddCenter
 * @extends {React.Component}
 */
class AddCenter extends React.Component {
  //setting the initial state of the component
  state = {
    name: '',
    location: '',
    capacity: 0,
    price: 0
  };

  /**
   * submit handler
   * @param {any} e
   * @memberof SignUp
   * @returns {undefined}
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.addCenter(this.state);
    // reset the state of the form
    this.setState(prevState => ({
      ...prevState,
      name: '',
      location: '',
      capacity: 0,
      price: 0
    }));
  }; // handleSubmit

  /**
   * sadd center handler
   * @param {any} e
   * @memberof AddCenter
   * @returns {Undefined} sets form input values
   */
  handleChange = e => {
    // set the next state of the form
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**
   * renders signUpForm component
   * @returns {jsx} jsx representation of rendered component
   * @memberof AddCenter
   */
  render() {
    return (
      <div className="add-center-page">
        <Header
          links={{ centers: 'centers', events: 'events', logout: 'logout' }}
        />
        <FlashMessage
          message={this.props.message}
          className={this.props.className}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form
                className="jumbotron center-form-box"
                id="form-box"
                action=""
                method="post"
                onSubmit={this.handleSubmit}
              >
                <h2 className="text-center">Create A Center!</h2>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Gold hall"
                    value={this.state.name}
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
                    value={this.state.location}
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
                    value={this.state.capacity}
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
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </div>

                <input
                  className="btn btn-outline-success"
                  type="submit"
                  value="Create"
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

AddCenter.propTypes = {
  addCenter: PropTypes.func.isRequired,
  message: PropTypes.string,
  className: PropTypes.string
};

const mapStateToProps = state => ({
  message: state.flashMessages.message,
  className: state.flashMessages.className
});

export default connect(mapStateToProps, { addCenter })(AddCenter);
