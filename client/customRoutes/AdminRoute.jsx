import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// only authed users can access this route
const AdminRoute = ({ component: Component, isAdmin, ...rest }) => {
  console.log(isAdmin, 'here to win');
  return (
    <Route
      {...rest}
      render={props =>
        isAdmin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

AdminRoute.propTypes = {
  isAdmin: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  isAdmin: authReducer.isAdmin
});

export default connect(
  mapStateToProps,
  null
)(AdminRoute);
