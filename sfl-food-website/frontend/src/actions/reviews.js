import axios from 'axios';
import { ADD_L_REVIEW} from './types';

// Add Reviews
export const addLReview = (lReview) => dispatch => {
    axios
        .post('/api/reviews/', lReview)
        .then(res => {
            dispatch({
                type: ADD_L_REVIEW,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}