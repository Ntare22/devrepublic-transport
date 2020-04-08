import apiCall from '../apiCall';  
        
export const createTrip = (info) => async dispatch => {
    try{
    const token = localStorage.getItem('token')
    const res = await apiCall('trip', 'post', info, token);
    return dispatch({ type: 'CREATE_TRIP', payload: res.data});
    }
    catch(error){
        return dispatch({type: 'CREATE_TRIP,_ERROR', payload: error.response.data})
    }
} 

export const viewAllTrips = (trips) => async dispatch => {
    try{
    const token = localStorage.getItem('token')
    const res = await apiCall('all', 'get',trips, token);
    return dispatch({ type: 'VIEW_TRIPS', payload: res.data});
    }
    catch(error){
        return dispatch({type: 'VIEW_TRIPS_ERROR', payload: error.response.data})
    }
} 

export const deleteTrips = (tripId,trips) => async dispatch => {
    try{
    const token = localStorage.getItem('token')
    console.log('DELETING******', trips)
    const res = await apiCall(`trip/${tripId}`, 'delete', trips, token);
    // console.log('REQUEST MADE******', res)
    const findTrip = trips.data.filter( trip => trip.id )
    const indexOfTrip = trips.data.indexOf(findTrip)
    const newArry = trips.data.splice(indexOfTrip, 1)
    // console.log('new arry: ___',  newArry)
    dispatch({ type: 'VIEW_TRIPS', payload: newArry});
    return dispatch({ type: 'DELETE_TRIPS', payload: res.data});
    }
    catch(error){
        return dispatch({type: 'DELETE_TRIPS_ERROR', payload: error.response.data})
    }
}