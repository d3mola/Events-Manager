import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// only authed users can access this route
export const AdminRoute = ({ component: Component, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAdmin === 'true' ?
        <Component {...props} /> :
        <Redirect to="/login" />
      }
    />
  );
};

AdminRoute.propTypes = {
  isAdmin: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  isAdmin: authReducer.isAdmin
});

export default connect(
  mapStateToProps,
  null
)(AdminRoute);
