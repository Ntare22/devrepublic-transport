import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './signup.css'
// import history from './history';
import {connect } from 'react-redux';

const Navbar = (props) => {
  const activeStyle = { backgroundColor: "#0bbfbc", color: 'white' };
  const token = localStorage.getItem('token')
  // const [allowed, setAllowed] = useState(null)
  //   useEffect(()=>{
  //   setAllowed(props.user.isAuthenticated)
  //   console.log('check whathappens',props.user.user)
  // },[props.user])
  return (
    <div>
      <nav className="navbar navbar-dark shadow bg-navbar justify-content-between">
        <a className=" ml-5 text-info " href="/">Dev | Transport</a>
        <form className="form-inline my-1">
      {
        token ? (
          <>
              <NavLink activeStyle={activeStyle} className="btn btn-outline-white btn-md mr-5 shadow rounded" to="/trip" exact >New Trip</NavLink>
              <NavLink activeStyle={activeStyle} className="btn btn-outline-white btn-md mr-5 shadow  rounded" to="/details" >Details</NavLink>
        {/* <NavLink activeStyle={activeStyle} className="btn btn-outline-white btn-md mr-5 shadow  rounded" to="/" >Logout</NavLink> */}
              </>
  ) : (
                <>
          {/* {history.push('/') && localStorage.removeItem('token')} */}
          {/* {localStorage.removeItem('token')} */}

          <NavLink activeStyle={activeStyle} className="btn btn-outline-white btn-md mr-5 shadow  rounded" to="/" exact>Signup</NavLink>
          <NavLink activeStyle={activeStyle} className="btn btn-outline-white btn-md mr-5 shadow rounded" to="/login">Login</NavLink>
                </>
        )
    }
        </form> 

        </nav>
    </div>
      )
    }
    const MapStateToProps = ({trips, user}) => {
      // console.log(state.user)
      return {
        trips,
        user
      }
    }
export default connect(MapStateToProps)(Navbar);