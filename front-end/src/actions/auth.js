import apiCall from '../apiCall';

export const signUp = (user) => async dispatch => {
    try{
    const res = await apiCall('auth/register', 'post', user);
    localStorage.setItem('token', res.data.token)
    return dispatch({ type: 'SIGNUP_USER', payload: res.data});
    }
    catch(error){
        return dispatch({type: 'SIGNUP_ERROR', payload: error.response.data})
    }
}

export const login = (user) => async dispatch => {
    try{
    const res = await apiCall('auth/login', 'post', user);
    localStorage.setItem('token', res.data.token)
    return dispatch({ type: 'LOGIN_SUCCESS', payload: res.data});
    }
    catch(error){
        return dispatch({type: 'LOGIN_ERROR' , payload: error.response.data})
    }
}


