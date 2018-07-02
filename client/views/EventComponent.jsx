import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Event from '../components/Event';

const EventComponent = ({ singleEvent, match }) => {
  const {
    centerLocation,
    date,
    userName,
    notes,
    title,
    centerName,
    usename,
    email
  } = singleEvent;
  return (
    <div className="event-card">
      <div className="e-card-header">
        <span className="e-card-location">
          <i className="fa fa-lg fa-map-marker" /> {centerLocation}
        </span>
        <span className="e-card-date">{date}</span>
      </div>
      <div className="card e-card-body">
        <div className="e-card-body-top">
          <div className="e-card-title">
            {title.substr(0, 1).toUpperCase() + title.substr(1)}
          </div>
          <Link
            to={`${match.url}/${singleEvent.id}`}
            className="e-card-button btn btn-outline-primary "
          >Details
          </Link>
        </div>
        <div className="e-card-body-bottom">{centerName}</div>
      </div>
    </div>
  );
};

EventComponent.propTypes = {
  singleEvent: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default EventComponent;
