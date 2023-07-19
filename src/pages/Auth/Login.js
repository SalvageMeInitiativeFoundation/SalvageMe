import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAPI } from "../../actions";
import { useNavigate } from "react-router-dom";
import { setLoading, setLoadingMessage } from "../../actions";
import { isEmailValid, isPasswordValid, isContactValid } from "../../utils/middleware";


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    // const [loginChoice, setLoginChoice] = useState("");
    // ERRORS
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    // const [contactError, setContactError] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const handleRedirect = (url) => {
        if (url){
            navigate(url);
        }
        else{
            navigate('/');
        }
      };

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

    // const validateContact = (value) => { 
    //     setContact(value);
    //     let contactRes = isContactValid(value);
    //     setContactError(contactRes[1] ? contactRes[1] : "");
    // }; 


    const handleLogin = (e) => {
        e.preventDefault();
    
        if (e.target !== e.currentTarget) {
          return;
        }
    
        const payload = {
          email: email,
          password: password,
          //   contact: contact,
        };
    
        props.signIn(payload);
      }

    const reset = () => {
        setEmail("");
        setPassword("");
        // setContact("");
    };

    useEffect(() => {
        if (props.errors){
            if (props.errors.login){
                setLoginError(props.errors.login);
            }
        }
        if (props.user){
            props.closeLoader();
            handleRedirect(props.previous_url);
        }
    }, [props.errors, props.user, props.previous_url]);

    return (
        <Container>
            {/* {props.user && <Navigate to='/' />}  */}
             <Section>
                <FormSection>
                    <Form>
                        <h1>Welcome back!</h1>
                        <form>
                            {/* <LoginType>
                                <label for="login-choice">Select login method</label>
                                <Options>
                                    <Option onClick={()=>{setLoginChoice("email")}}>
                                        Email
                                    </Option>
                                    <Option className="contact" onClick={()=>{setLoginChoice("contact")}}>
                                        Contact
                                    </Option>
                                </Options>
                            </LoginType> */}
                            
                            {loginError && <p style={{color:"red", margin:"-10px 0 30px 0"}}>{loginError}</p>}

                            {/* { loginChoice === "email" && */}
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

                            {/* { loginChoice === "contact" &&
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
                            } */}

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

                            <div className="inputbox">
                                <input 
                                    type="button" 
                                    value="submit" 
                                    onClick={handleLogin}
                                    disabled={!((password && email) || (password && contact)) ? true : false}
                                />
                            </div>
                        </form>
                        {/* <hr/>
                        <Google onClick={() => props.signIn()}>
                            <img src="/images/icons/google.svg" alt="Google"></img>
                            Sign in with Google
                        </Google>
                        <hr/> */}
                        <Link to="/signup">New here? Sign up</Link>
                    </Form>

                </FormSection>
                <Hero>
                    <div>
                        <img src="/images/donate1.jpg" alt="SignUp" />
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

    @media (max-width: 768px) {
        padding: 0 20px;
        & h1{
        font-size: 1.5em;
        }
    }
`;

const LoginType = styled.div`
    font-size: 1em;
    font-family: sans-serif;
    text-align: left;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 30px;
`;

const Options = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Option = styled.button`
    width: 49%;
    height: 30px;
    color: rgba(0, 0, 0, 0.6);
    background-color: #E5E4E2; /* #B2BEB5;  #7393B3 #A9A9A9 #D3D3D3*/
    border: none;
    outline: none;
    &.active, &:hover {
        color: #fff;
        background-color: #ff8c00;
        border-bottom: 3px solid #000;
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
        previous_url: state.appState.previous_url,
        user: state.userState.user,
        errors: state.appState.errors,
    }
};

const mapDispatchToProps = (dispatch) => ({
    signIn: (payload) => dispatch(loginAPI(payload)),
    closeLoader: () => {
        dispatch(setLoadingMessage(null));
        dispatch(setLoading(false));
      },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
