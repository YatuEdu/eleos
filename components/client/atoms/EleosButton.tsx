import React from 'react';
import Button from '@mui/material/Button';

type EleosButtonProps = {
    text: string
    disabled?: boolean
    onClick: () => void
};

const EleosButton: React.FC<EleosButtonProps> = ({disabled, text, onClick}) => {
    const [disabledState, setDisabledState] = React.useState(disabled || false)

    React.useEffect(() => {
        setDisabledState(disabled || false);
    }, [disabled]);

    return (
        <Button
            disabled={disabledState}
            style={{ backgroundColor: 'purple', color: 'white', opacity: disabledState ? 0.5 : 1 }} 
            onClick={onClick}>
            {text}
        </Button>
    );
};

export default EleosButton;