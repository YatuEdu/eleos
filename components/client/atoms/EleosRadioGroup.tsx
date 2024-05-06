import React, { useState } 
                from 'react';
import Radio 
                from '@mui/material/Radio';
import RadioGroup 
                from '@mui/material/RadioGroup';
import FormControlLabel 
                from '@mui/material/FormControlLabel';
import FormControl 
                from '@mui/material/FormControl';
import FormLabel 
                from '@mui/material/FormLabel';
import CheckIcon 
                from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon 
                from '@mui/icons-material/RadioButtonUnchecked';
                

interface RadioButtonGroupProps {
    title: string;                                  // Label for the group, e.g., "Gender"
    options: { value: string; label: string }[];    // Array of options
    value: string;                                  // Current value
    onChange: (value: string) => void;              // Callback when value changes
    direction?: 'row' | 'column';                   // Direction of radio buttons
}

function RadioButtonGroup({ title, options, value, onChange, direction }: RadioButtonGroupProps) {
    const [selectedOption, setSelectedOption] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value)
    }

    // Handler for key down events
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, newSelected: string) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Stop default Enter behavior
            const currentIndex = options.findIndex(option => option.value === newSelected);
            const nextIndex = (currentIndex + 1) % options.length;  // Move to next option or loop around
            setSelectedOption(options[nextIndex].value);
        }
      }

    return (
        <FormControl component="fieldset">
            <FormLabel 
                className='text-inherit ' component="legend">{title}</FormLabel>
            <RadioGroup
                aria-label={title.toLowerCase()}
                name={title.toLowerCase()}
                value={selectedOption}
                onChange={handleChange}
                onKeyDown={(event) => handleKeyDown(event, selectedOption)} // Handle key down events
                sx={{ flexDirection: direction ? direction : 'column'}} // Add this line to make radio buttons appear on the same line
                >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio   
                            icon={<RadioButtonUncheckedIcon />} // default icon
                            checkedIcon={<CheckIcon />} // icon when checked
                            sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                        />} 
                        label={option.label}
                        sx={{ whiteSpace: 'pre-line' }} // Add this line to allow carriage return
                    />
                ))}
            </RadioGroup>
        </FormControl>  
    )
}

export default RadioButtonGroup
