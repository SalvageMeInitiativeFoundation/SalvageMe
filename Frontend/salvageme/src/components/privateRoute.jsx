import React from "react";
import { Outlet,Navigate } from "react-router-dom";

function PrivateRoute(){

    const auth=true;
    return(auth?<Outlet/>:<Navigate to={'/login'}/>)

}
export default PrivateRoute;