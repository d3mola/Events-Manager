// presentaional component for centers
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../actions/actionCreators';

export const Logout = props => {
  const handleLogout = () => {
    props.logout();
  };

  return (
    <div>
      <button className="btn btn-outline-success btn-md" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Logout);
