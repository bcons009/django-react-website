import { GET_LOCATIONSLL } from "../actions/types.js";

const initialState = {
    // something: 'text',
    locationsLL: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LOCATIONSLL:
            return {
                ...state,
                locationsLL: action.payload
            }
        default:
            return state;
    }
}