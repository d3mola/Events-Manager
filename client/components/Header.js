import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
              <li className="nav-item">
                <Link className="nav-link" to="/centers">CENTERS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">LOGIN</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">REGISTER</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
};

export default Header;