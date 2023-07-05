import { combineReducers } from "redux";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";


const rootReducer = combineReducers({
    userState: userReducer,
    eventState: eventReducer,
});

export default rootReducer;
