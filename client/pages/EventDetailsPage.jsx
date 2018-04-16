import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventDetailsContainer from '../containers/EventDetailsContainer';

const EventDetailsPage = ({ match }) => (
  <div>
    <Header
      links={{
        centers: 'centers',
        events: 'events'
      }}
    />
    <EventDetailsContainer match={match} />
    <Footer />
  </div>
);

EventDetailsPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default EventDetailsPage;
