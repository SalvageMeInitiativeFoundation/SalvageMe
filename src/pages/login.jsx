import React from "react";
import { Link } from "react-router-dom";

function Login(){
    return (<>
        
       
        <div className="LoginForm">  
        <h3 style={{textAlign:"center"}}>Welcome Back</h3>
        <form>
        <div>
        <label htmlFor="Email">Email</label><br></br>
        <input type="email" name="Email" id="" placeholder="Enter email address or username" required={true}/>
        </div><br></br>
        <div>
        <label htmlFor="Password">Password</label><br></br>
        <input type="password" name="Password" id="" placeholder="Enter your password" required={true}/><br></br>
        </div>
        <p style={{textAlign:"right",color:"#9747ff",cursor:"pointer"}}>Forgot password?</p>
        <button  className="LogInButton" type="submit">Login</button>
        <p  style={{textAlign:"center"}}>Already have an account?<Link to='/signUp'>SignUp</Link></p>
        </form>
        </div>

        
    </>)
}

export default Login;