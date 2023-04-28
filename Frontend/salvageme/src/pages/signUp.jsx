import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <div className="SignUpForm">
        <h3 style={{ textAlign: "center" }}>Create Account</h3>

        <form>
        <div className="SignUpFormInput">
          <div>
            <input type="file" name="ProfileImage" id="profileImage" />
            <p></p>
          </div>
          <div>
            <div>
              <label htmlFor="Email">Email</label>
              <br></br>

              <input
                type="email"
                name="Email"
                id="email"
                placeholder="Enter email address or username"
                required={true}
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
              />
            </div>
            <br></br>
            <div>
              <label htmlFor=" ConfirmPassword"> Confirm password</label>
              <br></br>
              <input
                type="password"
                name="ConfirmPassword"
                id="ConfirmPassword"
                placeholder="Enter your password"
              />
            </div>
            <br></br>
            <div>
              <label htmlFor=" ConfirmPassword"> LinkedIn profile</label>
              <br></br>
              <input
                type="Link"
                name="ConfirmPassword"
                id="ConfirmPassword"
                placeholder="Enter your password"
                required={true}
              />
            </div>
          </div>
          </div>
          
          <button className="SignUpButton" type="submit">
            SignUp
          </button>
        </form>
        <p style={{ textAlign: "center" }}>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
