import React, { useState } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import emailjs from "emailjs-com";
import {toast} from "react-toastify";


const Support = (props) => {
  const subject = 'Support';
  const salvageMeMail='salvagemeinitiative@gmail.com';
  const [MSISDN, setNumber] = useState("");
  const [amount, setAmount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
    setNumber("");
    setAmount(5);
    props.close()
  };


  //  TODO:    MOMO API INTEGRATION HERE




  const sendEmail = () => {
    // This email implementation has to change for the purpose of alerting Admin if someone supports
    // Use the email service API to send the email
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual IDs
    emailjs.send(
      `${process.env.REACT_APP_YOUR_SERVICE_ID}`,
      `${process.env.REACT_APP_YOUR_TEMPLATE_ID}`,
      {
        from_name:"yaphetofori@gmail.com", // TODO: this needs to change
        to_email: salvageMeMail,
        subject: subject,
        message: `GHS {amount} support from ${MSISDN}`,
        name:"SalvageMe",
      },
      `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
    ).then((response) => {
      toast.success('Thank for Donating');
      console.log('SUCCESS!', response.status, response.text);
   }, (err) => {
      console.log('FAILED...', err);
   });
    
  };


  return (
    <Modal close={props.close}>
      <Wrapper>
        <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h2 style={{textAlign: "center"}}>Support Literacy ❤️</h2>  
          <div>
            <label htmlFor="location">MoMo Number</label>
            <input
              type="text"
              id="MSISDN"
              value={MSISDN}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="233XXXXXXXXX"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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

export default Support;
