import axios from 'axios';
import {ADD_L_REVIEW,GET_L_REVIEW} from './types';

// Add Reviews
export const addReview = (lReview) => dispatch => {
    axios
        .post('/api/postReviews/', lReview)
        .then(res => {
            dispatch({
                type: ADD_L_REVIEW,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// Get Reviews
export const getReview = () => dispatch => {
    axios
        .get('/api/reviews/')
        .then(res => {
            dispatch({
                type: GET_L_REVIEW,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}