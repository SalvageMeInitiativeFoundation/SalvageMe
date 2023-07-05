import React, { useEffect, useState } from "react";
import styled from "styled-components";

const About = (props) => {
  const [readMore, setReadMore] = useState(false);

  const linkName = readMore ? "Read Less <<" : "Read More >>";

  const readMoreHandler = (id) => {
    setReadMore(!readMore);
    let content = document.getElementById(id);
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };

  return (
    <>
      <Container>
        <EventImageWrapper>
          <EventImage imgUrl="/images/donate3.jpg" />
          <ImageOverlay />
          <Motto>
            <p>Together, let's salvage knowledge, empower minds, and build a brighter future for all.</p>
          </Motto>
        </EventImageWrapper>

        <AboutWrapper>
          <AboutSection>
            <Description>
              <Title>
                <span style={{ color: "black" }}>Salvage</span>
                <span style={{ color: "#ff8c00" }}>Me</span> &nbsp; 
                <small>Transforming lives through education</small>
              </Title>
              <p>
                <span style={{ color: "black" }}>Salvage</span>
                <span style={{ color: "#ff8c00" }}>Me</span> &nbsp;
                is a Ghanaian-led non-governmental organization (NGO) founded by
                Dadson Papa Kow and co-founded by Elijah Ocupualor in 2022. Our
                mission is to promote knowledge sharing, reduce waste, and
                maximize educational opportunities to achieve academic equity
                through book donations. We believe that every child deserves
                access to quality education, and through our efforts, we strive
                to bridge the educational gap by providing resources to those in
                need.
              </p>
              <Title>Our Vision</Title>
              <p>
                At SalvageMe, we envision a future where no child is deprived of
                educational opportunities due to a lack of resources. We aim to
                create a sustainable cycle of knowledge by salvaging books that
                would otherwise go to waste and making them available to
                underserved communities. By doing so, we empower individuals to
                reach their full potential and contribute to the development of
                their communities and nation.
              </p>

              <Title>What We Do</Title>
              <p>
                SalvageMe operates through a simple yet impactful model. We
                collect gently used and new books from individuals, schools, and
                organizations, ensuring they don't end up in landfills. These
                salvaged books are then carefully sorted, categorized, and
                distributed to schools, libraries, and community centers in
                disadvantaged areas across Ghana. Through this process, we aim
                to foster a love for reading, improve literacy rates, and create
                a culture of lifelong learning.
              </p>

              <Title>Get Involved</Title>
              <p>
                You can be a part of our mission to make education accessible to
                all. Whether you have books to donate, want to volunteer your
                time and skills, or contribute financially to support our
                initiatives, your involvement can make a significant difference
                in the lives of children and communities. Join us in creating a
                brighter future through the power of knowledge.
              </p>
            </Description>
          </AboutSection>

        </AboutWrapper>

      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  text-align: left;
  background: #fff;
`;

const EventImageWrapper = styled.div`
  width: 100%;
  height: 60vh;
  background: #fff;
  margin-top: -7px;
  position: relative;
`;

const ImageOverlay = styled.div`
  width: 100%;
  height: 60vh;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.556;
  border-radius: 0 0 15% 15%;
`;

const EventImage = styled.div`
  width: 100%;
  background-color: #fff;
  background-position: center;
  background-size: cover;
  height: inherit;
  border-radius: 0 0 15% 15%;
  background-image: ${(props) => `url(${props.imgUrl})`};
`;

const Motto = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    height: fit-content;
    padding: 0 10px;
    z-index: 2;
    color: white;
    bottom: 10%;
    border: 1px solid transparent;
`;

const SectionContent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid green; */
  @media (max-width: 620px) {
    flex-wrap: wrap;
  }

  @media (min-width: 481px) {
    width: 95%;
  }
  @media (min-width: 621px) {
    width: 95%;
    &.more-events {
      flex-wrap: wrap;
    }
  }
  @media (min-width: 769px) {
    width: 80%;
    margin-top: 20px;
  }
`;

const AboutWrapper = styled(SectionContent)``;

const AboutSection = styled.div`
  color: #36454f;
  padding: 10px;
  /* width: 70%; */
  /* border: 1px solid red; */
  p {
    b {
      color: green;
    }
  }
  @media (max-width: 620px) {
    width: 100%;
  }
`;

const ExtraDescription = styled.p`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
`;

const Title = styled.h1`
  margin-top: 1px;
  padding-bottom: 2px;
  font-size: 30px;
  color: #ff8c00;
  small {
    font-size: 15px;
    color: #000;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 530px) {
    /* font-size: 15px;  */
  }

  @media (max-width: 480px) {
    small {
      display: block;
    }
  }
`;

const ReserveSection = styled.div`
  width: 30%;
  /* border: 1px solid yellow; */
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 620px) {
    width: 100%;
    flex-direction: row;
  }
`;

const ReserveSectionContent = styled.div`
  width: 170px;
  margin-top: 30px;
  /* border: 1px solid green; */
  @media (max-width: 620px) {
    width: 100%;
    margin-top: 0;
  }
`;

const ReserveSectionButtons = styled.div`
  @media (max-width: 620px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ReserveButton = styled.button`
  display: block;
  width: 150px;
  height: 30px;
  margin: 10px;
  border: none;
  outline: none;
  border-radius: 30px;
`;

const ReserveSpot = styled(ReserveButton)`
  color: white;
  background-color: blue;
`;

const GuestReserve = styled(ReserveButton)`
  border: 1px solid blue;
  color: blue;
  background-color: #fff;
`;

const Owner = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #e5e4e2;
  border-radius: 10px;
  margin: 10px;
  font-size: 12.5px;
  p {
    a {
      color: black;
    }
  }
  span {
    display: block;
    margin-top: 10px;
  }
  button {
    width: 80px;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 30px;
    margin-top: 10px;
  }
  @media (max-width: 530px) {
  }
`;

const Description = styled.div`
  margin: 10px 0;
  line-height: 1.5;
  p {
    ul > li {
      line-height: 1.5;
      b {
        color: #3f704d;
      }
    }
    ol > li {
      line-height: 2;
      b {
        color: #3f704d;
      }
    }
  }
  @media (max-width: 530px) {
    font-size: 13px;
    padding: 5px 10px;
  }
`;

const ReadMoreOrLess = styled.button`
  margin: 10px auto;
  font-size: 12px;
  padding: 3px 5px;
  width: fit-content;
  display: flex;
  justify-content: space-around;
  border: 1px solid #a9a9a9;
  outline: none;
  border-radius: 10px;
  text-align: center;
  color: #818589;
  background-color: white;
`;

const TeamSection = styled.div`
  margin: 20px auto;
  h1,
  h3 {
    color: #3f704d;
    text-align: center;
    padding-top: 20px;
  }
  @media (min-width: 481px) {
    width: 95%;
  }
  @media (min-width: 769px) {
    width: 80%;
  }
`;

const TeamMemberProfile = styled.div`
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

const TeamMembers = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const TeamMember = styled.div`
  width: 30%;
  min-height: 320px;
  height: fit-content;
  background: #fff;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  text-align: center;

  @media (max-width: 620px) {
    width: 100%;
  }
`;

const TeamMemberInfo = styled.div`
  margin: 10px 15px;
  text-align: left;
  line-height: 1.2;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  @media (max-width: 530px) {
    font-size: 13px;
  }
`;

const ExtraInfo = styled.p`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
`;

export default About;
