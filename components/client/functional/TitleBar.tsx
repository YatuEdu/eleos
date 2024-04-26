"use client"

import React from 'react';
import styled from 'styled-components';

// Styled components
const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #36454F; /* Ocean blue background */
  padding: 4px 8px;
`;

const Logo = styled.img`
  height: 148px;
  width: auto;
`;

const LoginButton = styled.button`
  padding: 4px 4px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: #e0e0e0; /* Light grey background on hover */
  }
`;

// Component
const TitleBar: React.FC = () => {
  return (
    <StyledTitleBar>
      <Logo src="/image/logo.png" alt="Site Logo" />
      <LoginButton>Log In</LoginButton>
    </StyledTitleBar>
  );
}

export default TitleBar;
