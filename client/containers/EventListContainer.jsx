// event list container
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getEvents } from '../actions/actionCreators';
import EventListComponent from '../views/EventListComponent';

class EventListContainer extends React.Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { events, match, isFetching, error } = this.props;
    return (
      <EventListComponent
        events={events}
        match={match}
        isFetching={isFetching}
        error={error}
      />
    );
  }
}

EventListContainer.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  events: state.eventsReducer.events,
  isFetching: state.eventsReducer.isFetching,
  error: state.eventsReducer.error
});

export default connect(mapStateToProps, {
  getEvents
})(EventListContainer);
