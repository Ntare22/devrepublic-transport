import React from "react";
import { Route, Switch,Router } from "react-router-dom";
import Navbar from "./components/navbar";
// import Footer from "./components/footer"; 
// import PageNotFound from "./PageNotFound";
import TripComponent from './components/createTrip';
import Dashboard from "./components/dashboard";
import Signup from "./components/signupPage";
import Login from './components/loginPage';
import TripDetails from './components/tripDetailsPage';
import history from './components/history';
const App = () => {
  return (
    <div className="container-fluid">
      <Router history={history}>
      <Navbar />
      <Switch>
      <Route path="/" exact component={Signup} />
      <Route path="/details" component={TripDetails} />
    <Route path="/login" component={Login} />
     <Route path="/dashboard" component={Dashboard} />
      <Route path="/trip" component={TripComponent} />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
      {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
