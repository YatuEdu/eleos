import { ELEOS_INPUT_STYLE } from '@/lib/common/constant/TailwindClasses';
import React, { useState, useRef, ChangeEvent, useEffect } 
                from 'react';

interface EleosInputBaseProps {
    name: string;
    value: string;
    placeholder?: string;
    className?: string;
    regEx?: RegExp;
    mustHave?: boolean;
    min?: number;
    max?: number;
    id?: string;
    disabled?: boolean;
    onTextEntered: (value: string, validCode: number) => void;
}

const EleosInputBase: React.FC<EleosInputBaseProps> = (props) => {
    //const [mi, setValue] = useState<string>(props.value);
    const {min, max, value, id, placeholder, disabled} = props;
    const inputType = min && max ? 'number' : 'text';
    const [isValid, setIsValid] = useState<number>(validate(props.value)); // 0 = empty, -1 = in valid, 1 = valid
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const validCode = validate(event.target.value);
        //setValue(event.target.value);
        setIsValid(validCode);
        props.onTextEntered(event.target.value, validCode);
    };

    /**
     * VALIDATE THE value of text field by reg ext and must have rules
     * 
     * @param value 
     * @returns 
     */
    function validate(value: string) {
        if (value === '') {
            if (props.mustHave) {
                return 0;
            }
            return 1;
        }
        
        if (props.regEx && !props.regEx.test(value)) {
            return -1;
        }
        return 1;
    };

    const componentDidMount = () => {
        if (inputRef.current) {
            // Access the input element using the ref
            // console.log(inputRef.current);
        }
    };

    return (
        <div >
            <input
                disabled={disabled}
                id={id ? id +'_input' : ''}
                placeholder={placeholder}
                className={ELEOS_INPUT_STYLE  + props.className}
                type={inputType}
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                ref={inputRef}
            />
        </div>
    );
};

export default EleosInputBase;
