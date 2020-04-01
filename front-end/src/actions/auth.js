import apiCall from '../apiCall';

export const signUp = (user) => async dispatch => {
    try{
    const res = await apiCall('auth/register', 'post', user);
    // console.log('+++++++++',res)
    localStorage.setItem('user', res.data.token)
    return dispatch({ type: 'SIGNUP_USER', payload: res.data});
    }
    catch(error){
        // console.log('__________',{...error})
        return dispatch({type: 'SIGNUP_ERROR', payload: error.response.data})
    }
}