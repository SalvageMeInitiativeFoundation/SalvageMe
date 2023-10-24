import React, { useState } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import { isPasswordValid, isConfirmPassword } from "../../utils/middleware";


const PasswordReset = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ERRORS
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    pswdReset();
    setNewPassword("");
    props.close();
  };

  const validatePassword = (value) => {
    setNewPassword(value);
    let paswdRes = isPasswordValid(value);
    setPasswordError(paswdRes[1] ? paswdRes[1] : "");
  };

  const pswdReset = () => {
    if (isConfirmPassword(newPassword, isConfirmPassword)){
      // Handles password reset api here

    }
  };

  return (
    <Modal close={props.close}>
      <Wrapper>
        <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h2 style={{textAlign: "center"}}>Password Reset</h2>          
        <div className="inputbox-wrap">
            <div className="inputbox">
              <span>New password</span>
                <input
                type="password"
                value={newPassword}
                onChange={(e) => validatePassword(e.target.value)}
                required="required"
                />
            </div>
            {passwordError && <p>{passwordError}</p>}
            </div>
        <div className="inputbox-wrap">
            <div className="inputbox">
              <span>Confirm new password</span>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required="required"
                />
            </div>
        </div>
        <button type="submit">Submit</button>
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
  }
`;

export default PasswordReset;
