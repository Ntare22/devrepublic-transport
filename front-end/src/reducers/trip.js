const initialState = {
    trips: null,
    error: null,
}

const trips = (state = initialState, action) => {
    switch(action.type){
        case 'CREATE_TRIP':
            return {
                ...state, trips: action.payload
            }
        case 'CREATE_TRIP,_ERROR':
            return{
                    ...state, error: action.payload
                }
        case 'VIEW_TRIPS':
            return action.payload
        case 'DELETE_TRIPS':
            return {
                ...state, trips: action.payload
            }
            // return action.payload
        case 'DELETE_TRIPS_ERROR':
                return{
                        ...state, error: action.payload
                    }
        default:
            return state
    }
}

export default trips;