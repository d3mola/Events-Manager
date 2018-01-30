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
import AddCenter from './AddCenter';
import AddEvent from './AddEvent';
import EventsPage from './EventsPage.jsx';
import EditEvent from './EditEvent';
import EditEventForm from './EditEventForm.jsx';
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
          <Route path='/centers' component={Centers}/>
          <Route path='/add-center' component={AddCenter}/>
          <Route path='/add-event' component={AddEvent}/>
          {/* <Route path='/events/edit/:id' component={EditEvent}/>new temp */}
          <Route exact path='/events' component={EventsPage}/>{/* new temp */}
          {/* <Route path='/events' component={Events}/> */}{/*original*/}
          <Route path='/edit-event' component={EditEvent}/>{/*original*/}
          {/* <Route path='/events/:id' component={EditEvent}/> */}
          <Route path='/test' component={EditEventForm}/>
          <Route component={Error}/>
        </Switch>
      </Router>
    );
  }
}

export default App;