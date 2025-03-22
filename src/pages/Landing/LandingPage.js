import React from "react";
import axios from "axios";
import styled from "styled-components";
import toast from "react-toastify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { imageSliders } from "../../assets/data";
import GetInTouch from "./GetInTouch";
import Volunteer from "./Volunteer";
import Donate from "./Donate";
import Support from "./Support";
import CountdownTimer from "../../components/Timer/Timer";
import { MdOutlineContactSupport } from "react-icons/md";

const LandingPage = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [getInTouch, setGetInTouch] = useState(false);
  const [volunteer, setVolunteer] = useState(false);
  const [donate, setDonate] = useState(false);
  const [support, setSupport] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide === 2) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 9000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const bgImageStyle = {
    backgroundImage: `url(${imageSliders[currentSlide].url})`,
  };

  const goToNext = (currentSlide) => {
    setCurrentSlide(currentSlide);
  };

  const getInitialSeconds = () => {
    const targetDate = new Date("2025-06-17").getTime();
    const today = new Date().getTime();
    const differenceInSeconds = Math.floor((targetDate - today) / 1000);
    return differenceInSeconds;
  };

  return (
    <Container>
      <Wrapper>
        <BackgroundImage style={bgImageStyle} />
        <ImageOverlay />
        <Logo>
          <Link to="/home">
            <div className="logo-wrap">
              <img src="/images/logo.jpg" alt="Logo" />
              <h1 className="logo-text-wrap">
                <span style={{ color: "black" }}>Salvage</span>
                <span style={{ color: "#ff8c00" }}>Me</span>
              </h1>
            </div>
          </Link>
        </Logo>
        <ImageInfo>
          <CountdownTimer initialSeconds={()=>getInitialSeconds()} autoStart={true} />
          <Title>
            <q> {imageSliders[currentSlide].title} </q>
          </Title>
          <Description> {imageSliders[currentSlide].description} </Description>
          <Carousel>
            {imageSliders.map((imageSliders, currentIndexSlide) => (
              <span
                key={currentIndexSlide}
                onClick={() => goToNext(currentIndexSlide)}
                style={{
                  backgroundColor:
                    currentIndexSlide === currentSlide ? "#ff8c00" : "white",
                }}
              ></span>
            ))}
          </Carousel>
        </ImageInfo>
        <Actions>
          <ActionsWrap>
            <Action onClick={() => setGetInTouch(!getInTouch)}>
              Get in touch
            </Action>
            <Action onClick={() => setVolunteer(!volunteer)}>Volunteer</Action>
            <Action onClick={() => setDonate(!donate)}>Donate</Action>
            <Action onClick={() => setSupport(!support)}>Support ❤️</Action>
          </ActionsWrap>
        </Actions>
      </Wrapper>
      {getInTouch && <GetInTouch close={() => setGetInTouch(!getInTouch)} />}
      {volunteer && <Volunteer close={() => setVolunteer(!volunteer)} />}
      {donate && <Donate close={() => setDonate(!donate)} />}
      {support && <Support close={() => setSupport(!support)} />}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  height: 100vh;
  background-color: #fff;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`;

const BackgroundImage = styled.div`
  background-position: center;
  background-size: cover;
  height: 100%;

  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
`;

const Logo = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  height: fit-content;
  z-index: 2;
  .logo-wrap {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .logo-text-wrap {
      border: 1px solid white;
      padding: 5px 20px;
      border-radius: 30px;
      background-color: white;
      @media (max-width: 540px) {
        font-size: 15px;
      }
    }
  }
`;

const ImageInfo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: fit-content;
  padding: 0 10px;
  z-index: 2;
  color: white;
  bottom: 50%;
  @media (min-width: 1440px) {
  }
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 540px) {
    width: 75%;
  }
`;

const ImageOverlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.7;
`;

const Title = styled.h1`
  font-size: 40px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-size: 22px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;

  span {
    width: 45px;
    height: 3px;
    margin-right: 10px;
    background-color: white;
    cursor: pointer;
    box-shadow: 3px 2px 2px rgba(73, 72, 72, 0.4);
  }
  @media (min-width: 1440px) {
  }
  @media (min-width: 2560px) {
  }
  @media (max-width: 768px) {
    span {
      width: 30px;
    }
  }
`;

const Actions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: fit-content;
  padding: 0 10px;
  z-index: 2;
  color: white;
  bottom: 30%;
  border: 1px solid transparent;
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 540px) {
    width: 75%;
    bottom: 10%;
  }
`;

const ActionsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 540px) {
    flex-wrap: wrap;
  }
`;

const Action = styled.div`
  border: 1px solid white;
  padding: 5px 20px;
  border-radius: 30px;
  min-width: 100px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff8c00;
    cursor: default;
  }
  @media (max-width: 540px) {
    font-size: 15px;
    margin: 10px;
  }
`;

export default LandingPage;
