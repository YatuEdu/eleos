import React from 'react';
import Button 
        from '@mui/material/Button';
import { Tooltip } 
        from '@mui/material';

type EleosButtonProps = {
    text: string,
    className?: string
    disabled?: boolean
    tipDisable?: string
    tipEnabled?: string
    onClick: () => void
};

const EleosButton: React.FC<EleosButtonProps> = ({className, disabled, tipDisable, tipEnabled, text, onClick}) => {
    const [disabledState, setDisabledState] = React.useState(disabled || false)

    React.useEffect(() => {
        setDisabledState(disabled || false);
    }, [disabled]);

    return (
        <Tooltip title={disabledState ? tipDisable : tipEnabled} disableHoverListener={true}>
            <span>
            <Button
                className={className}
                disabled={disabledState}
                style={{ backgroundColor: 'purple', color: 'white', opacity: disabledState ? 0.5 : 1 }} 
                onClick={onClick}>
                {text}
            </Button>
            </span>
        </Tooltip>
    );
};

export default EleosButton;