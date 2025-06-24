import { ACTIVATE_USER, SET_USER, SET_USER_TOKEN, SET_USER_ORDER } from "../actions/actionType";


const INITIAL_STATE = {
    user: true, //JSON.parse(localStorage.getItem('user')),
    activate_user: false,
    token: JSON.parse(localStorage.getItem('user-token')),
    order: JSON.parse(localStorage.getItem('user-order')),
};


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case SET_USER:
            if (action.user===null){
                localStorage.removeItem('user');
                localStorage.removeItem('user-token');
            }
            else {localStorage.setItem('user', JSON.stringify(action.user));}
            return {
                ...state,
                user: action.user
            };

        case ACTIVATE_USER:
            return {
                ...state,
                activate_user: action.activate
            };

        case SET_USER_TOKEN:
            localStorage.setItem('user-token', JSON.stringify(action.token));
            return {
                ...state,
                token: action.token
            };

        case SET_USER_ORDER:
            localStorage.setItem('user-order', JSON.stringify(action.order));
            return {
                ...state,
                order: action.order
            };
        default:
            return state;
    }
}

export default userReducer;
