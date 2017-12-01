import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
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
            </div><hr />
          </section>
        </div>
      </div>
    );
  }
}


export default Home;