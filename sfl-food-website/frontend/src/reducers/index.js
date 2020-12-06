import { combineReducers } from 'redux';
import locations from './locations'
import schedules from './schedules'
import locationsLL from './locationsLL'
import auth from './auth'
import errors from './errors'
import messages from './messages'
import uLocations from './user-locations'
import lReview from './reviews'
import store from '../store'

// store.dispatch(actions.setCsrfToken(req.csrfToken()));

export default combineReducers({
    locations, 
    schedules,
    locationsLL,
    auth,
	errors,
    messages,
    uLocations,
    lReview,
});