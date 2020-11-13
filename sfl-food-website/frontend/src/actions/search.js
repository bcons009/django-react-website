import axios from 'axios';
import { GET_SEARCH_RESULTS } from './types';

// Get user Locations
export const search = (location, distance) => dispatch => {
	// Headers
	const config = {
	    headers: {
	      'Content-Type': 'application/json',
	    },
	};

	// Request Body
	// ***********WILL NEED TO ADD SEARCH VALUE***********
	const body = JSON.stringify({ location, distance });

    axios
        .post('/api/geocode/', body, config)
        .then(res => {
            dispatch({
                type: GET_SEARCH_RESULTS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}