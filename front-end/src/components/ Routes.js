import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import TripComponent from './createTrip';
import Dashboard from "./dashboard";
import Signup from "./signupPage";
import Login from './loginPage';
import history from './history';

const Routes = () =>{
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/trip" component={TripComponent} />
                </Switch>
            </Router>
        )
}

export default Routes