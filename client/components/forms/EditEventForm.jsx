import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../commons/Header';
import Footer from '../commons/Footer';
import Loading from '../commons/Loading';
import {
  getSingleEvent,
  editEvent,
  getCenters
} from '../../actions/actionCreators';

class EditEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      notes: '',
      centerId: '0',
      date: ''
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
    this.props.getCenters();
    this.props.getSingleEvent(this.props.match.params.id);
  }

  /**
   * function called when component receives new props
   * @param {object} newProps
   * @returns {undefined} changes the state based on the newProps received
   */
  componentWillReceiveProps(newProps) {
    this.setState(newProps.currentEvent);
  }

  /**
   * form submission handler
   * @param {object} event
   * @memberof SignUp
   * @returns {undefined} submits form
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.editEvent(this.state);
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

  render() {
    const { title, notes, centerId, date } = this.state;
    const { centers } = this.props;
    return !this.props.currentEvent ? (
      <Loading />
    ) : (
      <div className="">
        <Header
          links={{ centers: 'centers', events: 'events', logout: 'logout' }}
        />
        <div className="containerr edit-event-body">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form
                className="jumbotron mt-5 edit-center-form"
                id="form-box"
                onSubmit={this.handleSubmit}
              >
                <h3 className="text-center" style={{ bottom: 20 }}>
                  Edit Event!
                </h3>
                <em
                  style={{ fontWeight: 700, marginBottom: 20, color: 'black' }}
                >
                  editing {title}...
                </em>

                <div className="form-group">
                  <label htmlFor="event-name">Event Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    id="event-name"
                    placeholder="E.g. John's convocation"
                    value={title}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="notes">Optional Note:</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    id="notes"
                    cols="50"
                    rows="4"
                    placeholder="Enter an optional note"
                    value={notes}
                    onChange={this.handleChange}
                  />
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="center">Event Center: </label>
                  <select
                    required
                    className="form-control"
                    name="centerId"
                    id="center"
                    value={centerId}
                    onChange={this.handleChange}
                  >
                    <option value="0" disabled>
                      Select
                    </option>
                    {centers.map(opt => {
                      return (
                        <option
                          key={opt.id}
                          value={opt.id}
                          title={opt.location}
                        >
                          {opt.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date">
                    Choose a date and time:<br />MM/DD/YYYY
                  </label>
                  <input
                    required
                    className="form-control"
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={this.handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-success">
                  <i className="fa fa-send" />
                </button>
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
EditEventForm.propTypes = {
  getCenters: PropTypes.func.isRequired,
  getSingleEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  editEvent: PropTypes.func.isRequired,
  centers: PropTypes.array.isRequired,
  currentEvent: PropTypes.object.isRequired
};

/** maps reux state to props
 * @param {any} state
 * @returns {object} props
 */
const mapStateToProps = state => {
  return {
    currentEvent: state.eventsReducer.currentEvent,
    centers: state.centersReducer.centers
  };
};

export default connect(mapStateToProps, {
  getSingleEvent,
  editEvent,
  getCenters
})(EditEventForm);
