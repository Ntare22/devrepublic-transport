import { combineReducers } from 'redux';
import auth from './auth';
import trips from './trip';

export default combineReducers({
    user: auth,
    trips
})