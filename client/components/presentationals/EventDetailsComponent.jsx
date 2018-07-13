import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from '../commons/Loading';

const EventDetailsComponent = ({
  currentEvent,
  match,
  isFetching,
  handleModalOpen
}) => {
  let component;
  if (!currentEvent) {
    component = <h3 className="fill-viewport" >No such event exists!</h3>;
  } else {
    component = (
      <div style={{background: '#eee'}}>
        <div className="container fill-viewport ed-page">
          <h3>Details of {currentEvent.title}</h3>
          <div className="ed-body">
            <div className="ed-field">
              <div className="ed-field-title">Notes</div>
              <div className="ed-field-content">{currentEvent.notes || "No notes"}</div>
            </div>
            <div className="ed-field">
              <div className="ed-field-title">Venue</div>
              <div className="ed-field-content">{currentEvent.centerName || "No Venue"}</div>
            </div>
            <div className="ed-field">
              <div className="ed-field-title">Address</div>
              <div className="ed-field-content">{currentEvent.centerLocation}</div>
            </div>
            <div className="ed-field">
              <div className="ed-field-title">Date</div>
              <div className="ed-field-content">{currentEvent.date}</div>
            </div>
            <div className="ed-buttons">
              <Link
              to={match.url + '/edit'}
              style={{ marginRight: 10 }}
              className="btn btn-primary btn-md ed-btn">
              <i className="fa fa-edit" /> Edit
              </Link>
              <button
                className="btn btn-danger btn-md ed-btn"
                onClick={() => handleModalOpen()}
              >
                <i className="fa fa-trash" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return isFetching ? <Loading /> : component;
};

EventDetailsComponent.propTypes = {
  currentEvent: PropTypes.object,
  match: PropTypes.object.isRequired,
  handleModalOpen: PropTypes.func,
  isFetching: PropTypes.bool
};

export default EventDetailsComponent;
