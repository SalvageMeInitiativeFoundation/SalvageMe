import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {MdCloudUpload} from 'react-icons/md';


function SignUp() {
  const [selectedImage,setSelectedImage]=useState(null);
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    
    if (!selectedImage) {
      setPreview(null)
      console.log('se'+ selectedImage)
      return
  }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)
 
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
 }, [selectedImage])


 
  const navigate = useNavigate();
  const [SignUpForm, setSignUpForm] = useState(
    {
      email: "",
      username: "",
      password: "",
      linkedin: "",
      image: "",
      confirmPassword: "",
    }
    // aacount type can be user,volunteer or partner
  );

  const mypic = new FormData();
  const acceptedExt = ["image/png", "image/jpg", "image/jpeg"];

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    if (acceptedExt.includes(e.target.files[0].type)) {
      mypic.append("mypic", e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      console.log('file')
      console.log(URL.createObjectURL(e.target.files[0]))
      setSelectedImage(e.target.files[0])
      handleUpload(e);
      // setSelectedImage(null)   
    }

    setSignUpForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  };

  const { email, username, password, linkedin, confirmPassword } =
    SignUpForm;

  const signUpUser = async () => {
    if (password === confirmPassword) {
      delete SignUpForm.confirmPassword;
      try {
        const urlResponse = await axios.post(
          "http://localhost:5000/salvageme/picture/image-upload",
          mypic
        );
        const imageUrl = urlResponse.data().imageUrl;
        const signUpData = { ...SignUpForm, image: imageUrl };
        const signUpUserResponse = await axios.post(
          "http://localhost:5000/salvageme/auth/createUser",
          signUpData
        );
        if (signUpUserResponse.status() === 200) {
          console.log(signUpUserResponse.data());
          // TODO:write implementation to store data locally  for future reference
          
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="SignUpForm">
        <h3 style={{ textAlign: "center" }}>Create Account</h3>

        <form onSubmit={signUpUser}>
          <div className="SignUpFormInput">
            <div>
              <div className="ProfileImageContainer">
              <label for='image'>
              {selectedImage!= null ?<img src={preview} alt="Profile image" className="ProfileImage"/>:<MdCloudUpload size={80} className="ProfileImage"/> } 
              </label>
              </div>

              <input
                type="file"
                name="ProfileImage"
                id="image"
                onChange={handleChange}
                accept="image/*"
                hidden
              />
            </div>
            <div>
              <div>
                <label htmlFor="username">Profile Name</label>
                <br></br>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your profile name"
                  required={true}
                  onChange={handleChange}
                  value={username}
                />
              </div>
              <br></br>
              <div>
                <label htmlFor="Email">Email</label>
                <br></br>

                <input
                  type="email"
                  name="Email"
                  id="email"
                  placeholder="Enter email address or username"
                  required={true}
                  onChange={handleChange}
                  value={email}
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
                  onChange={handleChange}
                  value={password}
                />
              </div>
              <br></br>
              <div>
                <label htmlFor=" ConfirmPassword"> Confirm password</label>
                <br></br>
                <input
                  type="password"
                  name="ConfirmPassword"
                  id="confirmPassword"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={confirmPassword}
                />
              </div>
              <br></br>
              <div>
                <label htmlFor=" LinkedIn"> LinkedIn profile</label>
                <br></br>
                <input
                  type="Link"
                  name="LinkedIn"
                  id="linkedIn"
                  placeholder="Enter your LinkedIn Profile Link"
                  required={true}
                  onChange={handleChange}
                  value={linkedin}
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
