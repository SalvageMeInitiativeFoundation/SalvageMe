import { useState } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Donate = (props) => {
  const subject = "Donation";
  const salvageMeMail = "salvagemeinitiative@gmail.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bookQuantity, setBookQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const sendEmail = () => {
    // Use the email service API to send the email
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual IDs
    emailjs
      .send(
        `${process.env.REACT_APP_YOUR_SERVICE_ID}`,
        `${process.env.REACT_APP_YOUR_TEMPLATE_ID}`,
        {
          from_name: email,
          to_email: salvageMeMail,
          subject: subject,
          message: `Donation from ${name} at ${location}, ${bookQuantity} potential donations`,
          name: name,
        },
        `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
      )
      .then(
        (response) => {
          toast.success("Thank for Donating, we will get back to you.", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "donate-success",
          });
          props.close();
          setName("");
          setEmail("");
          setLocation("");
          setBookQuantity(0);
          //console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          //console.log('FAILED...', err);
          toast.error("Error occurred submitting your donation, try again.", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "donate-error",
          });
        }
      );
  };

  return (
    <Modal close={props.close}>
      <Wrapper>
        <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ textAlign: "center" }}>Support Literacy</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
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
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Book quantity</label>
            <input
              type="number"
              id="quantity"
              value={bookQuantity}
              onChange={(e) => setBookQuantity(e.target.value)}
              required
            />
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

export default Donate;
