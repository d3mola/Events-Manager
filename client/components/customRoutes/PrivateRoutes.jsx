import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import toastr from 'toastr';

// only authed users can access this route
const PrivateRoute = ({ component: Component, token, ...rest }) => {

  const tokenHasExpired = (rawToken) => {
    if(rawToken) {
      const decodedToken = (jwtDecode(rawToken));
      const tokenExpriryDate = decodedToken.exp;
      const currentDate = Date.now().valueOf() / 1000;
      if (currentDate > tokenExpriryDate) {
        toastr.error('Session has expired, plese login to continue!');
        localStorage.clear();
        return true;
      }
    }
  }

  return (
    <Route
      {...rest}
      render={props =>
        !tokenHasExpired(token) ?
        <Component {...props} /> :
        <Redirect to="/login" />
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
