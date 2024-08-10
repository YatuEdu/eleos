import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { SvgIconComponent } from '@mui/icons-material';

type IconButtonProps = {
    icon: SvgIconComponent;
    onClick: () => void;
    tooltip: string;
    disabled?: boolean;
};

const EleosIconButton: React.FC<IconButtonProps> = ({ icon: IconComponent, onClick, tooltip, disabled }) => {
    return (
        <Tooltip title={tooltip}>
            <Button 
                disabled={disabled}
                variant="contained" 
                color="primary" 
                startIcon={<IconComponent />} 
                onClick={onClick}
            />
        </Tooltip>
    );
};

export default EleosIconButton;
