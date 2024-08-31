import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

interface EleosCheckButtonProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled?: boolean;
}

// Custom styled checkbox
const GreenCheckbox = styled(Checkbox)(({ theme }) => ({
  color: green[400],
  '&.Mui-checked': {
    color: green[600],
  },
}));

const EleosCheckButton: React.FC<EleosCheckButtonProps> = ({ checked, onChange, label, disabled}) => {
  return (
    <FormControlLabel
      control={
        <GreenCheckbox
            disabled={disabled ? disabled : false}
            checked={checked}
            onChange={onChange}
            icon={<CheckBoxOutlineBlankIcon />} // Normal checkbox outline when unchecked
            checkedIcon={<CheckIcon />}         // Green check mark when checked
        />
      }
      label={label}
    />
  );
};

export default EleosCheckButton;
