import { SET_LOADING_STATUS, GET_EVENTS, SET_CATEGORIES, 
    SET_CREATE_EVENT_STATUS, SET_LOADING_MESSAGE, SET_ERRORS } from "../actions/actionType";

export const initState = {
    events: [],
    loading: false,
    loading_message: null,
    apiCategories: null,
    createEventStatus: null,
    errors: null,
}

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
            };

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

        case SET_CATEGORIES:
            return {
                ...state,
                apiCategories: action.apiCategories,
            };

        case SET_CREATE_EVENT_STATUS:
            return {
                ...state,
                createEventStatus: action.createEventStatus,
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


export default eventReducer;