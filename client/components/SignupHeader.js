import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const SignupHeader = () => {
    return (
      <div>
        <div id="header">
          <nav className="navbar navbar-toggleable-md navbar-dark bg-dark">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div>
                <a id="brand-logo" className="navbar-brand" href="#">Party<br />Palace</a>
            </div>
            
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Centers</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="login.html">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
};

export default SignupHeader;