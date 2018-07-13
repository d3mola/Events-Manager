import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import LogoutButton from '../auth/LogoutButton';

/**
 * header
 * @param {array} links - array of nav links
 * @returns {JSX} - representaion of header
 */
export class Header extends React.Component {

/**
 * checks if token has expired
 * @param {array} rawToken - token to be checked
 * @returns {boolean} - expiration status
 */
  tokenHasExpired = (rawToken) => {
    if (process.env.NODE_ENV === 'test') return false;
    if(rawToken) {
      const decodedToken = (jwtDecode(rawToken));
      const tokenExpriryDate = decodedToken.exp;
      const currentDate = Date.now().valueOf() / 1000;
      if (currentDate > tokenExpriryDate) {
        localStorage.clear();
        return true;
      }
    }
  }

  render() {
    const { links, token } = this.props;
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
            {this.tokenHasExpired(token) ? (
              <Link id="brand-logo" className="navbar-brand" to="/centers">
                Party palace
              </Link>
            ) : (
              <Link id="brand-logo" className="navbar-brand" to="/">
                Party palace
              </Link>
            )}
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mr-5">
              {Object.entries(links).map(link => {
                return (
                  <li key={link[0]} className="nav-item mr-3" id={link[0]}>
                    <NavLink className="nav-link" to={`/${link[1]}`}>
                      {link[0].toUpperCase()}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            {this.props.user &&
              !this.tokenHasExpired(token) && (
                <p
                  style={{
                    color: 'white',
                    marginRight: '20px',
                    marginTop: '8px'
                  }}>
                  {this.props.user}
                </p>
              )}
            {this.props.user && <LogoutButton />}
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  links: PropTypes.object.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = state => ({
  token: state.authReducer.token,
  user: state.authReducer.user
});

export default connect(mapStateToProps)(Header);
