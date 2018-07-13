import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../commons/Loading';
import CenterComponent from './CenterComponent';

const CenterListComponent = props => {
  const { centers, match, isFetching, error } = props;

  const renderCenters = () => {
    if (isFetching) {
      return <Loading />;
    } else {
      if (centers.length === 0) {
        return <h3 className="text-center">No centers at this time.</h3>;
      }
      return (
        <div className="row fill-viewport" style={{display:'flex', justifyContent:'center', alignItems:'baseline'}}>
          {centers.map(center => (
            <div
              className="col-md-4 col-sm-6 text-center center-list"
              key={center.id}
            >
              <CenterComponent center={center} match={match} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="cards fill-viewport">{renderCenters()}</div>
    </div>
  );
};

CenterListComponent.propTypes = {
  centers: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default CenterListComponent;
