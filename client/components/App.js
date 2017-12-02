import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Centers from './Centers';
import AddCenter from './AddCenter'

import '../static/scss/center-details.scss';


/**
 * @description creates a component that takes in all the routes as children
 * @returns {class} App
 */
class App extends React.Component {
  /**
   * 
   * @returns {component} router
   * @memberof App
   */
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/centers" component={Centers} />
          <Route exact path="/addcenter" component={AddCenter} />
        </Switch>
      </Router>
    )
  }

}

export default App;
