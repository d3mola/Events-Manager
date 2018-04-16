// not completed yet

import React from 'react';
import { PropTypes } from 'prop-types';
// import { Link } from 'react-router-dom';

const CenterForm = ({
  name,
  location,
  capacity,
  price,
  handleSubmit,
  handleChange
}) => (
  <div className="add-center-page">
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form
            className="jumbotron center-form-box"
            id="form-box"
            // action=""
            // method="post"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center">Create A Center!</h2>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Gold hall"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                className="form-control"
                type="text"
                name="location"
                id="location"
                placeholder="No 46, Victoria Island Lagos"
                value={location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity:</label>
              <input
                className="form-control"
                type="text"
                name="capacity"
                id="capacity"
                placeholder="5000"
                value={capacity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                className="form-control"
                type="text"
                name="price"
                id="price"
                placeholder="100000"
                value={price}
                onChange={handleChange}
              />
            </div>

            <input
              className="btn btn-outline-success"
              type="submit"
              value="Create"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
);

CenterForm.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CenterForm;
