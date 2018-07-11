import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from '../commons/Loading';

const CenterDetailsComponent = props => {
  const { selectedCenter, match, isFetching, handleModalOpen, token, isAdmin } = props;
  if (isFetching || !selectedCenter) {
    return (
      <div className="fill-viewport">
        <Loading />
      </div>
    );
  }
  return (
    <div className="fill-viewportt center-details containerr">
      <h3>Details of {selectedCenter.name}</h3>
      <div className="card-main">
        <div className="main-left mb-5">
          <div className="card-img">
            <img
              src={selectedCenter.imageUrl}
              alt="center-image"
            />
          </div>
        </div>
        <div className="main-right">
          <div className="description">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <div>
              <p><span className="name-capacity">Capacity:</span> {selectedCenter.capacity}</p>
            </div>

            <p><span className="price">Price:</span> &#8358; {selectedCenter.price}</p>

            { token && isAdmin === 'true' &&<div className="buttons">
              <Link
                to={match.url + '/edit'}
                style={{ marginRight: 10 }}
                className="btn btn-primary btn-lg">
                <i className="fa fa-edit" /> Edit
              </Link>
              <button
                className="btn btn-danger btn-md"
                onClick={() => handleModalOpen()}
                >
                <i className="fa fa-trash" /> Delete
              </button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

CenterDetailsComponent.propTypes = {
  selectedCenter: PropTypes.object,
  match: PropTypes.object.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string,
  isAdmin: PropTypes.string
};

CenterDetailsComponent.defaultProps = {
};

export default CenterDetailsComponent;
