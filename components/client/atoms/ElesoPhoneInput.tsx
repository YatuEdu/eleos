import React, { useState } 
                from 'react'
import TextField 
                from '@mui/material/TextField'
import { ELEOS_PHONE_INPUT_ID } from '@/lib/client/utilies/UIHelper';

interface EleosInputForUSPhoneProps {
    name: string;
    value: string;
    onPhoneChanged: (value: string, validCode: number) => void;
}

const EleosPhoneInput: React.FC<EleosInputForUSPhoneProps> = (props) => {
    const {name, value, onPhoneChanged} = props;
    const [phone, setPhone] = useState(value);

    // Function to handle phone number input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        let numbers = value.replace(/\D/g, ''); // Strip all non-numeric characters
        let formattedNumber = '';

        // Slice the string and add the formatting
        if (numbers.length > 0) {
            formattedNumber += `(${numbers.slice(0, 3)}`; // Area code
        }
        if (numbers.length >= 4) {
            formattedNumber += `) ${numbers.slice(3, 6)}`; // First three digits
        }
        if (numbers.length >= 7) {
            formattedNumber += `-${numbers.slice(6, 10)}`; // Last four digits
        }

        setPhone(formattedNumber); // Update the state
        onPhoneChanged(formattedNumber, 1); // Call the parent function
    }

    return (
        <TextField
            className='mt-2'
            id={ELEOS_PHONE_INPUT_ID}
            name={name}
            label="US Mobile Phone"
            value={phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            variant="outlined"
            fullWidth
        />
    );
}

export default EleosPhoneInput
