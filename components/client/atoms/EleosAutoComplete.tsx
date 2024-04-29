import React 
, { useEffect, useState }                
                from 'react';
import Autocomplete 
                from '@mui/material/Autocomplete';
import TextField 
                from '@mui/material/TextField';
import { createTheme, styled } 
                from '@mui/material/styles';
import { Theme } 
                from '@mui/material/styles';

interface AutoCompleteDropdownProps {
  options: string[];
  onOptionSelect: (selectedOption: string) => void; 
}

interface AutoCompleteDropdownProps {
    options: string[];
    selectedOption: string;
    onOptionSelect: (selectedOption: string) => void;
}


/**
 * Custom styled text field for the autocomplete dropdown
 */
const StyledTextField = styled(TextField)(({ theme, borderColor }: { theme: Theme; borderColor: string }) => ({
    // Add border styling
    '& .MuiInputBase-root': {
        padding: '0px', 
        '& input': {
          padding: '8px 14px', 
        }
    },
    '& .MuiInputBase-input': {
        fontSize: '1rem',
    
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '5px',
        '& fieldset': {
            borderColor: {borderColor},
            borderWidth: '1px',
            border: '1px solid', // Add border styling
            padding: '0',
        },
        '&:hover fieldset': {
            borderColor:  {borderColor} 
        },
        '&.Mui-focused fieldset': {
            borderColor: {borderColor},
            borderWidth: '1px',
            border: '1px solid red', // Add border styling
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        padding: '0',
    },
    '& label.Mui-focused': {
        color: 'red',
    },
}));

const EleosAutoComplete: React.FC<AutoCompleteDropdownProps> = ({selectedOption, options, onOptionSelect }) => {
    // Convert string array to an array of objects expected by MUI Autocomplete
    const optionObjects = options.map((option) => ({ label: option }));
    const [selected, setSelected] = React.useState<string>(selectedOption);
    const [borderColor, setBorderColor] = React.useState('red'); 
    const theme = createTheme();

    useEffect(() => {
        if (selected === '') {
            setBorderColor('red');
        } else {
            setBorderColor('black');
        }
    }, [selected]);
    
    const handleChange = (event: React.ChangeEvent<{}>, value: { label: string } | null) => {
        if (value) {
            setSelected(value.label);
            onOptionSelect(value.label);
        } else {
            setSelected('');
            onOptionSelect('');
        }
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'left', marginLeft: 0,  overflow: 'visible'}}>
                <Autocomplete
                    disablePortal={false}
                    value={{label: selected}}
                    id="combo-box-demo"
                    options={optionObjects}
                    sx={{ width: '99%' }}
                    renderInput={(params) => <StyledTextField {...params} variant="outlined" placeholder='enter the state name ...' borderColor={borderColor} theme={theme}/>}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}

 export default EleosAutoComplete