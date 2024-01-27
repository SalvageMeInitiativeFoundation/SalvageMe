import React, { useState } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import emailjs from "emailjs-com";
import axios from "axios";
import {toast} from "react-toastify";
import { v4 as uuidv4, } from "uuid";


const Support = (props) => {
  const subject = 'Support MoMO Payment';
  const salvageMeMail='salvagemeinitiative@gmail.com';
  const [MSISDN, setNumber] = useState("");
  const [amount, setAmount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isError, setIsError] = useState(false);
  const [uniqueId, setUniqueId] = useState("");

  const MakePayment = async () => {
    setIsLoading(true);
    // console.log('loggiiiiiiiiiiiiiiiiiiiiiiiiiiiiiin')
    const _uid = uuidv4();
    setUniqueId(_uid);
    const data = {
      "amount": amount,
      "currency": "GHS",
      "XReferenceId": _uid,
      "externalId": _uid,
      "payer": {
        "partyIdType": "MSISDN",
        "partyId": "233"+MSISDN.slice(1, MSISDN.length),
      },
      "payerMessage": "SalvageMe Donation",
    };
    // console.log('data momo',data)
    try {
      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/payment/makePayment`,
        data
      );
        //  console.log('creating payment')
      if (paymentResponse.status == 200) {
        setIsLoading(false);
        setVerify(true);
        // console.log('===============Login===============')
        // console.log(loginResponse.data)
        toast.success("Payment initiated, Complete transaction offline using my approvals", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Error Initiating payment", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      toast.error("Server Error Initiating payment", {
        position: toast.POSITION.TOP_RIGHT,
      });
      //console.log(error);
    }
  };

  const verifyPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log('refid',uniqueId)
    const data = { "externalId": uniqueId};
    try {
      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/payment/verifyPayment`,
        data
      );
        //  console.log('=====response',paymentResponse)
      if (paymentResponse.status == 200) {
        setVerify(false);
        // console.log('===============Login===============')
        // console.log(loginResponse.data)
        setIsLoading(false);
        toast.success("Payment successfull,", {
          position: toast.POSITION.TOP_RIGHT,
        });
        sendEmail();
        props.close()

      } else {
        setVerify(false);
        // console.log('===============Login===============')
        // console.log(loginResponse.data)
        setIsLoading(false);
        toast.error("Error verifying payment", {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.close()

      }
    } catch (error) {
      // console.log('Server error',error)
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      toast.error("Please approve payment", {
        position: toast.POSITION.TOP_RIGHT,
      });
      //console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MakePayment()
    // setNumber("");
    // setAmount(5);
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
        message: `GHS ${amount} support from ${MSISDN}`,
        name:"SalvageMe",
      },
      `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
    ).then((response) => {
      toast.success('Thank for Donating');
      // console.log('SUCCESS!', response.status, response.text);
   }, (err) => {
      console.log('FAILED to send mail...', err);
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
              placeholder="0XXXXXXXXX"
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
          {!verify&&<button type="submit">{isLoading?"Processing":"Pay"}</button>}
          {verify&&<button type="button" onClick={verifyPayment}>{isLoading?"Processing":"I have paid"}</button>}

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
    font-Weight:bold;
  }
`;

export default Support;
