import React, { useEffect, useState } from "react";
import styled from "styled-components";


const About = (props) => {
    const [readMore,setReadMore] = useState(false);

    const linkName = readMore ? 'Read Less <<':'Read More >>'

    const readMoreHandler = (id) => {
        setReadMore(!readMore);
        let content = document.getElementById(id);
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        };
    };


    return (
        <>
        <Container>
            <EventImageWrapper>
                <EventImage imgUrl="/images/1.jpg"/>
                <ImageOverlay />
            </EventImageWrapper>

            <AboutWrapper>
                <AboutSection>
                    <Description>
                        <Title>CLEANFORCE <small>Engineered Innovation SInce 1994</small></Title>
                        <p>
                            <b style={{color: "green", fontSize: "20px"}}>Cleanforce Limited</b> is a Ghanaian owned manufacturing and service company.
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
                            <ol>
                                <li><b>Energy Service Group </b>– Green focused engineering solutions and services  </li>
                                <li><b>Innovation Technology Group</b>- Tech product & Service development  </li>
                                <li><b>Chemical Service Group</b> – Petrochemical and additives supply </li>
                                <li><b>Digital Media Group</b> – Innovative marketing media  </li>
                                <li><b>Agri Value Group</b> – Value added services in Agric for export 
                                and sustainability , with a focus on shea products and technology to improve the business. 
                                </li>
                            </ol>
                        </p>
                        <ExtraDescription id="readMore"> 
                            <p>
                                Business started with our Chemicals Service Group, and industrial installations which was 
                                Introduced in the late 1990’s.
                                The detergents we currently produce include the following:
                                <ul>
                                    <li>Industrial bleaches </li>
                                    <li>Degreaser & Rig wash for offshore installation  </li>
                                    <li>Dog shampoo</li>
                                    <li>Multipurpose Liquid soap </li>
                                    <li>Scented floor cleaner</li>
                                    <li>Hand sanitizer (Covid19 ready)</li>
                                    <li>Auto Shine Wash and wax for cars</li>
                                </ul>
                                We provide a wide range of Industrial cleaning solutions for commercial clients, 
                                and we also work along with other service providers for 360 business service.
                            </p>
                            <p>
                                <b>Cleanforce Limited</b> brings a fresh and professional approach to the Energy & Hospitality industry; 
                                our goal is to exceed the expectations of every client by offering outstanding customer service, 
                                exceptional quality, and add greater value for the service.
                                Our Circular business modeled, where we aim to provide customers complete customer satisfaction 
                                brought about the development of other services groups which used engineered innovation to solve 
                                various customer challenges.
                            </p>
                            <p>
                                At Cleanforce Limited we have a great organizational culture that helps us as a company, 
                                to carry out all our tasks in a professional manner and all our staff are highly trained 
                                and are chosen for their integrity and work experience.
                            </p>
                            <p>
                                <b>Energy Service Group</b> – Green focused engineering solutions and services 
                                Both on shore and offshore, providing eco-friendly cold rooms and boilers for industrial usage.
                            </p>
                            <p>
                                <b>Innovation Technology Group</b> – Tech - product & Service development, IT Security, 
                                Services Management, Asset Management, and products, We are Microsoft partner & Business consultant.
                            </p>
                            <p>
                                <b>Digital Media Group</b> – Innovative marketing media across various industries to promote, 
                                market, obtain post sales feed and customer engagement.
                            </p>
                            <p>
                                <b>Agri Value Group</b> – Value added services in Agric for export and sustainability, 
                                support services and IOT products for agriculture development boosting sustainability and 
                                food safety goal attainment.
                            </p>
                            <div>
                                <h3>Customer base / Industry</h3>
                                <ul>
                                    <li><b>Hospitality</b>– Steller Group, GBH Hotel Group,  </li>
                                    <li><b>Oil and Gas</b> – Halliburton, Omni Energy, Schlumberger </li>
                                    <li><b>Construction & Finance</b> – Greentrade / Cal Bank, Bank of Ghana </li>
                                    <li><b>Agriculture</b> – Bunge , SHC </li>
                                    <li><b>FMCG / Hypermarkets</b> – .Palace,  CH mall,  </li>
                                </ul>
                            </div>
                        </ExtraDescription>
                        <ReadMoreOrLess onClick={()=>{readMoreHandler("readMore")}}>{linkName}</ReadMoreOrLess>
                    </Description>
                </AboutSection>

                {/* <ReserveSection>
                    <ReserveSectionContent>
                        <ReserveSectionButtons>
                            <ReserveSpot>Reserve a spot</ReserveSpot>
                            <GuestReserve>Guest reserve</GuestReserve>
                        </ReserveSectionButtons>
                        <Owner>
                            <p>
                            By <a>Creative Gens International</a>
                            </p>
                            <span>148 followers</span>
                            <button>Follow</button>
                        </Owner>
                    </ReserveSectionContent>
                </ReserveSection> */}
            </AboutWrapper>

            {/* <SectionWrapper style={{backgroundColor: "#dde6df"}}>
            <TeamSection>
                <h1>Our Team</h1>
                <TeamMembers>
                    <TeamMember>
                        <TeamMemberProfile>
                            <img src="/images/person1.jpeg" />
                            <div>
                                <span><b>Peter Milton</b></span><br/>
                                <span>Executive Consultant</span>
                            </div>
                        </TeamMemberProfile>
                        <TeamMemberInfo>
                            <p>
                                Peter has over 30 years of experience in international projects for healthcare 
                                and education since beginning his career by gaining paramedical qualifications 
                                from London's premier teaching hospital, St. Thomas. 
                            </p>
                        </TeamMemberInfo>
                    </TeamMember>

                    <TeamMember>
                        <TeamMemberProfile>
                            <img src="/images/person2.png" />
                            <div>
                                <span><b>Ben Ayettey</b></span><br/>
                                <span>Managing Consultant</span>
                            </div>
                        </TeamMemberProfile>
                        <TeamMemberInfo>
                            <p>
                                Ben is the director of several companies and studied marketing in London.  
                                Over 30 years in private business across Europe and west Africa have allowed Ben 
                                to build up and maintain a wide network of useful contacts and customers.
                            </p>
                        </TeamMemberInfo>
                    </TeamMember>

                    <TeamMember>
                        <TeamMemberProfile>
                            <img src="/images/person3.jpeg" />
                            <div>
                                <span><b>João Henrique</b></span><br/>
                                <span>Executive Consultant</span>
                            </div>
                        </TeamMemberProfile>
                        <TeamMemberInfo>
                            <p>
                                João is a Civil Engineer from the Technical University of Lisbon and has 40 years 
                                of professional experience in managing major infrastructure projects in Angola, Ghana, 
                                Guinea and Portugal.
                            </p>
                        </TeamMemberInfo>
                    </TeamMember>
                </TeamMembers>

                <h3>Operational Support Team</h3>
                <TeamMembers>
                    <TeamMember>
                        <TeamMemberProfile>
                            <img src="/images/person1.jpeg" />
                            <div>
                                <span><b>Gloria Angela</b></span><br/>
                                <span>Head of Administration and Quality Control</span>
                            </div>
                        </TeamMemberProfile>
                        <TeamMemberInfo>
                            <p>
                                He has worked in Saudi Arabia, 
                                southern and west Africa and the Caribbean on projects funded by the World Bank, 
                                European Development Fund and the African Development Bank.
                            </p>
                        </TeamMemberInfo>
                    </TeamMember>

                    <TeamMember>
                        <TeamMemberProfile>
                            <img src="/images/person2.png" />
                            <div>
                                <span><b>Rev. Josephine</b></span><br/>
                                <span>Head of Manufacturing </span>
                            </div>
                        </TeamMemberProfile>
                        <TeamMemberInfo>
                            <p>
                                Rev. Josephine is a scholar and visionary leader.
                            </p>
                        </TeamMemberInfo>
                    </TeamMember>

                    <TeamMember>
                        <TeamMemberProfile>
                            <img src="/images/person3.jpeg" />
                            <div>
                                <span><b>Bernard Victor</b></span><br/>
                                <span>Business Development</span>
                            </div>
                        </TeamMemberProfile>
                        <TeamMemberInfo>
                            <p>
                                A Group Partner Development Manager, experience with  Microsoft / Liquid telecom, 
                                Halliburton Oil and Gas, Valvoline and many more fortune 500 companies, generating 
                                revenue in excel of $100 M per finicnail year, transforming products and services.
                            </p>
                        </TeamMemberInfo>
                    </TeamMember>
                </TeamMembers>
            </TeamSection>
            </SectionWrapper> */}
        </Container>
    </>
    )
}

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
  background-image: ${props => `url(${props.imgUrl})`};
`;

const SectionWrapper = styled.div``;

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
    color: #36454F;
    padding: 10px;     
    /* width: 70%; */
    /* border: 1px solid red; */
    p{ b {color: green;}}
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
  color: #3F704D;
  border-bottom: 3px solid #3F704D;
  small {
    font-size: 15px;
    color: green;
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
  background-color: #E5E4E2;
  border-radius: 10px;
  margin: 10px;
  font-size: 12.5px;
  p {
    a {color: black;}
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
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5;
    p { 
        ul>li{
            line-height: 1.5;
            b {color: #3F704D;}
        }
        ol>li{
            line-height: 2;
            b {color: #3F704D;}
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
    border: 1px solid #A9A9A9;
    outline: none;
    border-radius: 10px;
    text-align: center;
    color: #818589;
    background-color: white;
`;

const TeamSection = styled.div`
    margin: 20px auto;
    h1, h3{
        color: #3F704D;
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
  div{
    span{
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
  background: #FFF;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
    border-top: 1px solid rgba(0,0,0,0.2);
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