import React, { useMemo } from "react";
import styled from "styled-components";
import {FaLinkedin} from 'react-icons/fa';
import {MdOutlineFavoriteBorder,MdCloudUpload} from 'react-icons/md';
import {BsArrowDownLeft} from 'react-icons/bs';
import { AVATARS } from "../utils/constants";

function Heroes({user}){

    const avatarUrl = useMemo(() => {
      if (user && user.image) return user.image;
      const seed = (user && (user.username || user.id)) || Math.random().toString(36).slice(2,10);
      // simple deterministic hash to pick an avatar from AVATARS
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
      }
      const idx = hash % AVATARS.length;
      return AVATARS[idx];
    }, [user?.image, user?.username, user?.id]);

    return(
        <HeroCard>
        <BackgroundImage
          style={{ backgroundImage: user.image ? `url(${user.image})` : `url(${avatarUrl})` }}
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