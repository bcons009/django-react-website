import { combineReducers } from 'redux'
import auth from './auth'
import errors from './errors'
import messages from './messages'
import locations from './locations'
import schedules from './schedules'
import locationsLL from './locationsLL'

export default combineReducers({
	auth,
	errors,
	messages,
	locations, 
        schedules,
        locationsLL
});
