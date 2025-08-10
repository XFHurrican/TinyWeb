import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  width: 100%;
  padding: 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 4rem;
  padding: 5rem 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 10rem;
  margin-bottom: 5rem;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>欢迎来到书迷交流平台</HeroTitle>
        <HeroSubtitle>
          发现好书，分享阅读心得，结识志同道合的书友
        </HeroSubtitle>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>发现好书</FeatureTitle>
          <FeatureDescription>
            浏览海量书籍，发现适合你的阅读推荐，探索不同类型的文学世界。
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>分享心得</FeatureTitle>
          <FeatureDescription>
            发表书评，记录读书笔记，与其他书友分享你的阅读体验和见解。
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>结识书友</FeatureTitle>
          <FeatureDescription>
            加入读书小组，参与讨论，结识志同道合的朋友，一起享受阅读的乐趣。
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default HomePage;