import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

import { ADD_U_LOCATION, GET_U_LOCATIONS, DELETE_U_LOCATION, EDIT_U_LOCATION } from './types';

// Get User Locations
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

// Delete User Locations
export const deleteULocation = (id) => dispatch => {
    axios
        .delete(`/api/userlocs/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_U_LOCATION,
                payload: id
            });
        })
        .catch(err => console.log(err));
}

// Edit User Locations
export const editULocation = (uLocation, id) => dispatch => {
    axios
        .put(`/api/userlocs/${id}/`, uLocation)
        .then(res => {
            dispatch({
                type: EDIT_U_LOCATION,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}