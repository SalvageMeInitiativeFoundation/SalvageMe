import axios from "axios";
import React, { useState,useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {MdCloudUpload} from 'react-icons/md';
import {UserContext} from "../context/userContext/userContext";
import { toast } from "react-toastify";



function SignUp() {
  const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)
  const [selectedImage,setSelectedImage]=useState(null);
  const [preview, setPreview] = useState(null)
  const [picFile,setPicFile]=useState(null);
  const [isLoading,setIsLoading]=useState(false)
  const [isError,setIsError]=useState(false);
  const [validationError,setValidationError]=useState({})
  const [submittedBefore,setSubmittedBefore]=useState(false);
  const navigate = useNavigate();
  const [SignUpForm, setSignUpForm] = useState(
    {
      email: "",
      username: "",
      password: "",
      linkedin: "",
      image: "",
      confirmPassword: "",
      accountType:"user"
    }
    // aacount type can be user,volunteer or partner
  );

  const { email, username, password, linkedin, confirmPassword } =
  SignUpForm;


  useEffect(() => {
    if(submittedBefore==true){
      // console.log('sumitred before');
      setValidationError(formValidator(SignUpForm))
    }
    
    if (!selectedImage) {
      setPreview(null)
      // console.log('se'+ selectedImage)
      return
  }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)

 
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
 }, [selectedImage, email, username, password, linkedin, confirmPassword])


 

 
  const formValidator=(input)=>{  
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // TODO:test regex
    let inputError={}
    input.image=selectedImage
    if(input.image==null){
      inputError.image='Add a profile picture'
    }
    if (regex.test(input.email.trim())==false){
      inputError.email='Enter a valid email'

    }
    if (input.linkedin==''){
       inputError.linkedin='Enter a linkedin profile link'
      }
    if (input.username==''){
      inputError.username='Enter a username'

    }
    if (input.password==''){
      inputError.password='Enter a password'

    }
    if (input.confirmPassword!==input.password){
          inputError.confirmPassword='Password must match'
    }
    return inputError

  }


  const acceptedExt = ["image/png", "image/jpg", "image/jpeg"];

  async function handleUpload (e){
    e.preventDefault();
    // console.log(e.target.files[0]);
  
    if (acceptedExt.includes(e.target.files[0].type)) {
      // console.log('uploading')
      setPicFile(e.target.files[0]);
    //   for (var key of mypic.entries()) {
    //     console.log(key[0]+'-'+ key[1]);
    // }
    }
    
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      // console.log('file')
      setSelectedImage(e.target.files[0])
      handleUpload(e);
      // setSelectedImage(null)   
    }

    setSignUpForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  };

 
    async function  signUpUser (File,e){
      // console.log("===Signup data======");
      // console.log( email, username, password, linkedin, confirmPassword );
    e.preventDefault();
    setSubmittedBefore(true);
    setValidationError(formValidator(SignUpForm))
    setIsLoading(true);
    const mypic = new FormData()
    if (Object.keys(validationError).length==0 && selectedImage!=null) {
      let signUpFormRaw={...SignUpForm};
      delete signUpFormRaw.confirmPassword;
      // console.log('saving');
      try {
        
        mypic.append('mypic',File);
        const urlResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/picture/image-upload`,
          mypic,{
            headers: {
              // 'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': 'multipart/form-data',
            }
          },
         
        );
        
        // console.log(urlResponse.data.imageUrl);
        const signUpData = { ...signUpFormRaw, image: urlResponse.data.imageUrl };
        const signUpUserResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/createUser`,
          signUpData
        );
        if (signUpUserResponse.status== 200) {
          // console.log('===========signup response======')
          // console.log(signUpUserResponse.data._doc);
          setLocalUser(signUpUserResponse.data._doc)
          setIsLoading(false)
          toast.success('Account Succesfully Created',{
            position: toast.POSITION.TOP_RIGHT
        })
          navigate("/");
        }
      } catch (error) {
        setIsLoading(false);
        const msg = error?.response?.data?.message || error?.message || 'Could not create account';
        toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
        console.error(error);
      }
    }else{
      setIsLoading(false);
    setIsError(true)
    setTimeout(()=>{
      setIsError(false);
    },3000)
  } 
  };

  return (
    <>
      <div className="SignUpForm">
        <h3 style={{ textAlign: "center" }}>Create Account</h3>
        {isError&&<span style={{color:"red",textAlign: "center"}}>Complete all fields</span> }
        <form >
          <div className="SignUpFormInput">
            <div>
              <div className="ProfileImageContainer">
              <label for='image'>
              {selectedImage!= null ?<img src={preview} alt="Profile image" className="ProfileImage"/>:<MdCloudUpload size={80} className="CloudImage"/> } 
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
              {validationError.image&&<span style={{color:"red",textAlign: "center"}} >{validationError.image}</span>}
            </div>
            <div className="SignUpFormInputFormColumn">
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
                {validationError.username&&<span style={{color:"red",textAlign: "center"}} >{validationError.username}</span>}
              </div>
              
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="Email"
                  id="email"
                  placeholder="Enter email address or username"
                  required={true}
                  onChange={handleChange}
                  value={email}
                />
                {validationError.email&&<span style={{color:"red",textAlign: "center"}}>{validationError.email}</span>}
              </div>
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
                {validationError.password&&<span style={{color:"red",textAlign: "center"}}>{validationError.password}</span>}
              </div>
              <div>
                <label htmlFor=" ConfirmPassword"> Confirm password</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  id="confirmPassword"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={confirmPassword}
                />
                {validationError.confirmPassword&&<span style={{color:"red",textAlign: "center"}}>{validationError.confirmPassword}</span>}
              </div>
              <div>
                <label htmlFor=" LinkedIn"> LinkedIn profile</label>
                <input
                  type="Link"
                  name="LinkedIn"
                  id="linkedin"
                  placeholder="Enter your LinkedIn Profile Link"
                  required={true}
                  onChange={handleChange}
                  value={linkedin}
                />
                 {validationError.linkedin&&<span style={{color:"red",textAlign: "center"}}>{validationError.linkedin}</span>}

              </div>
            </div>
          </div>

          <button className="SignUpButton" type="button" onClick={(e)=>signUpUser(picFile,e)}>
            {isLoading?'Loading....':'SignUp'}
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
