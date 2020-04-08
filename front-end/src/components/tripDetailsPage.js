import React, { useEffect, useState } from 'react';
import './signup.css';
import { viewAllTrips } from '../actions/tripActions';
import { connect } from 'react-redux';
import TripCards from './tripCards';
import Modalpop from './modal';

const AllTripComponent = (props) => {
  const handleOnClick = async () => {
   const output =  await props.viewAllTrips();
   const noData = output.payload.data.length === 0
   if (noData){
    setNoTrip(true)
   }
  }
  const [noTrip , setNoTrip] =useState(null);

  useEffect(()=>{
      handleOnClick()
  },[])
const openModal = () => {
    return <Modalpop />
}
  return (
    <div className="signup-form d-inline p-2 text-center mt-3 bg-form">
        {noTrip ? (<p className= "text-center text-dark mt-5" >No trip found! Create a trip...</p> ): ''}
      {
    props.trips.data? props.trips.data.map( num => (
        <TripCards location={num.location} 
        destination={num.destination }
         BusToArrive={num.busToArrive}  
         BusArrivalTime ={num.BusArrivalTime}
         key={num.id}
         openModal={openModal}
         /> )) : ''
      }
    </div>
  )
}
const MapStateToProps = ({ trips, user }) => {
  return {
    trips,
    user
  }
}
export default connect(MapStateToProps, { viewAllTrips })(AllTripComponent);
