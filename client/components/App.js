import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';

import history from '../history';
import PrivateRoute from './customRoutes/PrivateRoutes';
import AdminRoute from './customRoutes/AdminRoute';

import Home from './Home';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import CentersListPage from './containers/CenterListContainer';
import CenterDetailsPage from './containers/CenterDetailsContainer';
import EventDetailsPage from './containers/EventDetailsContainer';
import EventListPage from './containers/EventListContainer';
import AddCenter from './forms/AddCenter';
import AddEvent from './forms/AddEvent';
import EditEventForm from './forms/EditEventForm.jsx';
import EditCenterForm from './forms/EditCenterForm.jsx';
import Error from './Error';
import '../../node_modules/toastr/build/toastr.min.css';

/**
 * @class App
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
          <AdminRoute path="/centers/add" component={AddCenter} />
          <AdminRoute path="/centers/:id/edit" component={EditCenterForm} />
          <Route path="/centers/:id" component={CenterDetailsPage} />
          <Route path="/centers" component={CentersListPage} />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
