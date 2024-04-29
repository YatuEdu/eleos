"use client"

import React 
        from 'react';
import styled 
        from 'styled-components';
import LoginButton 
        from './LoginButton';
import EleosLanguageButton 
        from './EleosLanguageButton';
import { useElos } 
        from '@/lib/providers/EleosAppProvider';
import { Language } from '@/lib/client/model/EleosMisc';

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

const LoginButton2 = styled.button`
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

  const {ref, language, setLanguage} = useElos() ?? {};
  if (!ref || !ref.current || !setLanguage || !language) {
    throw Error('Eleos is not initialized');
  }

  const handleLanguageChange = (language: Language) => {
    if (!ref || !ref.current || !setLanguage || !language) {
      throw Error('Eleos is not initialized');
    }
  
    ref.current.lang = language;
    setLanguage(language);
  }

  return (
    <StyledTitleBar>
      <Logo src="/image/logo.png" alt="Site Logo" />
      <EleosLanguageButton language={language} setLanguage={handleLanguageChange} />
      <LoginButton />
    </StyledTitleBar>
  );
}

export default TitleBar;
