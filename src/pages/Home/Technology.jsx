import React from "react";
import styled from "styled-components";

function Technology() {
  return (
    <Page>
      <Content>
        <GalleryIcon>📚</GalleryIcon>

        <Badge>SalvageMe Foundation</Badge>

        <Title>
          Our <Highlight>Gallery</Highlight>
        </Title>

        <Description>
          A collection of moments, stories, and milestones from our journey
          toward building a sustainable ecosystem for educational materials.
        </Description>

        <ComingSoonCard>
          <Icon>🚧</Icon>

          <div>
            <CardTitle>Gallery Coming Soon</CardTitle>
            <CardText>
              We're putting together something special. Soon you'll be able to
              explore photos and highlights from our activities, initiatives,
              and community impact.
            </CardText>
          </div>
        </ComingSoonCard>

        <BackButton href="/">
          ← Back to SalvageMe
        </BackButton>
      </Content>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px 50px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at top left, rgba(255, 140, 0, 0.12), transparent 35%),
    linear-gradient(135deg, #fffaf5, #ffffff);
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: center;
`;

const GalleryIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: #ff8c00;
  font-size: 38px;
  box-shadow: 0 12px 30px rgba(255, 140, 0, 0.25);
`;

const Badge = styled.span`
  display: inline-block;
  padding: 7px 16px;
  margin-bottom: 12px;
  border-radius: 30px;
  background: #fff0df;
  color: #d86f00;
  font-size: 13px;
  font-weight: 700;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(38px, 6vw, 64px);
  line-height: 1.1;
  color: #111;
  font-weight: 800;
`;

const Highlight = styled.span`
  color: #ff8c00;
`;

const Description = styled.p`
  max-width: 650px;
  margin: 20px auto 35px;
  color: #666;
  font-size: 17px;
  line-height: 1.7;

  @media (max-width: 540px) {
    font-size: 15px;
  }
`;

const ComingSoonCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 650px;
  margin: 0 auto 30px;
  padding: 24px;
  text-align: left;
  background: #fff;
  border: 1px solid #f1e5d8;
  border-left: 5px solid #ff8c00;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);

  @media (max-width: 540px) {
    align-items: flex-start;
    padding: 20px;
  }
`;

const Icon = styled.div`
  flex-shrink: 0;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: #fff4e8;
  font-size: 26px;
`;

const CardTitle = styled.h3`
  margin: 0 0 7px;
  color: #222;
  font-size: 20px;
`;

const CardText = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
  font-size: 14px;
`;

const BackButton = styled.a`
  display: inline-block;
  padding: 11px 22px;
  border-radius: 25px;
  background: #111;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;

  &:hover {
    background: #ff8c00;
    transform: translateY(-2px);
  }
`;

export default Technology;