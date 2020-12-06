import { ADD_L_REVIEW , GET_L_REVIEW} from "../actions/types.js";

const initialState = {
    // something: 'text',
    lReview: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_L_REVIEW:
            return {
                ...state,
                lReview: action.payload
            }
        case ADD_L_REVIEW:
            return {
                ...state,
                lReview: [...state.lReview, action.payload]
            }
        default:
            return state;
    }
}