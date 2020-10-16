import { combineReducers } from 'redux';
import locations from './locations'
import schedules from './schedules'

export default combineReducers({
    locations, 
    schedules
});