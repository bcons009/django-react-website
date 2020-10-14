import axios from 'axios';
import { GET_SCHEDULES } from './types';

// Get Locations
export const getSchedules = () => dispatch => {
    axios
        .get('/api/schedules/')
        .then(res => {
            dispatch({
                type: GET_SCHEDULES,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}