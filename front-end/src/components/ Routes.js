import React from "react";
import { Router, Switch, Route } from "react-router-dom";
// import store from '../store';
import Dashboard from "./dashboard";
import Signup from "./signup";
import history from './history';

const Routes = () =>{
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Signup} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        )
}

export default Routes