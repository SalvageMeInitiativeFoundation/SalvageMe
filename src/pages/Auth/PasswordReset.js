import React, { useState, useEffect, useContext } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import { isPasswordValid, isConfirmPassword } from "../../utils/middleware";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext/userContext";

const PasswordReset = (props) => {
  const {removeLocalUser} =useContext(UserContext);

  // getting token and id from url
  const { token,id } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [tokenData, setTokenData] = useState(null);

  // ERRORS
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    pswdReset();
    setNewPassword("");
    // props.close();
  };

  const validatePassword = (value) => {
    setNewPassword(value);
    let paswdRes = isPasswordValid(value);
    setPasswordError(paswdRes[1] ? paswdRes[1] : "");
  };

  const pswdReset = async () => {
    if (isConfirmPassword(newPassword, confirmPassword)) {
      // Handles password reset api here
      let data = {
        password: newPassword,
      };
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/resetPassword/?token=${token}&id=${tokenData.userId}`,
          data
        );
        if (res.status == 200) {
          removeLocalUser();
          toast.success("Password reset successful");
          navigate("/login");
        } else {
          toast.error("Reset failed");
        }
      } catch (error) {
        toast.error("Reset failed");
        // console.log(error);
      }
    } else {
      toast.error("Complete form");
    }
  };

  const validToken = async () => {
    // write api call for token validation here
    // TODO:create this api
    // console.log('=========================validation=======================');
    // console.log(token);
    // console.log(id);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/resetTokenPreValidation/?token=${token}&id=${id}`
      );
      if (res.status == 200) {
        // console.log('======================validation data==================');
        // console.log(res.data);
        setTokenData(res.data);
        setIsValidToken(true);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("No internet");

      // console.log(error);
    }
  };

  useEffect(() => {
     validToken()
  }, []);

  return isLoading ? (
    <Loading />
  ) : !isLoading && isValidToken ? (
    <Modal close={props.close}>
      <Wrapper>
        <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ textAlign: "center" }}>Password Reset</h2>
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
  ) : (
    <ErrorWrapper>Link is Expired,Request New Password Reset Link</ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5erm;
`;

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

  input {
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
