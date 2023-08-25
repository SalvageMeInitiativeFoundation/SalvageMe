import { GET_BOOKS, SET_CATEGORIES, SET_CREATE_DONATION_STATUS } from "../actions/actionType";

export const initState = {
    books: [],
    apiCategories: null,
    createDonationStatus: null
}

const donationReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
            };

        case SET_CATEGORIES:
            return {
                ...state,
                apiCategories: action.apiCategories,
            };

        case SET_CREATE_DONATION_STATUS:
            return {
                ...state,
                createDonationStatus: action.createDonationStatus,
            };
            
        default:
            return state;
    }
}


export default donationReducer;