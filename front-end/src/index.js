import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from "react-redux";
import store from './store';
import { BrowserRouter} from 'react-router-dom';
import Routes from './components/ Routes';
import Navbar from './components/navbar';
import Footer from './components/footer';

store.subscribe(()=>{
  console.log('__++++++++',store.getState())
})
// import SignupComponent  from "./components/signup";
ReactDOM.render(
  <BrowserRouter>
  <Provider store = {store}>
    <Navbar />
    <Routes />
    <Footer />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();