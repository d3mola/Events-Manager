import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { getSingleEvent, deleteEvent } from "../actions/actionCreators";
import Header from "./Header";
import Footer from "./Footer";
import FlashMessage from "./flashMessage";

class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.getSingleEvent(match.params.id);
  }

  render() {
    const { currentEvent, match } = this.props;
    if (!currentEvent) {
      return (
        <div>
          <h3>Details of the clicked event</h3>
          <em>Click an event to see the details!</em>
        </div>
      );
    } else {
      return (
        <div>
          <Header links={["centers", "events", "logout"]}/>
          <div className="container text-center fill-viewport mt-4 font-weight-bold">
            <h3>Event Details</h3>
            <hr />
            <p>
              title - <strong>{currentEvent.title}</strong>
            </p>
            <hr />
            <p>id - {currentEvent.id}</p>
            <hr />
            <p>notes - {currentEvent.notes}</p>
            <hr />
            <p>center id - {currentEvent.centerId}</p>
            <Link
              to={match.url + "/edit"}
              style={{ marginRight: 10 }}
              className="btn btn-outline-primary btn-sm"
            >
              <i className="fa fa-edit" />
            </Link>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={this.handleEventDelete}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  currentEvent: state.eventsReducer.currentEvent
});

EventDetails.propTypes = {
  currentEvent: PropTypes.object.isRequired,
  getSingleEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getSingleEvent, deleteEvent })(EventDetails);
