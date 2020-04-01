import React from 'react';
import { NavLink, BrowserRouter} from 'react-router-dom';
import './signup.css'

const Navbar = () => {
return(
    <BrowserRouter>
    <div>
    <nav className="navbar navbar-dark bg-navbar justify-content-between">
  <NavLink className="navbar-brand ml-5" to="/dashboard">devTransport</NavLink>
  <form className="form-inline my-1">
    <button className="btn btn-outline-white btn-md mr-5 shadow  bg-white rounded" type="submit">Signup</button>
    <button className="btn btn-outline-white btn-md mr-5 shadow text-white  rounded" type="submit">Login</button>

  </form>
</nav>
</div>
</BrowserRouter>
)
}

export default Navbar;