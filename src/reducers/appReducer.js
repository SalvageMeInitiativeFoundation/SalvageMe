import { SET_LOADING_STATUS, SET_LOADING_MESSAGE, SET_ERRORS } from "../actions/actionType";

export const initState = {
    loading: false,
    loading_message: null,
    errors: null,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            };
        
        case SET_LOADING_MESSAGE:
            return {
                ...state,
                loading_message: action.loading_message,
            };

        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors,
            };
        default:
            return state;
    }
}


export default appReducer;