import React from "react";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import { categoriesData } from "../Assets/data";
import { isEmailValid, isPasswordValid, isContactValid } from "../../utils/middleware";

const Footer = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");
    // ERRORS
    const [emailError, setEmailError] = useState("");
    const [contactError, setContactError] = useState("");
  
  
    const validateEmail = (value) => { 
        setEmail(value);
        let emailRes = isEmailValid(value);
        setEmailError(emailRes[1] ? emailRes[1] : "");
    };  

    const handleContact = (e) => {
        e.preventDefault();
    
        if (e.target !== e.currentTarget) {
          return;
        }
    
        const payload = {
            name: username,
            email: email,
            contact: contact,
            message: message
        };
    
        props.signUp(payload);
      }

  return (
    <FooterSection id="contact">
      <Layout>
        <LeftSide>
          <h2>Important links</h2>
          <p>
            <a href="/">Home</a>
          </p>
          <p>
            <a href="/about">About</a>
          </p>
          <p>
            <a href="/home/services">Services</a>
          </p>
          <p>
            <a href="/home/reviews">Reviews</a>
          </p>
        </LeftSide>

        <Main>
          <h2>Location</h2>
          <p>
            We love our customers, so feel free to visit us at WAAS in Lagos.
          </p>
          <p>WAAS, Lagos</p>
          <p>Call Us: +233559553056</p>
          <p>
            or <a href="mailto:info@cleanforce.tech">Leave a mail</a>
          </p>
        </Main>

        <RightSide>
          <h2>Contact Us</h2>
          <Form>
            <form>
              <div className="inputbox-wrap">
                <div className="inputbox">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required="required"
                  />
                  <span>Name</span>
                </div>
              </div>

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
                <textarea
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  required="required"
                />
              </div>

              <div className="inputbox">
                <input
                  type="button"
                  disabled={!(message && email && contact) ? true : false}
                  onClick={(event) => handleContact(event)}
                  value="Send"
                />
              </div>
            </form>
          </Form>
        </RightSide>
      </Layout>

      <Copyright>
        <p className="text-center">
          Copyright © 2023{" "}
          <a href="/" className="text-center">
            CLEANFORCE
          </a>
          . All rights reserved.
        </p>
        <p className="text-center">
          Designed by{" "}
          <a href="#" className="text-center">
            Koffi Cobbin
          </a>
        </p>
      </Copyright>
      <div>
      For more information about SalvageMe and how you can get involved, 
      please contact us at info@salvageme.org or call us at +233-XXX-XXXX. 
      We look forward to hearing from you and working together to transform lives through education.
      </div>
    </FooterSection>
  );
};

const FooterSection = styled.div`
  margin-top: 10px;
  /* background-color: #3cb043; */
  background: linear-gradient(45deg, green, #3F704D);
  /* #3f704d; */
  color: white;
  padding: 10px;
  margin-bottom: 0;
  @media (max-width: 768px) {
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  h2 {
    color: #fff;
  }
  p {
    font-size: 12px;
    padding: 1px;
    line-height: 1.5;
    a {
      text-decoration: none;
      color: white;
    }
  }
  @media (min-width: 768px) {
    width: 80%;
    margin: 20px auto;
  }
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const LeftSide = styled.div`
  width: 30%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Main = styled.div`
  width: 30%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightSide = styled.div`
  width: 30%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Form = styled.div`
    /* background: #fff; */
    border-radius: 10px;
    margin: 20px;
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
        position: relative;
        &:last-child {
            margin-bottom: 0;
        }
    }
    & input{
        position: relative;
        padding: 11px 5px;
        border-radius: 10px;
        font-size: 1.2em;
        border: 2px solid #fff;
        outline: none;
        display: block;
        width: 100%;
        &:focus ~ span,
        &:valid ~ span {
            transform: translateX(-13px) translateY(-35px);
            font-size: 1em;
        }
    }
    & input[type=file]{
      border: none;
      padding-top: 0;
    }

    & textarea{
      width: 100%;
      border-radius: 10px;
      padding: 11px 5px;
    }

    & span {
        position: absolute;
        top: 14px;
        left: 20px;
        font-size: 1em;
        transition: 0.6s;
        font-family: sans-serif;
        background-color: #3F704D;
    }

    & [type=button] {
        width: 100%;
        background: #3F704D;
        color: #fff;
        border: 1px solid #fff;
        &:hover {
            background: linear-gradient(45deg, greenyellow, #3F704D);
        }
    }
    @media (max-width: 768px) {
        padding: 20px;
        & h1{
        font-size: 1.5em;
        }
        & span {
            top: 16px;
            font-size: 13px;
        }
    }
`;

const Copyright = styled.div`
  margin-top: 30px;
  p {
    font-size: 13px;
    margin: 10px auto;
    line-height: 1.5;
    .text-center {
      color: white;
      text-decoration: none;
      margin: 1 2px;
      padding: 5px;
      font-weight: 600;
    }
  }
`;

export default Footer;
