import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';

/**
 * @description creates a component that takes in all the routes as children
 * @
 */
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </Router>
    )
  }

};

export default App;
