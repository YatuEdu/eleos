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
    disabled?: boolean;
    onChange: (selectedOption: SingleValue<SelectOption> | null) => void;
};

const EleosSelect: React.FC<SelectProps> = ({ name, options, value, disabled, onChange }) => {
    const customStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#f8f9fa', // bg-light-gray
            borderRadius: '4px',
            borderColor: state.isFocused ? '#a0aec0' : '#d1d5db', // focus:border-darker-gray or border-gray-300
            boxShadow: state.isFocused ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)', // focus:shadow-3d-focus or shadow-3d',
            padding: '1px', // p-2
            width: '100%', // w-full
            height: '45px', // Set a specific height
            '&:hover': {
                borderColor: '#cbd5e0',
            },
            '&:focus': {
                outline: 'none', // focus:outline-none
            },
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#a0aec0' : '#ffffff', // focus:bg-darker-gray or bg-light-gray
            color: state.isFocused ? '#ffffff' : '#4a5568', // text color based on focus state
            '&:active': {
                backgroundColor: '#a0aec0', // active:bg-darker-gray
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
        }),
    };

    const handleChange = (selectedOption: SingleValue<SelectOption>) => {
        onChange(selectedOption);
    };

    return (
        <Select
            isDisabled={disabled}
            key={'select_' + name}
            menuPortalTarget={document.body}
            options={options}
            value={value}
            onChange={handleChange}
            styles={customStyles}
            placeholder={'Select an option'} 
            isClearable
        />
    );
};

export default EleosSelect;