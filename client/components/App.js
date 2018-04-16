import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';

import history from '../history';
import PrivateRoute from '../customRoutes/PrivateRoutes';

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CentersListPage from '../pages/CenterListPage';
import CenterDetailsPage from '../pages/CenterDetailsPage';
import AddCenter from './AddCenter';
import AddEvent from './AddEvent';
import EventDetailsPage from '../pages/EventDetailsPage';
import EventListPage from '../pages/EventListPage';
import EditEventForm from './EditEventForm.jsx';
import EditCenterForm from './EditCenterForm.jsx';
import Error from './Error';
// import Link from '../__test__/Link.react';
// import Test from '../views/CenterComponent';

/**
 * @public
 * @class App
 * @description React Component encapsulating application user interface
 * @extends {Component}
 */
class App extends Component {
  /**
   * renders app to DOM
   * @returns {JSX} JSX representation of component
   * @memberof App
   */
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={SignUp} />
          <PrivateRoute path="/events/add" component={AddEvent} />
          <PrivateRoute path="/events/:id/edit" component={EditEventForm} />
          <PrivateRoute path="/events/:id" component={EventDetailsPage} />
          <PrivateRoute path="/events" component={EventListPage} />
          <PrivateRoute path="/centers/add" component={AddCenter} />
          <PrivateRoute path="/centers/:id/edit" component={EditCenterForm} />
          <PrivateRoute path="/centers/:id" component={CenterDetailsPage} />
          <PrivateRoute path="/centers" component={CentersListPage} />
          {/* <Route path="/link" component={Link} />
          <Route path="/test" component={Test} /> */}
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
