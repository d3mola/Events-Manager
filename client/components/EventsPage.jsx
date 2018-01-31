import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import EventsContainer from './EventsContainer.jsx';

class EventsPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <EventsContainer />
        <Footer />
      </div>
    );
  }
  
}

// EventsPage.propTypes = {
//   events: PropTypes.array.isRequired,
//   getEvents: PropTypes.func.isRequired,
//   selectEvent: PropTypes.func.isRequired,
// };

export default EventsPage;
