import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventDetailsContainer from '../containers/EventDetailsContainer';

class EventDetailsPage extends Component {
  render() {
    const { match} = this.props
    return (
      <div>
        <Header links={['centers', 'events']} />
        <EventDetailsContainer match={match}/>
        <Footer />
      </div>
    );
  }
}

export default EventDetailsPage;
