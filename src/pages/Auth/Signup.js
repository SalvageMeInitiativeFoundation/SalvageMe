import React from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-toastify";
import { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUpAPI } from "../../actions";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";
import { isEmailValid, isPasswordValid, isContactValid, isConfirmPassword } from "../../utils/middleware";


const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ERRORS
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [contactError, setContactError] = useState("");

    //Loading
    const [isLoading,setIsLoading]=useState(false);
    const [isSignupError,setIsSignupError]=useState(false);

    //Navigation
    const navigate=useNavigate();

    //context
    const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)

    const validateEmail = (value) => { 
        
        setEmail(value);
        let emailRes = isEmailValid(value);
        setEmailError(emailRes[1] ? emailRes[1] : "");
    }; 

    const validatePassword = (value) => { 
        setPassword(value);
        let paswdRes = isPasswordValid(value);
        setPasswordError(paswdRes[1] ? paswdRes[1] : "");
    }; 

    const handleConfirmPasswordChange=(value)=>{
       setConfirmPassword(value);
       validateConfirmPassword(value);
    }

    const validateConfirmPassword = (value) => { 
      
        let passwordInput={
            'password':password,
            'confirmPassword':value,
        }
        if(confirmPassword.length>0){
        let conPaswdRes = isConfirmPassword(passwordInput,setConfirmPasswordError)
        // conPaswdRes?setConfirmPasswordError(""):setConfirmPasswordError("Confirm password is not matched");
        console.log('confirm password response',conPaswdRes);
        }
        
        // setConfirmPasswordError(conPaswdRes ? "Password mismatch" : "");
    }; 

    const validateContact = (value) => { 
        setContact(value);
        let contactRes = isContactValid(value);
        setContactError(contactRes[1] ? contactRes[1] : "");
    }; 

    const handleSignup = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const payload = {
            username: username,
            email: email,
            contact: contact,
            password: password
        };
        try {
            const signUpUserResponse = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/auth/createUser`,
                payload
              );
              if (signUpUserResponse.status== 200) {
                // console.log('===========signup response======')
                // console.log(signUpUserResponse.data._doc);
                setLocalUser(signUpUserResponse.data._doc);
                setIsLoading(false);
                toast.success('Account Succesfully Created',{
                  position: toast.POSITION.TOP_RIGHT
              })
                navigate("/");
                reset();
              }
              else{
                setIsLoading(false);
              setIsSignupError(true)
              setTimeout(()=>{
                setIsSignupError(false);
              },3000)
            } 
        } catch (error) {
            setIsLoading(false);
            toast.error('Couldn\'t create account',{
              position: toast.POSITION.TOP_RIGHT
          });
            console.log(error);
            
        }

        // props.signUp(payload);
      }

    const reset = () => {
        setEmail("");
        setUsername("");
        setContact("");
        setPassword("");
    };

    useEffect(() => {
        if (props.errors){
            if (props.errors.email){
                setEmailError(props.errors.email[0]);
            }
            if (props.errors.contact){
                setContactError(props.errors.contact[0]);
            }
        }
    }, [ ]);

    return (
        <Container>
            {/* {(props.user || props.activate_user) && <Navigate to='/' />} */}
            <Section>
                <FormSection>
                    <Form>
                        <h1>Join Us Now!</h1>
                        {isSignupError&&<span style={{color:"red",textAlign: "center"}}>Couldn't Create Account</span> }
                        <form>
                            <div className="inputbox-wrap">
                                <div className="inputbox">
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => validateEmail(e.target.value)} 
                                        required="required" 
                                    />
                                    <span>Email</span>
                                </div>
                                {emailError && <p>{emailError}</p>}
                            </div>

                            <div className="inputbox-wrap">
                                <div className="inputbox">
                                    <input 
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required="required" 
                                    />
                                    <span>Username</span>
                                </div>
                            </div>
                            
                            <div className="inputbox-wrap">
                                <div className="inputbox">
                                    <input 
                                        type="tel"
                                        value={contact}
                                        onChange={(e) => validateContact(e.target.value)} 
                                        required="required" 
                                    />
                                    <span>Contact</span>
                                </div>
                                {contactError && <p>{contactError}</p>}
                            </div>

                            <div className="inputbox-wrap">
                                <div className="inputbox">
                                    <input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => validatePassword(e.target.value)} 
                                        required="required" 
                                    />
                                    <span>Password</span>
                                </div>
                                {passwordError && <p>{passwordError}</p>}
                            </div>

                            <div className="inputbox-wrap">
                                <div className="inputbox">
                                    <input 
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => handleConfirmPasswordChange(e.target.value)} 
                                        required="required" 
                                    />
                                    <span>Confirm Password</span>
                                </div>
                                {confirmPasswordError && <p>{confirmPasswordError}</p>}
                            </div>

                            <div className="inputbox">
                                <input 
                                    type="button"
                                    disabled={!(password && email && contact)? true : false}
                                    onClick={(event) => !isLoading?handleSignup(event):null}
                                    value={ isLoading?"SingingUp..." : "submit" }
                                />
                            </div>
                        </form>
                        <Link to="/login">Already a member? <em className="olduserlink" >Log in</em> </Link>
                    </Form>

                </FormSection>
                <Hero>
                    <div>
                        <img src="/images/donate3.jpg" alt="SignUp" />
                    </div>
                </Hero>
            </Section>

        </Container>
    );
};

const Container = styled.div`
    max-width: 100%;
    padding: 20px 0;
    background: linear-gradient(#000, #fa8128, #fff);
`;

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    align-items: flex-start;
    justify-content: space-between;
    align-items: center;
    max-width: 1128px;
    background-color: #fff;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 80px;
    padding: 20px 0;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.1);
    /* border: 1px solid black; */
    @media (min-width: 768px) and (max-width: 1023px){
        width: 90%;
    } 

    @media (min-width: 1024px) {
        width: 70%;
    } 
    @media (max-width: 768px) {
        width: 95%;
    }
`;

const FormSection = styled.div`
    width: 48%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    /* border: 1px solid blue; */
    @media (max-width: 768px) {
        width: 100%;
    }
`;


const Form = styled.div`
    padding: 50px;
    background: #fff;
    border-radius: 30px;
    /* border: 1px solid green; */
    & h1{
        border-left: 5px solid #ff8c00;
        padding: 10px;
        color: #000;
        letter-spacing: 5px;
        margin-bottom: 35px;
        font-weight: bold;
        padding-left: 10px;
    }
    & .inputbox-wrap {
        & p {
            text-align: left;
            padding-left: 10px;
            color: red;
        }
        margin-bottom: 30px;
    }
    & .inputbox {
        height: 50px;
        padding: 0;
        /* border: 1px solid green; */
        position: relative;
        &:last-child {
            margin-bottom: 0;
        }
    }
    & input {
        position: relative;
        padding: 11px 5px;
        border-radius: 10px;
        font-size: 1.2em;
        border: 2px solid #000;
        outline: none;
        display: block;
        width: 95%;
        &:focus ~ span,
        &:valid ~ span {
            transform: translateX(-13px) translateY(-35px);
            font-size: 1em;
        }
    }

    & .olduserlink{
    color: #ff8c00
    }

    & span {
        position: absolute;
        top: 14px;
        left: 20px;
        font-size: 1em;
        transition: 0.6s;
        font-family: sans-serif;
    }

    & [type="button"] {
        width: 100%;
        background: #ffcd90;
        color: #fff;
        border: #fff;
        &:hover {
            background: #ff8c00;
        }
    }

    & a {
        text-decoration: none!important;
        color: #080808;
        margin-top: 10px;
        font-size: 13px;
    }
    
    @media (max-width: 768px) {
        padding: 0 20px;
        & h1{
        font-size: 1.5em;
        }
    }
`;

const Google = styled.button`
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 50px;
    width: 100%;
    border: 1px solid dodgerblue;
    border-radius: 10px;
    vertical-align: middle;
    z-index: 0;
    transition-duration: 167ms;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin: 10px auto;
    &:hover{
        background-color: rgba(207, 207, 207, 0.25);
        color: rgba(0, 0, 0, 0.75);
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;


const Hero = styled.div`
    width: 50%;
    overflow: hidden;
    /* border: 1px solid red; */
    div {
        height: fit-content;
        width: 400px;
        background: #fff;
        &>img{
            height: 400px;
            border-radius: 30px; 
            /* border: 1px solid blue; */
        }
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        errors: state.appState.errors,
        activate_user: state.userState.activate_user,
    }
};

const mapDispatchToProps = (dispatch) => ({
    signUp: (payload) => dispatch(signUpAPI(payload)),
    signupWithGoogle: () => dispatch(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);