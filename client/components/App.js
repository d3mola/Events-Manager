import React, { Component } from 'react';
import {
  Switch,
  Route,
  Router,
  BrowserRouter,
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import history from '../history';

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './signUp';
import Centers from './Centers';
import AddCenter from './AddCenter';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';
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
      <ConnectedRouter history={history}>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={SignIn}/>
            <Route path='/register' component={SignUp}/>
            <Route path='/centers' component={Centers}/>
            <Route path='/add-center' component={AddCenter}/>
            <Route path='/add-event' component={AddEvent}/>
            <Route path='/edit-event' component={EditEvent}/>
            <Route path='/edit-event/:eventId' component={EditEvent}/>
            <Route path='/error' component={Error}/>
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;