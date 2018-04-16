// presentational component that lists events
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import EventComponent from './EventComponent';

const EventListComponent = ({ events, match, isFetching, error }) => {
  let component;
  if (events.length === 0) {
    component = (
      <div className="fill-viewport">
        {/* <h3>You do not have any events at this time.</h3> */}
        <h3>{error}</h3>
        <Link to="/events/add">
          <button className="btn btn-success">&#43; Create Event</button>
        </Link>
      </div>
    );
  } else {
    component = (
      <div className="fill-viewport">
        <div style={{ fontWeight: 'bold' }}>
          <h3>My Events</h3>
          <Link to="/events/add">
            <button className="btn btn-success btn-sm">
              <i className="fa fa-plus" /> Create Event
            </button>
          </Link>
          <div>
            {events.map(singleEvent => (
              <div key={singleEvent.id}>
                <EventComponent singleEvent={singleEvent} match={match} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return isFetching ? (
    <div className="fill-viewport">
      <Loading />
    </div>
  ) : (
    component
  );
  // return component;
};

EventListComponent.propTypes = {
  events: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default EventListComponent;
