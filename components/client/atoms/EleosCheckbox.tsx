import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { green } from '@mui/material/colors';

interface EleosCheckboxProps {
    title: string;
    isChecked: boolean;
    set: (value: boolean) => void;
}

const EleosCheckbox: React.FC<EleosCheckboxProps> = ({ title, isChecked, set }) => {
    const [value, setValue] = useState<boolean>(isChecked);

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.checked);
        set(event.target.checked);
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={value}
                    onChange={handleChecked}
                    sx={{
                        marginRight: '0.5rem',
                        '&.Mui-checked': {
                            color: green[600], // Color of the checkmark when checked
                            backgroundColor: 'white', // White background when checked

                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slightly darker on hover when checked
                            }
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)' // Slightly darker on hover when unchecked
                        },
                        '&&:not(.Mui-checked)': {
                            backgroundColor: 'white', // Always white background when not checked
                            borderColor: 'rgba(0, 0, 0, 0.23)' // Border color when not checked
                        }
                    }}
            
                />
            }
            label={` ${title} have children`}
        />
    );
}

export default EleosCheckbox