const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    isLoggedIn: false
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
        case 'LOGIN_SUCCESS':
            return {
                ...state, user: action.payload, isLoggedIn: true
            }
        case 'LOGIN_ERROR': 
            return{
                    ...state, error: action.payload
            }
        default:
            return state
    }
}

export default auth;