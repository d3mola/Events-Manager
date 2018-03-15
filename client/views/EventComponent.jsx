import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Event from '../components/Event';

const EventComponent = ({ singleEvent, match }) => (
  <div style={{ marginBottom: 20 }}>
    <Event title={singleEvent.title} id={singleEvent.id} />
    <Link
      to={`${match.url}/${singleEvent.id}`}
      style={{ marginRight: 10 }}
      className="btn btn-outline-primary btn-sm"
    >
      <i className="fa fa-info" />
    </Link>
    <hr />
  </div>
);

EventComponent.propTypes = {
  singleEvent: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default EventComponent;
