import React from "react";
import { Link } from "react-router-dom";

function Login(){
    return (<>
        <main className="Login">
       
        <div className="LoginForm">
        <form>
        <h3 style={{textAlign:"center"}}>Welcome Back</h3>
        <label htmlFor="Email">Email</label><br></br>
        <input type="email" name="Email" id="" placeholder="Enter email address or username" required={true}/><br></br>
        <label htmlFor="Password">Password</label><br></br>
        <input type="password" name="Password" id="" placeholder="Enter your password" required={true}/><br></br>
        <p style={{textAlign:"right"}}>Forgot password?</p>
        <button type="submit">Login</button>
        <p style={{textAlign:"center"}}>Already have an account?<Link to='/signUp'>SignUp</Link></p>
        </form>
        </div>

        </main>
    </>)
}

export default Login;