const initialState = {
    user: null,
    isAuthenticated: false,
    error: null
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case 'SIGNUP_USER': 
        return{
            ...state, user: action.payload, isAuthenticated: true
        }
        case 'SIGNUP_ERROR':
        return{
            ...state, error: action.payload
        }
        default:
            return state
    }
}

export default auth;