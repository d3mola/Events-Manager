// presentational component that lists events
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import EventComponent from './EventComponent';

const EventListComponent = ({ events, match, isFetching, error }) => {

  const renderEventsList = () => {
    return events.map(event => {
      return <EventComponent key={event.id} singleEvent={event} match={match} />
    });
  }

  return (
    isFetching ? <Loading /> : events.length === 0 ? <h3>No event created</h3> :renderEventsList()
  )
}

EventListComponent.propTypes = {
  events: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default EventListComponent;
