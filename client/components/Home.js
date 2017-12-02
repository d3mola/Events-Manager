import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import '../static/scss/home.scss';

/**
 * 
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
  /**
   * @returns {object} component
   * @memberof Home
   */
  render() {
    return (
      <div>
        <Header />
        <div>
          <section id="introduction">
            <div className="container">
              <div className="row align-items-center fill-viewport">
                <div className="col-12">
                  <h1>Party like there's no tomorrow!</h1>
                  <p>Do you plan to hold your dream event, try us today!</p>
                  <Link to={"/signup"} className="btn btn-outline-success">Book an event</Link>
                  <Link to={"/centers"} className="btn btn-outline-primary">Get Centers</Link>
                </div>
              </div>
            </div>
          </section>

          <section id="info-1">
              <div className="container">
                  <div className="row align-items-center fill-viewport">
                    <div className="col-12 col-md-12">
                      <h1 className='text-center'>We help you achieve you dream event by providing state of the art facilities.</h1>
                      <p>We have various event centers across Nigeria and we have a track record of providing the best facilities.</p>
                      <img src="https://goo.gl/KXx5Z3" alt="One image" className="img-fluid img-center" />
                    </div>
                  </div>
                </div>
          </section>

        <section id="pictures">
          <div className="container">
            <div className="row fill-viewport text-center">
              <div className="col-md">
                <h4>Events palace lives up to its hype!</h4>
                <img src="https://goo.gl/98y9TL" alt="Testimony one" className="img-fluidc" />
              </div>
              <div className="col-md">
                <h4>Events palace lives up to its hype!</h4>
                <img src="https://goo.gl/xMUXor" alt="Testimony one" className="img-fluicd" />
              </div>
              <div className="col-md">
                <h4>Events palace lives up to its hype!</h4>
                <img src="https://goo.gl/qK4xct" alt="Testimony one" className="img-fluicd" />
              </div>     
            </div>
          </div><hr />
        </section>
        </div>
        <Footer />
      </div>
    );
  }
}


export default Home;