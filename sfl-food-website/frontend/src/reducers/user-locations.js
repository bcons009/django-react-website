import { GET_U_LOCATIONS, ADD_U_LOCATION, DELETE_U_LOCATION, EDIT_U_LOCATION } from "../actions/types.js";

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
        case DELETE_U_LOCATION:
            return {
                ...state,
                uLocations: state.uLocations.filter(location => location.id !== action.payload)
            }
        case EDIT_U_LOCATION:
            return {
                ...state,
                uLocations: state.uLocations.map(location =>
                    location.id === action.payload.id ? action.payload : location
                )
            }
        default:
            return state;
    }
}