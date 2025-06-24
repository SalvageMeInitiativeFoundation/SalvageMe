import React from "react";
import { Outlet,Navigate } from "react-router-dom";

function PrivateRoute1(){
    const auth=true;
    return(auth?<Outlet/>:Navigate('/login'))

}
export default PrivateRoute1;