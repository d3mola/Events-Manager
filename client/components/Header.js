import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

/**
 * header
 * @param {array} links - array of nav links
 * @returns {JSX} - representaion of header
 */
const Header = ({ links }) => {
  // const links = ["centers", "events", "register", "login", "logout"];
    return (
      <div id="header">
        <nav className="navbar navbar-toggleable-md">
          <button className="navbar-toggler navbar-toggler-right mt-3" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div>
              <Link id="brand-logo" className="navbar-brand" to="/">party <br/>palace</Link>
          </div>
          
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {links.map(link => {
                return (
                  <li key={link} className="nav-item">
                    <NavLink className="nav-link" to={`/${link}`}>
                      {link.toUpperCase()}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    );
};

Header.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Header;