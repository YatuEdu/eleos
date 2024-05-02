import React, { useState, useRef, ChangeEvent, useEffect } 
                from 'react';

interface EleosInputBaseProps {
                    name: string;
                    value: string;
                    className?: string;
                    regEx?: RegExp;
                    mustHave?: boolean;
                    onTextEntered: (value: string, validCode: number) => void;
}

const EleosInputBase: React.FC<EleosInputBaseProps> = (props) => {
    //const [value, setValue] = useState<string>(props.value);
    const { value } = props;
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
                className={`border ${!isValid ? 'border-red-500' : 'border-black'} rounded-md text-black p-1 w-full `  + props.className}
                type="text"
                value={value}
                onChange={handleChange}
                ref={inputRef}
            />
        </div>
    );
};

export default EleosInputBase;
