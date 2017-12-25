import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Header = () => {
    return (
      <div>
        <section id="header">
          <nav className="navbar navbar-toggleable-md navbar-dark bg-dark">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div>
                <Link id="brand-logo" className="navbar-brand" to="/">Party<br />Palace</Link>
            </div>
            
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/centers">Centers</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Contact</Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">About</Link>
                </li>
              </ul>
            </div>
          </nav>
        </section>
      </div>
    );
};

export default Header;