import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../commons/Loading';
import EventComponent from './EventComponent';

const EventListComponent = ({ events, match, isFetching, error }) => {

  const renderEventsList = () => {
    return events.map(event => {
      return <EventComponent key={event.id} singleEvent={event} match={match} />
    });
  }

  return (
    isFetching
    ? <Loading />
    : events.length === 0
      ? <h3 className="mx-auto fill-viewport">No event created</h3>
      : <div className="e-list">{renderEventsList()}</div>
  )
}

EventListComponent.propTypes = {
  events: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default EventListComponent;
