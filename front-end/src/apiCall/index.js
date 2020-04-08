import axois from 'axios';

// const composeToken = token => token? {token: token} : { };

// const composeToken = token => {
//     if (!token){
//         return 'WE NEED TOKEN'
//     }
//     console.log('TOKEN', token)
//     return token
// } 

const apiCall = (url, method, body={}, token = '') => axois({
    method,
    url: `/api/v1/${url}`,
    data: body,
    headers: {
        token
    },
})
export default apiCall;