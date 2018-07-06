import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';

const CenterComponent = props => {
  const { center, match } = props;

  const getDetails = () => {
    history.push(`${match.url}/${center.id}`);
  };

  return (
    <div className="card" onClick={getDetails}>
      <div className="card-body">
        <h4 className="card-title">{center.image}</h4>
        <img
          src={
            center.imageUrl ||
            'https://res.cloudinary.com/dz64x6jkl/raw/upload/v1527268754/dev/events_manager/ehkispmvikxxcspccc98.jpg'
          }
          alt="Image goes here"
          width="100%"
          height="180px"
        />
        <div className="card-text font-weight-bold">
          {center.name.charAt(0).toUpperCase() + center.name.substr(1)}
        </div>
        <div className="card-text font-weight-light">
          <i className="fa fa-md fa-map-marker" />
          {'  '}
          {center.location}
        </div>
        <div className="card-text pull-right mr-3">
          <i className="fa fa-users" /> {center.capacity}{' '}
          <span className="font-weight-light" />
        </div>
        <div className="card-text">&#8358; {center.price}</div>
      </div>
    </div>
  );
};

CenterComponent.propTypes = {
  center: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default CenterComponent;
