"use client"

import React from 'react';
import styled from 'styled-components';

// Styled components
const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #228B22; /* Ocean blue background */
  padding: 10px 20px;
`;

const Logo = styled.img`
  height: 138px;
  width: auto;
`;

const LoginButton = styled.button`
  padding: 8px 16px;
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
      <Logo src="icon.png" alt="Site Logo" />
      <LoginButton>Log In</LoginButton>
    </StyledTitleBar>
  );
}

export default TitleBar;
