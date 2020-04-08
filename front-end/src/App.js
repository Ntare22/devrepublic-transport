import React from "react";
import { Route, Switch,Router } from "react-router-dom";
import Navbar from "./components/navbar";
import TripComponent from './components/createTrip';
import Signup from "./components/signupPage";
import Login from './components/loginPage';
import TripDetails from './components/tripDetailsPage';
import history from './components/history';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import 'react-notifications/lib/notifications.css'
import  { NotificationContainer} from 'react-notifications'

const App = () => {
  return (
    <div className="container-fluid">
      <NotificationContainer />
      <Router history={history}>
      <Navbar />
      <Switch>
    <Route  path="/" exact component={Login} />
      <Route path="/signup"  component={Signup} />
      <Route  path="/details"  component={TripDetails} />
    {/* <Route path="/dashboard" component={Dashboard} /> */}
    <Route path="/trip" component={TripComponent} />
    <Route path ='/chat' component={Chat} />
    <Route path ='/join' component={Join} />

      </Switch>
      </Router>
    </div>
  );
};

export default App;
