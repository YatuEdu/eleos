'use client'

import React from 'react';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Container>
      <PhotoContainer>
        <MainPhoto src="/image/family2.png" alt="Main Photo" />
        <StartButton href="/basics">Start Protecting Your Legacy</StartButton>
      </PhotoContainer>
      
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
  position: relative;
  padding: 4 20px;
  margin-top: 6px;
`;

const PhotoContainer = styled.div`
  position: relative;
`;

const MainPhoto = styled.img`
  max-width: 80%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 10%;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StartButton = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  background-color: green;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  max-width: 200px;
  word-wrap: break-word;
  &:hover {
    background-color: green;
  }
`;