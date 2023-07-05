import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CarouselSection from "../Shared/CarouselSection";
// import { trendingEvents } from "../data";

const TrendingEvents = (props) => {
  return (
    <Container>
      <CategoryTitle>
        <h4>Trending</h4>
        <h4><Link to="/events/cat/trending">See all ></Link></h4>
      </CategoryTitle>
      <CarouselSection divId="trending" maxWidth="100%" ctrlPos="0">
        {
          props.events.map((event, key) => (
            <TrendingCard key={key}>
              <Link to={`/events/${event.id}`}>
                <TrendingBackgroundImage 
                    src={event.imageUrl}
                    alt="..." 
                    loading="lazy" 
                    decoding="async" />
                </Link>
              <TrendingWrapper>
                <TrendingContent>
                  <TrendingInfo>
                    <Link to={`/events/${event.id}`}>
                      <TrendingReserve>Reserve</TrendingReserve>
                    </Link>
                    <TrendingLike>
                      <img src="/images/icons/like.svg" />
                    </TrendingLike>
                  </TrendingInfo>
                </TrendingContent>
              </TrendingWrapper>
            </TrendingCard>
          ))
        }
      </CarouselSection>
    </Container>
    )
};

const Container = styled.div`
  margin: 0 auto;
  margin-top: 40px;
  /* border: 1px solid black; */
  @media (min-width: 768px) {
    width: 90%;
  }
`;

const CategoryTitle = styled.h3`
  color: #fa8128;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h4 {
    margin: 0 10px;
    a {
      color: #808080;
      font-size: 14px;
      text-decoration: none;
      &:hover{
        cursor: default;
      }
    }
  }
  @media (min-width: 768px) {
    width: 95%;
    margin: 0 auto;
  }
`;

const TrendingCard = styled.li`
  height: 200px; 
  width: 300px;
  background-color: #FFF;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 20px;

  flex-shrink: 0;
  margin-right: 30px;
  margin-bottom: 10px;
  scroll-snap-align: center;
  margin: 0 auto;

  &:first-of-type {
    /* Allow users to fully scroll to the start */
    scroll-snap-align: center;
  }
  &:last-of-type {
    /* Allow users to fully scroll to the end */
    /* scroll-snap-align: end; */
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  @media (min-width: 1024px) {
    height: 150px; 
    width: 250px;
  }

  @media (min-width: 1440px) {
    height: 200px; 
    width: 300px;
  }

  @media (max-width: 540px) {

  }
`;

const TrendingBackgroundImage = styled.img`
  width: 100%;
  border-radius: 20px;
  background-color: #333;
  background-position: center;
  background-size: cover;
  height: 100%;
`;


const TrendingWrapper = styled.div`
  position: relative;
  width: inherit;
  /* border: 1px solid blue; */
`;

const TrendingContent = styled.div`
  position: absolute;
  width: 100%;
  top: -50px;
`;

const TrendingInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  a {
    text-decoration: none;
  }
`;

const TrendingReserve = styled.button`
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  padding: 3px 20px;
  border: none;
  border-radius: 30px;
  margin-right: 3px;
  outline: none;
  font-size: 16px;
  &:hover{
    cursor: default;
  }
`;

const TrendingLike = styled.span`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  position: absolute;
  right: 20px;
  img {
    width: 17px;
    height: 17px;
  }
  &:hover{
    cursor: pointer;
  }
`;
export default TrendingEvents;