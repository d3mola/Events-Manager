// presentaional component for list of centers
import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import CenterComponent from './CenterComponent';

const CenterListComponent = props => {
  const { centers, match, isFetching } = props;
  const renderCenters = () => {
    if (isFetching) {
      return <Loading />;
    } else {
      if (centers.length === 0) {
        return <p>No centers at this time.</p>
      }
      return (
        <div className="row fill-viewport">
          {centers.map(center => (
            <div className="col-md-4 text-center" key={center.id}>
              <CenterComponent center={center} match={match} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div id="main">
      <h3 className="text-center">These are the available centers</h3>
      <div className="container">
        <div className="cards fill-viewport">{renderCenters()}</div>;
      </div>
    </div>
  );
};

CenterListComponent.propTypes = {
  centers: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default CenterListComponent;
