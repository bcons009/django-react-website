import { combineReducers } from 'redux';
import locations from './locations'
import schedules from './schedules'
import locationsLL from './locationsLL'

export default combineReducers({
    locations, 
    schedules,
    locationsLL
});