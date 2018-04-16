import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';

const EventDetailsComponent = ({
  currentEvent,
  handleDelete,
  match,
  isFetching
}) => {
  console.log('currentEvent', currentEvent);
  let component;
  component = !currentEvent ? (
    <Loading />
  ) : (
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
        to={match.url + '/edit'}
        style={{ marginRight: 10 }}
        className="btn btn-outline-primary btn-sm"
      >
        <i className="fa fa-edit" /> Edit
      </Link>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => handleDelete(currentEvent.id)}
      >
        <i className="fa fa-trash" /> Delete
      </button>
    </div>
  );
  return isFetching ? <Loading /> : component;
  // return component;
};

EventDetailsComponent.propTypes = {
  currentEvent: PropTypes.object,
  match: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  isFetching: PropTypes.bool
};

export default EventDetailsComponent;
