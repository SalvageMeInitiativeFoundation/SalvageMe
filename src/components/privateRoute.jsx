import React, { useContext, useEffect } from "react";
import { Outlet,Navigate,useLocation } from "react-router-dom";
import {UserContext} from "../context/userContext/userContext";

function PrivateRoute(){
    const location=useLocation();
    
    const {user}=useContext(UserContext)
   
    
    return(user?<Outlet/>:<Navigate to={'/login'} state={location.pathname}/>)

}
export default PrivateRoute;