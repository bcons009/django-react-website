import { combineReducers } from 'redux';
import locations from './locations'
import schedules from './schedules'
import locationsLL from './locationsLL'
import auth from './auth'
import errors from './errors'
import messages from './messages'

export default combineReducers({
    locations, 
    schedules,
    locationsLL,
    auth,
	errors,
	messages
});