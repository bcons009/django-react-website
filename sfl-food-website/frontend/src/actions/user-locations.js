import axios from 'axios';
import { ADD_U_LOCATION, GET_U_LOCATIONS } from './types';

// Get user Locations
export const getULocations = () => dispatch => {
    axios
        .get('/api/userlocs/')
        .then(res => {
            dispatch({
                type: GET_U_LOCATIONS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// Add User Locations
export const addULocation = (uLocation) => dispatch => {
    axios
        .post('/api/userlocs/', uLocation)
        .then(res => {
            dispatch({
                type: ADD_U_LOCATION,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}