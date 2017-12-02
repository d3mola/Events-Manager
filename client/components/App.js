import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { history } from '../store';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Centers from './Centers';
import AddCenter from './AddCenter'

import '../static/scss/center-details.scss';


  const render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/centers" component={Centers} />
          <Route path="/addcenter" component={AddCenter} />
        </div>
      </BrowserRouter>
    )
  }

  export default render;