import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import Logout from '../views/LogoutButton';
// import { logout } from '../actions/actionCreators';
/**
 * header
 * @param {array} links - array of nav links
 * @returns {JSX} - representaion of header
 */
const Header = ({ links }) => {
  return (
    <div id="header">
      <nav className="navbar navbar-toggleable-md">
        <button
          className="navbar-toggler navbar-toggler-right mt-3"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
          <span className="navbar-toggler-icon" />
          <span className="navbar-toggler-icon" />
        </button>
        <div>
          <Link id="brand-logo" className="navbar-brand" to="/">
            party <br />palace
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {Object.entries(links).map(link => {
              return (
                <li key={link[0]} className="nav-item">
                  <NavLink className="nav-link" to={`/${link[1]}`}>
                    {link[0].toUpperCase()}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Logout />
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  links: PropTypes.object.isRequired
};

export default Header;
