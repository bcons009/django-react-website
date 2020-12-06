import axios from 'axios';
import { GET_LOCATIONSLL } from './types';

// Get Locations
export const getLocationsLL = () => dispatch => {
    axios
        .get('/api/locationsLL/')
        .then(res => {
            dispatch({
                type: GET_LOCATIONSLL,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}