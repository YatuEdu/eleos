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
    disabledOptions?: string[];                     // Array of disabled options
    value: string;                                  // Current value
    onChange: (value: string) => void;              // Callback when value changes
    direction?: 'row' | 'column';                   // Direction of radio buttons
}

function RadioButtonGroup({ title, options, value, disabledOptions, onChange, direction }: RadioButtonGroupProps) {
    const [selectedOption, setSelectedOption] = useState(value);
    const [diabledRadioOptions, setDisabledRadioOptions] = useState(disabledOptions ? disabledOptions : []); // Add this line to disable the radio button
    const setControlState = (value: string) => {
        setSelectedOption(value);
        onChange(value)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setControlState(event.target.value);
    }

    /**
     * Handler for key down events, which supports Enter key to move to the next option and made the radio buttons accessible
     * 
     * @param event     
     * @param newSelected 
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, newSelected: string) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Stop default Enter behavior
            const currentIndex = options.findIndex(option => option.value === newSelected);
            const nextIndex = (currentIndex + 1) % options.length;  // Move to next option or loop around
            const nextValue = options[nextIndex].value;
            setControlState(nextValue);
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
                onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(event, selectedOption)} // Handle key down events
                sx={{ flexDirection: direction ? direction : 'column'}} // Add this line to make radio buttons appear on the same line
                >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio 
                            disabled={diabledRadioOptions.includes(option.value)} // Add this line to disable the radio button  
                            icon={<RadioButtonUncheckedIcon sx={{ color: 'black' }} />} // default icon
                            checkedIcon={<CheckIcon />} // icon when checked
                            sx={{ color: 'black', '&.Mui-checked': { color: 'green' } }}
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
