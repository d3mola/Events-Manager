import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Footer = () => {
    return (
      <div>
        <footer id="footer">
          <div className="container">
            <div className="row text-center align-items-centerr">
              <div className="col-md">
                <h5 className="footer-header">Contact Us</h5>
                <p className="footer-para">Head office: Andela Epic Tower, 234 Ilupeju</p>
                <p className="footer-para">03334524523 </p>
              </div>
              <div className="col-md">
                <h5 className="footer-header">Socials</h5>
                <ul className="list-inline">
                  <li className="list-inline-item"><Link className="social-link" to="#"><i className="fa fa-facebook fa-2x"></i></Link></li>
                  <li className="list-inline-item"><Link className="social-link" to="#"><i className="fa fa-instagram fa-2x"></i></Link></li>
                  <li className="list-inline-item"><Link className="social-link" to="#"><i className="fa fa-twitter fa-2x"></i></Link></li>
                  <li className="list-inline-item"><Link className="social-link" to="#"><i className="fa fa-snapchat fa-2x"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
};

export default Footer;