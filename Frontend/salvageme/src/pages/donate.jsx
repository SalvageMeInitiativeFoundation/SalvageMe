import React from "react";
import DonorBook from "../components/donorBook";

function Donate(){
    return (<>
<main className="Login">
       
       <div className="LoginForm">
       <form>
       <h3 style={{textAlign:"center"}}>Welcome Hero</h3>
       <label htmlFor="Email">Email</label><br></br>
       <input type="email" name="Email" id="" placeholder="Enter email address or username" required={true}/><br></br>
       <label htmlFor="Password">Password</label><br></br>
       <input type="password" name="Password" id="" placeholder="Enter your password" required={true}/><br></br>
       <button type="submit">Donate</button>
       </form>
       </div>

       </main>        
    </>)
}

export default Donate;