import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <main className="SignUp">
        <div className="SignUpForm">
          <form>
            <h3 style={{ textAlign: "center" }}>Create Account</h3>
            <br></br>
            <div>
              <input type="file" name="ProfileImage" id="profileImage" />
              <p></p>
            </div>
            <label htmlFor="Email">Email</label>
            <br></br>
            <input
              type="email"
              name="Email"
              id="email"
              placeholder="Enter email address or username"
              required={true}
            />
            <br></br>
            <label htmlFor="Password">Password</label>
            <br></br>
            <input
              type="password"
              name="Password"
              id="password"
              placeholder="Enter your password"
              required={true}
            />
            <br></br>
            <label htmlFor=" ConfirmPassword"> Confirm password</label>
            <br></br>
            <input
              type="password"
              name="ConfirmPassword"
              id="ConfirmPassword"
              placeholder="Enter your password"
            />
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
            /></div>
            <br></br>
            <p style={{ textAlign: "right" }}>Forgot password?</p>
            <button type="submit">SignUp</button>
            <p style={{ textAlign: "center" }}>
              Already have an account?<Link to="/SignUp">SignUp</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignUp;
