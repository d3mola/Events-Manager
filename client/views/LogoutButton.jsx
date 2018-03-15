// presentaional component for centers
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../actions/actionCreators';

const Logout = props => {
  const handleLogout = e => {
    props.logout();
  };

  return (
    <button type="button" onClick={handleLogout}>
      LOGOUT
    </button>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Logout);
