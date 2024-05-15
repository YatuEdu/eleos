import React, { useState } 
                from 'react';
import IconButton 
                from '@mui/material/IconButton';
import TranslateIcon 
                from '@mui/icons-material/Translate';
import { Language } 
                from '@/lib/client/model/EleosMisc';

interface EleosLanguageProps {
    language: Language;
    setLanguage: (language: Language) => void;
}

const EleosLanguageButton: React.FC<EleosLanguageProps> = ( {language, setLanguage}) => {
    // State to hold the current language
    const [currentLang, setCurrentLanguage] = useState(language);

    // Function to toggle the language
    const toggleLanguage = () => {
        const currentLangnNow = currentLang === Language.En ? Language.Cn : Language.En;
        setCurrentLanguage(currentLangnNow);
        setLanguage(currentLangnNow);
    };

    return (
        <IconButton onClick={toggleLanguage} color="primary" aria-label="switch language" style={{ color: 'green' }}>
            <TranslateIcon />
            {currentLang === Language.En ? 'EN' : '中'}
        </IconButton>
    );
}

export default EleosLanguageButton;
