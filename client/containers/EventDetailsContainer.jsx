import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EventDetailsComponent from '../views/EventDetailsComponent';
import { getSingleEvent, deleteEvent } from '../actions/actionCreators';

class EventDetailsContainer extends Component {
  /**
   * callback to handle deletion of an event
   * passed down as props to component
   * @param {number} id id of center to be deleted
   * @returns {Promise} deletes a center
   */
  handleEventDelete = id => {
    this.props.deleteEvent(id);
  };

  /**
   * lifecycle method called after component mounts the DOM
   * fetches center with given id
   * @memberof CenterDetailsContainer
   * @returns {Promise} fetches the center to be rendered
   */
  componentDidMount() {
    this.props.getSingleEvent(this.props.match.params.id);
  }

  render() {
    const { currentEvent, match, isFetching } = this.props;
    return (
      <EventDetailsComponent
        currentEvent={currentEvent}
        handleDelete={this.handleEventDelete}
        match={match}
        isFetching={isFetching}
      />
    );
  }
}

/**
 * maps redux state to props
 * @param {object} state redux state
 * @returns {object} props selectedCenter
 */
const mapStateToProps = state => ({
  currentEvent: state.eventsReducer.currentEvent,
  isFetching: state.eventsReducer.isFetching
});

EventDetailsContainer.propTypes = {
  currentEvent: PropTypes.object,
  getSingleEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

EventDetailsContainer.defaultProps = {
  // selectedCenter: {}
};

export default connect(mapStateToProps, { getSingleEvent, deleteEvent })(
  EventDetailsContainer
);
