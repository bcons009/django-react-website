import { GET_U_LOCATIONS, ADD_U_LOCATION } from "../actions/types.js";

const initialState = {
    // something: 'text',
    uLocations: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_U_LOCATIONS:
            return {
                ...state,
                uLocations: action.payload
            }
        case ADD_U_LOCATION:
            return {
                ...state,
                uLocations: [...state.uLocations, action.payload]
            }
        default:
            return state;
    }
}