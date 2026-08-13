import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

function Login() {
  const history = useLocation();
  // console.log('==============history=====')
  // console.log(history);
  const { setLocalUser, getLocalUser, setUser, user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // console.log(loginData)
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log('loggiiiiiiiiiiiiiiiiiiiiiiiiiiiiiin')
    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/loginUser`,
        loginData
      );
      //    console.log(loginResponse.data)
      if (loginResponse.status == 200) {
        setLocalUser(loginResponse.data);
        // console.log('===============Login===============')
        // console.log(loginResponse.data)
        setIsLoading(false);
        toast.success('Sign In Successful',{
            position: toast.POSITION.TOP_RIGHT
        });

        // TODO:Write implementaion to store value in local storage
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      const msg = error?.response?.data?.message || error?.message || 'Error Signing In';
      toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
      console.error(error);
    }
    
  };
  const { email, password } = loginData;
  return (
    <>
      <div className="LoginForm">
        <h3 style={{ textAlign: "center" }}>Welcome Back</h3>
        {history.state != null && (
          <span style={{ color: "red", textAlign: "center" }}>
            Login to {history.state.replace("/", "")}
          </span>
        )}
        {isError && <br></br>}
        {isError && (
          <span style={{ color: "red", textAlign: "center" }}>
            Incorrect username and password
          </span>
        )}
        <form onSubmit={LoginUser}>
          <div>
            <label htmlFor="Email">Email</label>
            <br></br>
            <input
              type="email"
              name="Email"
              id="email"
              placeholder="Enter email address or username"
              required={true}
              value={email}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="Password">Password</label>
            <br></br>
            <input
              type="password"
              name="Password"
              id="password"
              placeholder="Enter your password"
              required={true}
              value={password}
              onChange={handleChange}
            />
            <br></br>
          </div>
          <p
            style={{ textAlign: "right", color: "#9747ff", cursor: "pointer" }}
          >
            Forgot password?
          </p>
          <button className="LogInButton" type="submit">
            {isLoading ? "Loading...." : "Login"}
          </button>
          <p style={{ textAlign: "center" }}>
            Already have an account?<Link to="/signUp">SignUp</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
