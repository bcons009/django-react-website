import { GET_LOCATIONS, DELETE_LOCATION } from "../actions/types.js";

const initialState = {
    // something: 'text',
    locations: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload
            }
        case DELETE_LOCATION:
            return {
                ...state,
                locations: state.locations.filter(location => location.id !== action.payload)
            }
        default:
            return state;
    }
}