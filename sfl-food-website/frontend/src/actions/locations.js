import axios from 'axios';
import { GET_LOCATIONS, DELETE_LOCATION } from './types';

// Get Locations
export const getLocations = () => dispatch => {
    axios
        .get('/api/locations/')
        .then(res => {
            dispatch({
                type: GET_LOCATIONS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// Delete Locations
export const deleteLocation = (id) => dispatch => {
    axios
        .delete(`/api/locations/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_LOCATION,
                payload: id
            });
        })
        .catch(err => console.log(err));
}