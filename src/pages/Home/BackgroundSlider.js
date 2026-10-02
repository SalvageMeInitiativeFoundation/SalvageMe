import React from "react";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

import { imageSliders } from "../../assets/data";


const BackgroundSlider = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState({}); // { 0: true, 1: true, ... }

    // Preload all slider images once
    useEffect(() => {
        imageSliders.forEach((slide, index) => {
            const img = new Image();
            img.onload = () => setLoaded((prev) => ({ ...prev, [index]: true }));
            // don't show the skeleton forever if an image fails
            img.onerror = () => setLoaded((prev) => ({ ...prev, [index]: true }));
            img.src = slide.url;
        });
    }, []);

    // Auto-advance slides
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % imageSliders.length);
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    const isLoaded = !!loaded[currentSlide];

    const bgImageStyle = {
        backgroundImage: isLoaded ? `url(${imageSliders[currentSlide].url})` : "none",
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <Container>
            <Wrapper>
                {!isLoaded && <Skeleton />}
                <BackgroundImage style={bgImageStyle} />
                <ImageOverlay />
                <ImageInfo>
                    <Title><q> {imageSliders[currentSlide].title} </q></Title>
                    <Description> {imageSliders[currentSlide].description} </Description>
                    <Carousel>
                        {
                            imageSliders.map((slide, index) => (
                                <span
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    style={{
                                        backgroundColor: index === currentSlide ? "#ff8c00" : "white",
                                    }}
                                ></span>
                            ))
                        }
                    </Carousel>
                </ImageInfo>
                <Actions>
                    <ActionsWrap>
                        <Action onClick={() => props.scroll()}>Volunteer</Action>
                    </ActionsWrap>
                </Actions>
            </Wrapper>
        </Container>
    );
};


const shimmer = keyframes`
    0%   { background-position: -800px 0; }
    100% { background-position: 800px 0; }
`;

const Container = styled.div`
    text-align: center;
    height: 100vh;
    background-color: #fff;
`;

const Wrapper = styled.div`
    height: 100%;
    position: relative;
`;

const Skeleton = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 0 30px 30px;
    background: linear-gradient(
        90deg,
        #2a2a2a 25%,
        #3d3d3d 37%,
        #2a2a2a 63%
    );
    background-size: 1600px 100%;
    animation: ${shimmer} 1.5s infinite linear;
`;

const BackgroundImage = styled.div`
    background-position: center;
    background-size: cover;
    height: 100%;
    border-radius: 0 0 30px 30px;

    -webkit-transition: all 1.0s ease-in-out;
    -moz-transition: all 1.0s ease-in-out;
    -o-transition: all 1.0s ease-in-out;
    transition: all 1.0s ease-in-out;
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
    bottom: 30%;
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
    border-radius: 0 0 30px 30px;
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
    bottom: 20%;
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
    font-weight: 600;
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

export default BackgroundSlider;
