import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";

import history from "../history";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./signUp";
import Centers from "./Centers";
import CenterDetails from "./CenterDetails.jsx";
import AddCenter from "./AddCenter";
import AddEvent from "./AddEvent";
import EventDetails from "./EventDetails";
import EventList from "./EventList";
// import EventsPage from "./EventsPage.jsx";
import EditEventForm from './EditEventForm.jsx';
import EditCenterForm from "./EditCenterForm.jsx";
import Error from "./Error";

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
          <Route path="/events/add" component={AddEvent} />
          <Route path="/events/:id/edit" component={EditEventForm} />
          <Route path="/events/:id" component={EventDetails} />
          <Route path="/events" component={EventList} />
          <Route path="/centers/add" component={AddCenter} />
          <Route path="/centers/:id/edit" component={EditCenterForm} />
          <Route path="/centers/:id" component={CenterDetails} />
          <Route path="/centers" component={Centers} />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
