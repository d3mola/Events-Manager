// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// import Home from '../client/components/Home';
// import SignIn from '../client/components/SignIn';
// import SignUp from '../client/components/signUp';
// import Centers from '../client/components/Centers';
// import AddCenter from '../client/components/AddCenter';
// import AddEvent from '../client/components/AddEvent'
// import EditEvent from '../client/components/EditEvent'
// import Error from '../client/components/Error'

// export const history = createBrowserHistory();

// export const Routes = () => {
//   return (
//       <Switch>
//         <Route exact path='/' component={Home} />
//         <Route exact path='/signin' component={SignIn}/>
//         <Route exact path='/signup' component={SignUp}/>
//         <Route exact path='/centers' component={Centers}/>
//         <Route exact path='/addcenter' component={AddCenter}/>
//         <Route exact path='/addevent' component={AddEvent}/>
//         <Route path='/editevent/' component={EditEvent}/>
//         <Route path='/edit-event/:eventId' component={EditEvent}/>
//         <Route exact path='/error' component={Error}/>
//       </Switch>
//   )
// }