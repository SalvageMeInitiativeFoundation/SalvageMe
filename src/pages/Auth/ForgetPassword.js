import React, { useState } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import emailjs from 'emailjs-com';
import { MdReportGmailerrorred } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const ForgetPassword = (props) => {
  const subject = 'Forget Password';
  const salvageMeMail='salvagemeinitiative@gmail.com';
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e) => {
    let data = {
      'email':email,
    }
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/resetPasswordRequest`,data)
      if(res.status==200){
        setEmail("");
        toast.success('Password reset link sent to your email successfully');
        props.close();

      }else{
        const msg = res?.data?.message || 'Could not send reset link';
        toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Check internet connection';
      toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  };


  return (
    <Modal close={props.close}>
      <Wrapper>
        <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h2 style={{textAlign: "center"}}>Forget Password</h2>          
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(10px) brightness(70%);
  padding: 30px;
  border-radius: 30px;
  text-align: left;
  color: white;

  input{
    background: transparent;
    border: 1px solid white;
    border-radius: 10px;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
    outline: none;
    color: #fff;
  }

  button {
    background-color: #ff8c00;
    padding: 15px 20px 15px 20px;
    border-radius: 10px;
    width: 100%;
    border: none;
    outline: none;
    color: white;
    cursor: default;
    font-weight: 600;
  }
`;

export default ForgetPassword;
