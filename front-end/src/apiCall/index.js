import axois from 'axios';

const composeToken = token => token? {token: token} : { };

const apiCall = (url, method, body={}, token = '') => axois({
    method,
    url: `/api/v1/${url}`,
    data: body,
    headers: {
        ...composeToken(token)
    }
})

export default apiCall;