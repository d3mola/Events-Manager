import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { ConnectedRouter as Router } from 'react-router-redux';

import history from '../history';

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './signUp';
import Centers from './Centers';
import CenterDetails from './CenterDetails.jsx';
// import CentersTest from './CentersTest.jsx';
import AddCenter from './AddCenter';
import AddEvent from './AddEvent';
import EventsPage from './EventsPage.jsx';
// import EditEvent from './EditEvent';
// import EditEventForm from './EditEventForm.jsx';
import Error from './Error';

/**
 * @public
 * @class App
 * @description React Component encapsulating application user interface
 * @extends {Component}
 */
class App extends Component {
  /**
   * renders app to DOM
   *
   * @returns {JSX} JSX representation of component
   * @memberof App
   */
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={SignIn}/>
          <Route path='/register' component={SignUp}/>
          <Route path='/add-center' component={AddCenter}/>
          <Route path='/add-event' component={AddEvent}/>
          <Route exact path='/events' component={EventsPage}/>
          <Route path='/centers/:id' component={CenterDetails}/>
          <Route path='/centers' component={Centers}/>
          {/* <Route path='/centers' component={CentersTest}/> */}
          <Route component={Error}/>
        </Switch>
      </Router>
    );
  }
}

export default App;