import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import BackgroundSlider from "./BackgroundSlider";
import { Link } from "react-router-dom";
import { isEmailValid, isContactValid } from "../../utils/middleware";


const Home = (props) => {
  let { secId } = useParams();
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

    const payload = {
        name: username,
        email: email,
        contact: contact,
        message: message
    };

    props.signUp(payload);
  }

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollToSection = async () => { 
        if (secId) {
          handleClickScroll(secId);
        }
      }; 
      scrollToSection();
  }, [secId]);
   
  return (
    <Container>
      <div>
        <BackgroundSlider />
      </div>
      <Section id="about">
        <Title>About Us</Title>
        <Description>
          <p>
          <b style={{color: "#3F704D", fontSize: "20px"}}>Cleanforce Limited</b> is a Ghanaian owned manufacturing and service company.
          We have expertise in petrochemical, cosmetics, and detergent manufacturing,
          Industrial Engineering, Product Development as well as Sales and Services of industrial equipment.
          </p>
          <p>
          We provide innovative industrial solutions and services with a focus on engineering, 
          solution development and sustainability.
          Working in various industries such as Hospitality, Oil and Gas, Agric and Information Technology.
          </p>
          <p>
          We have various business segment and consulting units
          Energy Service Group – Green focused engineering solutions and services 
          Innovation Technology Group- Tech product & Service development 
          Chemical Service Group – Petrochemical and additives supply
          Digital Media Group – Innovative marketing media 
          Agri Value Group – Value added services in Agric for export 
          and sustainability , with a focus on shea products and technology to improve the business.
          </p>
          <p>
          Business started with our Chemicals Service Group, and industrial installations which was 
          Introduced in the late 1990’s.
          </p>
          <p><ReadMore><Link to="/about">read more</Link></ReadMore></p>
        </Description>
      </Section>

      <Section id="services">
        <Title>Our Services</Title>
        <Services>
          <Service>
            <Link to='/services/chemicals'>
              <BackgroundImage  style={{'backgroundImage':`url('/images/1.jpg')`}} />
            </Link>
            <ServiceInfo>
                <ServiceTitle> Chemicals & Additives </ServiceTitle>
                
                <Content>
                  We Manufacture eco-friendly degreases / Rig wash, 
                  & anti rust agents as well as represent global brands across Africa 
                </Content>
            </ServiceInfo>
          </Service>

          <Service>
            <Link to='/services/engineering'>
              <BackgroundImage  style={{'backgroundImage':`url('/images/2.jpg')`}} />
            </Link>
            <ServiceInfo>
                <ServiceTitle> Engineering Services </ServiceTitle>
                
                <Content>
                  Providing complete customer satisfaction by using engineered innovation to solve 
                  various customer challenges. 
                </Content>
            </ServiceInfo>
          </Service>

          <Service>
            <Link to='/services/technology'>
              <BackgroundImage  style={{'backgroundImage':`url('/images/3.jpg')`}} />
            </Link>
            <ServiceInfo>
                <ServiceTitle> Innovation Technology </ServiceTitle>
                
                <Content>
                We provide innovative industrial solutions and services with a focus on engineering, 
                solution development and sustainability. Utilzing Green Tech 
                </Content>
            </ServiceInfo>
          </Service>
        </Services>
      </Section>

      <Section id="reviews">
        <Title>What our customers say</Title>
        <Reviews>
          <Review>
            <Customer>
              <img src="/images/person2.png" />
              <div>
                <span>Harriet Dadson</span><br/>
                <span>CE0 Harriet Cosmetics</span>
              </div>
            </Customer>
            <ReviewMessage>
              <p>
                I sell a wide range of products as a retailer.
                I have had wonderful responses about your products such as;
                Multipurpose Liquid soap, Industrial bleaches, 
                Scented floor cleaner and Dog shampoo among others. Great products!
              </p>
            </ReviewMessage>
          </Review>

          <Review>
            <Customer>
              <img src="/images/person1.jpeg" />
              <div>
                <span>Bernard Hendricks</span><br/>
                <span>Manager, Steel Oil Drills</span>
              </div>
            </Customer>
            <ReviewMessage>
              <p>
                Wonderful anti-rust product. 
                Now, my company spends less on repairs, our machinery have longer lifespan
                and again, the product is eco-friendly.
                I recommend it to anyone.
              </p>
            </ReviewMessage>
          </Review>

          <Review>
            <Customer>
              <img src="/images/person3.jpeg" />
              <div>
                <span>Clinton Yawson</span><br/>
                <span>Founder, QuickBuy</span>
              </div>
            </Customer>
            <ReviewMessage>
              <p>
              The tool X has really automated some of our company’s processes. 
              We now spend less time doing manual work. It’s making [problem] very easy for us. 
              Thanks to its scheduling feature, we don’t need staff to work outside of business hours
              </p>
            </ReviewMessage>
          </Review>
        </Reviews>
      </Section>

      <Section id="partner">
        <Title>Partner with us</Title>
        <FlexWrap>
          <PartnerLeft>
            <h2>Apply Now</h2>
            <p>
              If you're interested in being a distributor, 
              start by applying here and attaching your business profile.
            </p>
            <div>
              <img src="/images/partnership.jpg" alt="Partnership" />
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

                <div>
                  <p><label>Attach business profile</label></p>
                  <input 
                    type="file"
                    onChange={(e) => setMessage(e.target.value)} 
                    required="required" 
                  />
                </div>

                <div className="inputbox">
                  <input 
                    type="button"
                    disabled={!(message && email && contact)? true : false}
                    onClick={(event) => handlePartnership(event)}
                    value="Submit Application" 
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
  p{
    text-align: left;
    line-height: 1.5;
  }
`;

const Title = styled.h1`
  color: green;
  margin: 40px 0;
`;

const Description = styled.div`
  padding: 5px;
`;

const ReadMore = styled.span`
  display: block;
  width: fit-content;
  margin: 0 auto;
  a{
    color: green;
    cursor: default;
    text-decoration: none;
    border: 1px solid green;
    padding: 10px 20px;
    border-radius: 30px;
    &:hover{
      background-color: green;
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
    color: #36454F;
    position: relative;
    flex-grow: 1;
    padding: 20px;    
`;

const Content = styled.p``;

const ServiceTitle = styled.h3`
  margin-top: 1px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #3F704D;
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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 10px;
  background-color: #FFF;
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
  div{
    span{
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
  & h2{
    /* font-size: 2em; */
    border-left: 5px solid #3F704D;
    padding: 10px;
    color: #3F704D;
    letter-spacing: 5px;
    margin-bottom: 45px;
    font-weight: bold;
    padding-left: 10px;
    }
  p{line-height: 1.5;}
  div {
    height: fit-content;
    border-radius: 50%; 
    margin: 20px auto;
    background: #fff;
    border: 1px solid white;
    &>img{
      width: inherit;
      border-radius: 0 100px 100px 0;
    }
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
    
    & h2{
        /* font-size: 2em; */
        border-right: 5px solid #3F704D;
        padding: 10px;
        color: #3F704D;
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
    & input{
        position: relative;
        padding: 11px 5px;
        border-radius: 10px;
        font-size: 1.2em;
        border: 2px solid #000;
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
        background: green;
        /* #3F704D; */
        color: #fff;
        border: #fff;
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

const ContactLeft = styled.div`
  width: 45%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ContactRight = styled.div`
  width: 45%;
  & h2{
    border-left: 5px solid #3F704D;
    padding: 10px;
    color: #3F704D;
    letter-spacing: 5px;
    margin-bottom: 45px;
    font-weight: bold;
    padding-left: 10px;
  }
  & p {
    line-height: 2;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;


const mapStateToProps = (state) => {
  return {
      user: state.userState.user,
      token: state.userState.token,
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
