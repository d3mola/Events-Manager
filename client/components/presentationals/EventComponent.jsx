import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventComponent = ({
  singleEvent,
  match,
  handleModalOpen
}) => {
  const { id, centerLocation, date, notes, title, centerName } = singleEvent;
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
        </div>
        <div className="e-card-body-bottom">
          <b>Venue: </b><br />
          {centerName}
        </div>
        <div className="e-card-body-bottom">
          <b>Notes:</b> <br />
          {notes}
        </div>
        <div className="ed-buttons">
          <Link
            to={match.url + `/${singleEvent.id}/edit`}
            style={{ marginRight: 10 }}
            className="btn btn-primary btn-sm ed-btn">
            <i className="fa fa-edit" /> Edit
          </Link>
          <button
            className="btn btn-danger btn-sm ed-btn"
            onClick={() => handleModalOpen(id)}>
            <i className="fa fa-trash" /> Delete 
          </button>
        </div>
      </div>
    </div>
  );
};

EventComponent.propTypes = {
  singleEvent: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  handleModalOpen: PropTypes.func.isRequired
};

export default EventComponent;
