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
import { Language } 
        from '@/lib/client/model/EleosMisc';
import { useSearchParams } 
        from 'next/navigation'

// Styled components
const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* Ocean blue background */
  padding: 4px 4px;
`;

const Logo = styled.img`
  height: 99px;
  width: auto;
`;

const LoginButton2 = styled.button`
  padding: 1px 1px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: white; /* Light grey background on hover */
  }
`;

// Component
const TitleBar: React.FC = () => {

  const {ref, language, setLanguage} = useElos() ?? {};
  if (!ref || !ref.current || !setLanguage || !language) {
    throw Error('Eleos is not initialized');
  }

  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  let inoputLang = language
  if (lang){
    inoputLang = Number(lang)
  } else {
    inoputLang = language
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
      <EleosLanguageButton language={inoputLang} setLanguage={handleLanguageChange} />
      <LoginButton />
    </StyledTitleBar>
  );
}

export default TitleBar;
