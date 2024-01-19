import React from "react";
import styled from "styled-components";
import {FaLinkedin} from 'react-icons/fa';
import {MdOutlineFavoriteBorder,MdCloudUpload} from 'react-icons/md';
import {BsArrowDownLeft} from 'react-icons/bs';

function Heroes({user}){

    return(
        <HeroCard>
        <BackgroundImage
          style={{ backgroundImage: user.image ? `url(${user.image})` : `url('/images/icons/user.svg')` }}
        />
        <HeroInfo>
          <HeroTitle> {user.username} </HeroTitle>

          <Content> 
           <span><i class="fa fa-book" aria-hidden="true"></i>{user.donationCount} Donations</span>
          </Content>
        </HeroInfo>
      </HeroCard>
    )

    {/* return <div className="Heroes">
        <img src={user.image} alt="Heroe's image" />
        <p style={{textAlign:'center'}}>{user.username}</p>
        <div className="HeroesDetails">
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
            <><MdOutlineFavoriteBorder/> {user.donationCount}</>
            <><BsArrowDownLeft fill='red'/>{user.recievedCount}</>
        </div>
    </div> */}
};

const HeroCard = styled.div`
    /* border: 1px solid rgba(0,0,0,0.5); */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BackgroundImage = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-color: #333;
  background-position: center;
  background-size: cover;
`;

const HeroInfo = styled.div`
  color: #36454f;
  position: relative;
  flex-grow: 1;
  padding: 20px;
`;

const Content = styled.p``;

const HeroTitle = styled.p`
  margin-top: 1px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #000;
`;


export default Heroes;