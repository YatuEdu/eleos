'use client';

import React from 'react';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Container>
      <VideoButton href="/basics">
        <VideoBackground autoPlay loop muted>
          <source src="/videos/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoBackground>
        <ButtonText>
          Start the process
          <br />
          and give your family a peace of mind
        </ButtonText>
      </VideoButton>
    </Container>
  );
};

export default MainPage;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const VideoButton = styled.a`
  position: relative;
  width: 50%;
  max-width: 400px; /* Limit the maximum width */
  overflow: hidden;
  border-radius: 5px;
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: green; /* Fallback for browsers that don't support video */
  padding-top: 56.25%; /* 16:9 aspect ratio */
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const ButtonText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

