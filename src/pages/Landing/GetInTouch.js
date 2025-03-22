import React, { useState } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { MdReportGmailerrorred } from "react-icons/md";
import { toast } from "react-toastify";

const GetInTouch = (props) => {
  const subject = "Get In Touch";
  const salvageMeMail = "salvagemeinitiative@gmail.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const sendEmail = () => {
    // Use the email service API to send the email
    emailjs
      .send(
        `${process.env.REACT_APP_YOUR_SERVICE_ID}`,
        `${process.env.REACT_APP_YOUR_TEMPLATE_ID}`,
        {
          from_name: email,
          to_email: salvageMeMail,
          subject: subject,
          message: message,
          name: name,
        },
        `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
      )
      .then(
        (response) => {
          toast.success("Email sent successfully, we will get back to you", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.close();
          setName("");
          setEmail("");
          setMessage("");
          // console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          // console.log('FAILED...', err);
          toast.error("Error occurred sending us a email, try again", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
  };

  return (
    <Modal close={props.close}>
      <Wrapper>
        <Form
          // action="https://formsubmit.co/54a6c8c4d6fea625aa1e1a32e5cc9bdf" method="POST"
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 style={{ textAlign: "center" }}>Reach Out</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
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

  input,
  textarea {
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

export default GetInTouch;
