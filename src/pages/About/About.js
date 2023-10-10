import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heroes from "../../components/heroes";
import axios from "axios";


const About = (props) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const Users = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/users`
      );
      setUsers(Users.data);
    } catch (error) {
      //console.log(error);
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

              <Title>Meet our Heroes</Title>
              <GridList>
              {users == null ? (
                <GridItem>
                </GridItem>
                ) : (
                <>
                {
                  users.map((user, key) => ((user.donationCount>50 &&
                    <GridItem>
                      <Heroes key={key} user={user} />
                    </GridItem>
                  )))
                }
                </>
                )}
              </GridList>
            </Description>
          </AboutSection>
        </AboutWrapper>
      </Container>
      {/* <Home/> */}
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


const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px 10px;
  /* border: 1px solid black; */

  @media (min-width: 500px) {
    grid-auto-columns: calc(50% - 10px);
  }
  
  @media (min-width: 700px) {
    grid-auto-columns: calc(calc(100% / 3) - 20px);
    grid-gap: 30px 10px;
  }
  
  @media (min-width: 1100px) {
    grid-auto-columns: calc(25% - 30px);
  }
`;


const GridItem = styled.div`
  min-width: 250px;
  /* border: 1px solid black; */
`;

export default About;
