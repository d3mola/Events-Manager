import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CenterListContainer from '../containers/CenterListContainer';

const CenterListPage = ({ match }) => (
  <div>
    <Header
      links={{
        centers: 'centers',
        events: 'events',
        'add center': 'centers/add'
      }}
    />
    {/* <Header links={['centers', 'events', 'centers/add']} /> */}
    <CenterListContainer match={match} />
    <Footer />
  </div>
);

CenterListPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default CenterListPage;
