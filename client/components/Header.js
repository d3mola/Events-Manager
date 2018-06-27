import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from '../views/LogoutButton';
// import { logout } from '../actions/actionCreators';
/**
 * header
 * @param {array} links - array of nav links
 * @returns {JSX} - representaion of header
 */
class Header extends React.Component {
  render() {
    const { links, isAuth } = this.props;
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
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            <span className="navbar-toggler-icon" />
            <span className="navbar-toggler-icon" />
          </button>
          <div>
            {isAuth ? (
              <Link id="brand-logo" className="navbar-brand" to="/centers">
                party <br />palace
              </Link>
            ) : (
              <Link id="brand-logo" className="navbar-brand" to="/">
                party <br />palace
              </Link>
            )}
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mr-5">
              {Object.entries(links).map(link => {
                return (
                  <li key={link[0]} className="nav-item mr-3">
                    <NavLink className="nav-link" to={`/${link[1]}`}>
                      {link[0].toUpperCase()}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            {this.props.user &&
              isAuth && (
                <p
                  style={{
                    color: 'white',
                    marginRight: '20px',
                    marginTop: '8px'
                  }}>
                  {this.props.user}
                </p>
              )}
            {isAuth && <Logout />}
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  links: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.token,
  user: state.authReducer.user
});

export default connect(mapStateToProps)(Header);
