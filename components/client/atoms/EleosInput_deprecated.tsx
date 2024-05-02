import React, { useRef, useState } from 'react';

interface EleosInputProps {
    name: string;
    mustHave?: boolean;
    onTextEntered: (value: string) => void;
}

const inputStyleRed = { border: '1px solid red' } 
const EleosInput: React.FC<EleosInputProps> = ({ onTextEntered, name, mustHave}) => {
    const [inputStyle, setInputStyle] = useState(mustHave ? inputStyleRed : {});

    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleBlur = () => {
        if (!inputRef.current) {
            return;
        }
        const enteredValue = inputRef.current.value

        validate(enteredValue)
        onTextEntered(enteredValue);
    }

   const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validate(e.target.value);
   }

   const validate = (value: string) => { 
    if (mustHave && value === '') {
        setInputStyle(inputStyleRed)
        return false    
    } else {
        setInputStyle({})
        return true
    }
   }

    return (
        <input
            type="text"
            ref={inputRef}
            style={inputStyle}
            name={name}
            onBlur={handleBlur}
            onChange={onchange}
        />
    );
};