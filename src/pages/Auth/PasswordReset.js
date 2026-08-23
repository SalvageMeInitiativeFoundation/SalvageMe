import React, { useState, useEffect, useContext } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import { isPasswordValid, isConfirmPassword } from "../../utils/middleware";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext/userContext";

const PasswordReset = () => {
  const { removeLocalUser } = useContext(UserContext);

  // Get token and ID from URL
  const { token, id } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  // Errors
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  /**
   * Validate password as the user types
   */
  const validatePassword = (value) => {
    setNewPassword(value);

    const passwordResult = isPasswordValid(value);

    setPasswordError(passwordResult?.[1] || "");

    // Revalidate confirm password if it has already been entered
    if (confirmPassword) {
      if (!isConfirmPassword(value, confirmPassword)) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  /**
   * Handle confirm password
   */
  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);

    if (value && !isConfirmPassword(newPassword, value)) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    pswdReset();
  };

  /**
   * Reset password
   */
  const pswdReset = async () => {
    // Validate password
    const passwordResult = isPasswordValid(newPassword);

    if (!passwordResult?.[0]) {
      setPasswordError(
        passwordResult?.[1] || "Please enter a valid password."
      );
      return;
    }

    // Validate password confirmation
    if (!isConfirmPassword(newPassword, confirmPassword)) {
      setConfirmPasswordError("Passwords do not match.");

      toast.error("Password mismatch", {
        position: toast.POSITION.TOP_RIGHT,
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const data = {
        password: newPassword,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/resetPassword/?token=${token}&id=${id}`,
        data
      );

      if (res.status === 200) {
        removeLocalUser();

        toast.success("Password reset successful", {
          position: toast.POSITION.TOP_RIGHT,
        });

        navigate("/login");

        return;
      }

      const msg = res?.data?.message || "Reset failed";

      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Reset failed";

      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Validate reset token
   */
  useEffect(() => {
    const validToken = async () => {
      if (!token || !id) {
        setIsValidToken(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/auth/resetTokenPreValidation/?token=${token}&id=${id}`
        );

        if (res.status === 200) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        setIsValidToken(false);

        const msg =
          error?.response?.data?.message ||
          "Token validation failed";

        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    };

    validToken();
  }, [token, id]);

  /**
   * Validate reset token
   */
  if (isLoading) {
    return <Loading />;
  }

  /**
   * Token is invalid or expired
   */
  if (!isValidToken) {
    return (
      <ErrorWrapper>
      <ErrorContent>

        <h2>Reset Link Expired</h2>

        <p>
          This password reset link is no longer valid or has expired.
          Please request a new link to reset your password.
        </p>

        <button onClick={() => navigate("/login#")}>
          Request New Reset Link
        </button>
      </ErrorContent>
    </ErrorWrapper>
    );
  }

  /**
   * Valid token
   */
  return (
    <Modal>
      <Wrapper>
        <Form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Password Reset</h2>

          <div className="inputbox-wrap">
            <div className="inputbox">
              <span>New password</span>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => validatePassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            {passwordError && (
              <p className="error">
                {passwordError}
              </p>
            )}
          </div>

          <div className="inputbox-wrap">
            <div className="inputbox">
              <span>Confirm new password</span>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  handleConfirmPassword(e.target.value)
                }
                required
                autoComplete="new-password"
              />
            </div>

            {confirmPasswordError && (
              <p className="error">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !newPassword || !confirmPassword || passwordError || confirmPasswordError}
          >
            {isSubmitting ? "Resetting..." : "Submit"}
          </button>
        </Form>
      </Wrapper>
    </Modal>
  );
};

const ErrorWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: linear-gradient(
    135deg,
    #f8f9fa 0%,
    #eef1f5 100%
  );
`;

const ErrorContent = styled.div`
  width: 100%;
  max-width: 450px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 45px 35px;

  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;

  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);

  text-align: center;

  h2 {
    margin: 20px 0 10px;

    color: #222;
    font-size: 24px;
    font-weight: 700;
  }

  p {
    margin: 0 0 25px;

    color: #666;
    font-size: 15px;
    line-height: 1.6;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    width: 100%;

    padding: 14px 20px;

    background-color: #ff8c00;
    color: white;

    border: none;
    border-radius: 10px;

    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    i {
      font-size: 14px;
    }

    &:hover {
      background-color: #e67e00;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
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

  gap: 15px;

  h2 {
    text-align: center;
    margin: 0 0 10px;
  }

  .inputbox-wrap {
    width: 100%;
  }

  .inputbox {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    box-sizing: border-box;

    background: transparent;
    border: 1px solid white;
    border-radius: 10px;

    width: 100%;
    height: 40px;

    margin-top: 5px;
    padding: 0 10px;

    outline: none;
    color: #fff;
  }

  input:focus {
    border-color: #ff8c00;
  }

  .error {
    color: red;
    margin: 5px 5px 0;
    font-size: 13px;
  }

  button {
    background-color: #ff8c00;

    padding: 15px 20px;

    border-radius: 10px;
    width: 100%;

    border: none;
    outline: none;

    color: white;

    cursor: pointer;
    font-weight: 600;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default PasswordReset;