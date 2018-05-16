import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CenterComponent = ({ center, match }) => (
  <div className="card">
    <div className="card-header">
      <h4>{center.name}</h4>
    </div>
    <div className="card-body">
      {/* <h4 className="card-title">{center.image}</h4> */}
      {/* <img
                    src="../static/images/Capture.png"
                    alt="Image goes here"
                    width="200px"
                    height="200px"
                  /> */}
      <p className="card-text">Location: {center.location.toUpperCase()}</p>
      <p className="card-text">Capacity: {center.capacity}</p>
      <p className="card-text">Price: {'#' + center.price}</p>
      <hr />
    </div>
    <div className="card-footerr">
      <Link to={`${match.url}/${center.id}`} className="btn btn-success mb-2">
        <i className="fa fa-info fa-sm fw" /> Details
      </Link>
    </div>
  </div>
);

CenterComponent.propTypes = {
  center: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default CenterComponent;
