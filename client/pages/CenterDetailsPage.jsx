import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CenterDetailsContainer from '../containers/CenterDetailsContainer';

const CenterDetailsPage = ({ match }) => (
  <div>
    <Header links={['centers', 'events', 'centers/add']} />
    <CenterDetailsContainer match={match} />
    <Footer />
  </div>
);

CenterDetailsPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default CenterDetailsPage;
