import React from 'react';
import Modalpop from './modal';

const TripCards = ({keyId,location, destination, BusToArrive, BusArrivalTime}) => {

return(
    <div key ={keyId} className="signup-form text-center mt-5 bg-form">
    <form className="text-center border border-light p-3 shadow-lg ">
      <p className="h4 mb-4 text-info">Trip</p> 
       <label className="float-left text-info">Location</label>
        <p className="text-dark text-center">{location}</p>
        <label className="float-left text-info">Destination</label>
        <p className="text-dark text-center">{destination}</p>
        <label className="float-left text-info">Bus No</label>
        <p className="text-dark text-center">{BusToArrive}</p>
        <label className="float-left text-info">Waiting time</label>
        <p className="text-dark text-center">{BusArrivalTime}</p>
    {/* <button className="btn btn-danger btn-block" onClick={handleModal}>Cancel</button> */}
    <Modalpop />
    </form>
  </div>
)
}

export default TripCards;
