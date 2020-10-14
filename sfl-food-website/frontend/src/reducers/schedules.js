import { GET_SCHEDULES } from "../actions/types.js";

const initialState = {
    schedules: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SCHEDULES:
            return {
                ...state,
                locations: action.payload
            }
        default:
            return state;
    }
}