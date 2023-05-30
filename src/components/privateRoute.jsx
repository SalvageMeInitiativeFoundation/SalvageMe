import React, { useContext, useEffect } from "react";
import { Outlet,Navigate,useLocation } from "react-router-dom";
import {UserContext} from "../context/userContext/userContext";

function PrivateRoute(){
    const location=useLocation();
    console.log('=====Location in private route===')
    console.log(location);
    const {getLocalUser,setUser,user}=useContext(UserContext)
    // useEffect(()=>{
    //     getLocalUser();
    //    },[])
    return(user.length>0?<Outlet/>:<Navigate to={'/login'} state={location.pathname}/>)

}
export default PrivateRoute;