import React, { useEffect, useState } from 'react';
import './signup.css';
import { createTrip } from '../actions/tripActions';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import history from './history';
import { NotificationManager } from 'react-notifications';

const TripComponent = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
   const output =  await props.createTrip(data);
  //  console.log('CREATE_TRIPPPP', output)
    if (output.payload.status === 200){
      showNotifications('success');
      // history.push('/details');
    }

  }

  const showNotifications = (type) => {
    switch(type){
      case 'error':
        return   NotificationManager.error('Trip already exist',"create a new one", 1000)
        case 'success':
          return NotificationManager.success('Trip created',"", 1000)
        default:
          return ''
    } 
  }
  // const [names, setNames] = useState(null)
  const [tripError, setTripError] = useState('')
  // useEffect(() => {
  //   if (props.user.user) {
  //     setNames(`${props.user.user.data.firstName} ${props.user.user.data.lastName}`)
  //     // console.log('trip _______ changed', props.user.user.data.firstName);
  //   }
  // }, [props.user]);

  useEffect(() => {
    if (props.trips.error) {
      showNotifications('error') ;
      // setTripError(props.trips.error.message)
      // if (tripError) return showNotifications('error') ;
    }
    

  }, [props.trips])

  return (
    <div className="signup-form text-center mt-5 bg-form">
      {/* <p className="mr-5 mt-5 text-center"> {`${names}, Welcome!!!`}</p> */}
      {/* <p className="red"> {tripError ? 'Trip Already exist' : ''}</p> */}
      <form className="text-center border border-light p-3 shadow-lg " onSubmit={handleSubmit(onSubmit)}>

        <p className="h4 mb-4 text-info">Create Trip</p>

        <label className="float-left text-info">Location</label>
        <select ref={register({ required: true })} name="location" className="browser-default custom-select mb-4">
          <option disabled>Choose option</option>
          <option >stadium</option>
          <option >gisimenti</option>
        </select>
        <label className="float-left text-info">Destination</label>
        <select ref={register({ required: true })} name="destination" className="browser-default custom-select mb-4">
          <option disabled>Choose option</option>
          <option >Remera</option>
          <option >Kimironko</option>
        </select>
        <button className="btn btn-info btn-block" type="submit">Create
    </button>
      </form>
    </div>
  )
}
const MapStateToProps = ({ trips, user }) => {
  return {
    trips,
    user
  }
}
export default connect(MapStateToProps, { createTrip })(TripComponent);
