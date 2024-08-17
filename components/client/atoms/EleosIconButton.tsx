import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

type IconButtonProps = {
    icon: SvgIconComponent;
    onClick: () => void;
    tooltip: string;
    disabled?: boolean;
};

const EleosIconButton: React.FC<IconButtonProps> = ({ icon: IconComponent, onClick, tooltip, disabled }) => {
    return (
        <Tooltip title={tooltip}>
            <IconButton 
                disabled={disabled}
                color="primary" 
                onClick={onClick}
            >
                <IconComponent />
            </IconButton>
        </Tooltip>
    );
};

export default EleosIconButton;
