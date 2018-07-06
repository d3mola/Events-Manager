import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../commons/Header';
import Footer from '../commons/Footer';
import Loading from '../commons/Loading';
import { addEvent, getCenters } from '../../actions/actionCreators';

/**
 * Creates AddEvent Component
 */
class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        notes: '',
        centerId: '0',
        date: ''
      },
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // console.log(e.target.name, e.target.value);
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addEvent(this.state.data);
  }

  componentDidMount() {
    this.props.getCenters();
  }

  render() {
    const { title, notes, centerId, date } = this.state.data;
    const { message, className, error, addingEvent } = this.props;
    return (
      <div className="add-event-page">
        <Header
          links={{ centers: 'centers', events: 'events', logout: 'logout' }}
        />
        {addingEvent && <Loading />}
        <Link to="/centers" style={{ color: 'white', marginLeft: 20 }}>
          <i className="fa fa-angle-double-right" />
          Go to events
        </Link>
        <div className="container">
          <div className="row">
            <div className="col col-md-3"></div>
            <div className="col col-md-6">
              <form
                className="jumbotron event-form-box"
                id="form-box"
                onSubmit={this.handleSubmit}
              >
                <h2 className="text-center">Create An Event!</h2>
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
                    className="form-control"
                    name="centerId"
                    id="center"
                    value={centerId}
                    onChange={this.handleChange}
                  >
                    <option value="0" disabled>
                      Select
                    </option>
                    {this.props.centers.map(opt => {
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
                    className="form-control"
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={this.handleChange}
                  />
                </div>

                <input
                  className="btn btn-success"
                  type="submit"
                  value="Schedule"
                />
              </form>
            </div>
            <div className="col col-md-3"></div>
          </div>
        </div>
        <hr />
        <Footer />
      </div>
    );
  }
}

AddEvent.propTypes = {
  addEvent: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired,
  centers: PropTypes.array,
  message: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  addingEvent: PropTypes.bool
};

const mapStateToProps = state => ({
  centers: state.centersReducer.centers,
  message: state.flashMessages.message,
  className: state.flashMessages.className,
  error: state.eventsReducer.error,
  // error: state.flashMessages.error,
  addingEvent: state.eventsReducer.addingEvent
});

export default connect(mapStateToProps, { getCenters, addEvent })(AddEvent);
