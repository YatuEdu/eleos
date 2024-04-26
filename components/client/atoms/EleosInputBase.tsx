import { EleosInputBaseProps } 
                from '@/lib/client/model/EleosMisc';
import React, { useState, useRef, ChangeEvent } 
                from 'react';


// Define the state interface
interface InputState {
    value: string;
    isValid: boolean;
  }

const EleosInputBase: React.FC<EleosInputBaseProps> = (props) => {
    const [value, setValue] = useState<string>(props.value);
    const [isValid, setIsValid] = useState<number>(validate(props.value)); // 0 = empty, -1 = in valid, 1 = valid
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const valid = validate(event.target.value);
        setValue(event.target.value);
        setIsValid(valid);
        props.onTextEntered(event.target.value, valid === 1);
    };

    /**
     * VALIDATE THE value of text field by reg ext and must have rules
     * 
     * @param value 
     * @returns 
     */
    function validate( value: string) {
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

    // Define styles based on the input text length
    const inputStyle = {
        borderColor: !isValid ? 'red' : 'black',
        borderRadius: '5px',
        color: 'black',
        padding: '5px',
        width: '75%',
    };

    return (
        <div>
            <input
                name={props.name}
                type="text"
                value={value}
                onChange={handleChange}
                style={{ ...inputStyle }}
                ref={inputRef}
            />
            {1 !== isValid && <span style={{ color: '#FF7F50', marginLeft: 2 }}>{isValid === 0 ? `required` : `invalid`}</span>}
        </div>
    );
};

export default EleosInputBase;
