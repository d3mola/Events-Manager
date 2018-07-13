import React from 'react';
import { Link } from 'react-router-dom';
import Header from './commons/Header';
import Footer from './commons/Footer';

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
        <Header
          links={{
            centers: 'centers',
            register: 'register',
            login: 'login'
          }}
        />

        <div>
          <section id="introduction">
            <div className="overlay">
              <div className="container">
                <div className="row align-items-center fill-viewport">
                  <div className="col-12">
                    <h1>Party like there is no tomorrow!</h1>
                    <p>Do you plan to hold your dream event, we have centers that can meet your needs.</p>
                    <Link to="/centers" className="btn btn-success">
                      <b>Book a center</b>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
