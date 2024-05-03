import React, { ChangeEvent } from 'react';
import Select, {SingleValue} from 'react-select';

type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    options: SelectOption[];
    value: SelectOption | null;
    name: string;
    onChange: (selectedOption: SingleValue<SelectOption> | null) => void;
};

const EleosSelect: React.FC<SelectProps> = ({ name, options, value, onChange }) => {
    const customStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
        control: (provided: any) => ({
            ...provided,
            backgroundColor: 'white',
            borderRadius: '4px',
            borderColor: '#e2e8f0',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#cbd5e0',
            },
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused  ? '#b8c2cc' : 'white',
            color: state.isFocused  ? '#ffffff' : '#4a5568',
            '&:active': {
                backgroundColor: '#a0aec0',
            },
        }),
    };

    const handleChange = (selectedOption: SingleValue<SelectOption>) => {
        onChange(selectedOption);
    };

    return (
        <Select
            key={'select_' + name}
            menuPortalTarget={document.body}
            options={options}
            value={value}
            onChange={handleChange}
            styles={customStyles}
        />
    );
};

export default EleosSelect;