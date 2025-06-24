import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import BackgroundSlider from "./BackgroundSlider";
import { Link } from "react-router-dom";
import { isEmailValid, isContactValid } from "../../utils/middleware";
import emailjs from 'emailjs-com';
import {toast} from "react-toastify";


const Home = () => {
  let { secId } = useParams();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const subject= 'Important: Join Our Team';
  const salvageMeMail='salvagemeinitiative@gmail.com'
  // ERRORS
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");

  const validateEmail = (value) => {
    setEmail(value);
    let emailRes = isEmailValid(value);
    setEmailError(emailRes[1] ? emailRes[1] : "");
  };

  const validateContact = (value) => {
    setContact(value);
    let contactRes = isContactValid(value);
    setContactError(contactRes[1] ? contactRes[1] : "");
  };

  const handlePartnership = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

  //  TODO:implement emailjs for volunteer and partnership
    sendEmail();
    
  };

  const handleClickScroll = () => {
    const element = document.getElementById("partner");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendEmail = () => {
    // Use the email service API to send the email
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual IDs
    emailjs.send(
      `${process.env.REACT_APP_YOUR_SERVICE_ID}`,
      `${process.env.REACT_APP_YOUR_TEMPLATE_ID}`,
      {
        from_name:email,
        to_email: salvageMeMail,
        subject: subject,
        message: message,
        name:`${username}\n,${contact}`,
      },
      `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
    ).then((response) => {
      toast.success('Email sent');
      setContact('');
      setEmail('');
      setUsername('');
      setMessage('');
      //console.log('SUCCESS!', response.status, response.text);
   }, (err) => {
      toast.error('Mail Error');
      //console.log('FAILED...', err);
   });

    
  };




  return (
    <Container>
      <div>
        <BackgroundSlider scroll={handleClickScroll}/>
      </div>
      <Section id="about">
        <Title>About Us</Title>
        <Description>
          <p><b>
          <span style={{ color: "black" }}>Salvage</span>
          <span style={{ color: "#ff8c00" }}>Me</span></b> &nbsp; is a
            Ghanaian-led non-governmental organization (NGO) founded by Dadson
            Papa Kow and co-founded by Elijah Ocupualor in 2022. Our mission is
            to promote knowledge sharing, reduce waste, and maximize educational
            opportunities to achieve academic equity through book donations. We
            believe that every child deserves access to quality education, and
            through our efforts, we strive to bridge the educational gap by
            providing resources to those in need.
          </p>
          <p>
            <ReadMore>
              <Link to="/about">read more</Link>
            </ReadMore>
          </p>
        </Description>
      </Section>

      <Section id="services">
        <Title>Our Services</Title>
        <Services>
          <Service>
            <BackgroundImage
              style={{ backgroundImage: `url('/images/donate2.jpg')` }}
            />
            <ServiceInfo>
              <ServiceTitle> Book Collection & Donation</ServiceTitle>

              <Content>
                We gather donated books from individuals, schools, libraries, and other organizations and 
                distribute then to other schools, libraries, community centers, and other educational institutions 
                serving underserved communities. 
              </Content>
            </ServiceInfo>
          </Service>

          <Service>
            <BackgroundImage
              style={{ backgroundImage: `url('/images/reading1.jpg')` }}
            />
            <ServiceInfo>
              <ServiceTitle> Reading Programs and Events </ServiceTitle>

              <Content>
                We organize reading programs, storytelling sessions, and literacy events to 
                engage children and promote a love for reading. These initiatives include 
                workshops, book clubs, and author visits.
              </Content>
            </ServiceInfo>
          </Service>

          <Service>          
            <Link to="/services/">
              <BackgroundImage
                style={{ backgroundImage: `url('/images/outreach1.png')`, backgroundColor: "#fff" }}
              />
            </Link>
            <ServiceInfo>
              <ServiceTitle> Community Outreach </ServiceTitle>

              <Content>
                We actively engage with local communities, schools, and stakeholders to 
                raise awareness about the importance of literacy, encourage book donations, 
                and collaborate on educational initiatives.
              </Content>
            </ServiceInfo>
          </Service>
        </Services>
      </Section>

      <Section id="reviews">
        <Title>What our beneficiaries say</Title>
        <Reviews>
          <Review>
            <Customer>
              <img src="/images/student.png" />
              <div>
                <span>Amuzu Gifty</span>
                <br />
                <span>Student</span>
              </div>
            </Customer>
            <ReviewMessage>
              <p>
                As a student from a low-income family, owning books was a luxury
                I couldn't afford. But thanks to SalvageMe, I am now more confident 
                in my studies and believe that education
                can truly change my life. SalvageMe's book donations are
                transforming the lives of students like me, and I am so grateful
                for their support.
              </p>
            </ReviewMessage>
          </Review>

          <Review>
            <Customer>
              <img src="/images/parent1.jpg" />
              <div>
                <span>Janet Awukuga</span>
                <br />
                <span>Parent</span>
              </div>
            </Customer>
            <ReviewMessage>
              <p>
                SalvageMe's has madeit possible forr children from different backgrounds to
                come together and discover the joy of reading. Thanks to their book donation
                drives and reading events my children now have a shared interest with their peers 
                and are excited to explore new worlds through books. 
                SalvageMe has brought hope and a brighter future to our children.
              </p>
            </ReviewMessage>
          </Review>

          <Review>
            <Customer>
              <img src="/images/nana.jpg" />
              <div>
                <span>Nana Yaw Adu</span>
                <br />
                <span>Librarian</span>
              </div>
            </Customer>
            <ReviewMessage>
              <p>
                Being a librarian in a resource-constrained community was
                challenging until SalvageMe stepped in. Their book donations
                have revitalized our library and turned it into a vibrant hub of
                knowledge. The children are excited to visit the library, borrow
                books, and engage in reading activities. SalvageMe's support has
                transformed our library into a place of inspiration and
                empowerment
              </p>
            </ReviewMessage>
          </Review>
        </Reviews>
      </Section>

      <Section id="partner">
        <Title>Partner with us</Title>
        <FlexWrap>
          <PartnerLeft>
            <h2>Volunteer</h2>
            <p>
            If you are interested in working together with us to transform lives through education, 
            we look forward to hearing from you .
            </p>
            <div>
              {/* <img src="/images/partnership.png" alt="Partnership" /> */}
            </div>
          </PartnerLeft>

          <PartnerRight>
            <Form>
              <h2>Join Our Team</h2>
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

                <div className="inputbox-wrap">
                  <div className="inputbox">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required="required"
                    />
                    <span>Message</span>
                  </div>
                </div>

                <div className="inputbox">
                  <input
                    type="button"
                    disabled={!(message && email && contact) ? true : false}
                    onClick={(event) => handlePartnership(event)}
                    value="Submit"
                  />
                </div>
              </form>
            </Form>
          </PartnerRight>
        </FlexWrap>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
  position: relative;
`;

const Section = styled.div`
  position: relative;
  width: 90%;
  overflow-x: hidden;
  margin: 10px auto;
  p {
    text-align: left;
    line-height: 1.5;
  }
`;

const Title = styled.h1`
  color: #ff8c00;
  margin: 40px 0;
`;

const Description = styled.div`
  padding: 5px;
`;

const ReadMore = styled.span`
  display: block;
  width: fit-content;
  margin: 0 auto;
  a {
    color: #000;
    cursor: default;
    text-decoration: none;
    border: 1px solid #ff8c00;
    padding: 10px 20px;
    border-radius: 30px;
    &:hover {
      background-color: #ff8c00;
      color: #fff;
    }
  }
`;

const Services = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const Service = styled.div`
  width: 30%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  border-radius: 30px 30px 0 0;
  background-color: #333;
  background-position: center;
  background-size: cover;
  height: 200px;
`;

const ServiceInfo = styled.div`
  color: #36454f;
  position: relative;
  flex-grow: 1;
  padding: 20px;
`;

const Content = styled.p``;

const ServiceTitle = styled.h3`
  margin-top: 1px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #000;
`;

const Reviews = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const Review = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  border-radius: 50px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-right: 10px;
    display: block;
  }
  div {
    span {
      line-height: 1.5;
    }
  }
`;

const ReviewMessage = styled.div`
  padding: 5px;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const PartnerLeft = styled.div`
  width: 45%;
  & h2 {
    /* font-size: 2em; */
    border-left: 5px solid #ff8c00;
    padding: 10px;
    color: #000;
    letter-spacing: 5px;
    margin-bottom: 45px;
    font-weight: bold;
    padding-left: 10px;
  }
  p {
    line-height: 1.5;
  }
  div {
    height: 300px;
    margin: 20px auto;
    background: #fff;
    border: 1px solid white;
    background-image: url('/images/partnership.png');
    width: 100%;
  
    background-position: center;
    background-size: cover;

    /* & > img {
      width: inherit;
      border-radius: 0 100px 100px 0;
    } */
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const PartnerRight = styled.div`
  width: 45%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Form = styled.div`
  background: #fff;
  border-radius: 10px;
  margin: 20px;

  & h2 {
    /* font-size: 2em; */
    border-right: 5px solid #ff8c00;
    padding: 10px;
    color: #000;
    letter-spacing: 5px;
    margin-bottom: 45px;
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
    width: 100%;
    border-radius: 10px;
    height: fit-content;
    &:focus ~ span,
    &:valid ~ span {
      transform: translateX(-13px) translateY(-35px);
      font-size: 1em;
    }
  }
  & input[type="file"] {
    border: none;
    padding-top: 0;
  }

  & textarea {
    width: 100%;
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
    /* #3F704D; */
    color: #fff;
    border: #fff;
    &:hover {
      background: #ff8c00;
    }
  }
  @media (max-width: 768px) {
    padding: 20px;
    & h1 {
      font-size: 1.5em;
    }
    & span {
      top: 16px;
      font-size: 13px;
    }
  }
`;


const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    token: state.userState.token,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
