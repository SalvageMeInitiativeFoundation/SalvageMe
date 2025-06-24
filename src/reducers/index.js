import { combineReducers } from "redux";
import userReducer from "./userReducer";
import donationReducer from "./donationReducer";
import appReducer from "./appReducer";


const rootReducer = combineReducers({
    appState: appReducer,
    userState: userReducer,
    donationState: donationReducer,
});

export default rootReducer;
