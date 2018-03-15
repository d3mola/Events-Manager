import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// only authed users can access this route
const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  token: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  token: authReducer.token
});

export default connect(mapStateToProps, null)(PrivateRoute);
