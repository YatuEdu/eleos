import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function EleosPhoneInput() {
    const [phone, setPhone] = useState('');

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
    };

    return (
        <TextField
            label="US Mobile Phone"
            value={phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            variant="outlined"
            fullWidth
        />
    );
}

export default EleosPhoneInput;
