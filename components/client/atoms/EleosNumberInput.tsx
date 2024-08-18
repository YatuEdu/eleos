import { ELEOS_INPUT_STYLE } from '@/lib/common/constant/TailwindClasses';
import React, { useState, useRef, ChangeEvent } from 'react';
import { set } from 'zod';

interface EleosInputBaseProps {
    name: string;
    value: number | undefined;
    placeholder?: string;
    className?: string;
    mustHave?: boolean;
    min?: number;
    max?: number;
    id?: string;
    onTextEntered: (value: string, validCode: number) => void;
}

const EleosNumberInput: React.FC<EleosInputBaseProps> = (props) => {
    const { min, max, value, id, placeholder } = props;
    const [displayValue, setDisplayValue] = useState<string>(value ? value.toLocaleString() : '');
    const [isValid, setIsValid] = useState<number>(props.value ? 1 : 0)         // 0 = empty, -1 = invalid, 1 = valid

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value.replace(/[^0-9]/g, '')              // Remove non-numeric characters
        const inputValueNumberLocale = Number(inputValue).toLocaleString()      // Format with commas
        let validCode = 0
        if (inputValueNumberLocale === 'NaN') {
            validCode = -1;
        } else {
            validCode = 1;
            setDisplayValue(inputValueNumberLocale);
        }
        
        setIsValid(validCode);
        props.onTextEntered(inputValue, validCode);
    }

    return (
        <div>
            <input
                id={id ? id + '_input' : ''}
                placeholder={placeholder}
                className={ELEOS_INPUT_STYLE + ' ' + (props.className || '')}
                type={'text'}
                value={displayValue}
                onChange={handleChange}

            />
        </div>
    );
};

export default EleosNumberInput;
