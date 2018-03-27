import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventListContainer from '../containers/EventListContainer';

const EventListPage = ({ match }) => (
  <div>
    <Header
      links={{
        centers: 'centers',
        events: 'events'
      }}
    />
    <EventListContainer match={match} />
    <Footer />
  </div>
);

EventListPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default EventListPage;
