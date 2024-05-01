import React 
                from 'react';
import Button 
                from '@mui/material/Button';
import { Tooltip } 
                from '@mui/material';
import { BUTTON_CLASS_RED, BUTTON_CLASS_RED_DISABLED } 
                from '@/lib/common/constant/TailwindClasses';

type EleosButtonProps = {
    ref?: React.RefObject<HTMLButtonElement>
    text: string,
    className?: string
    disabled?: boolean
    tipDisable?: string
    tipEnabled?: string
    onClick: () => void
};

const EleosButton: React.FC<EleosButtonProps> = ({ref, className, disabled, tipDisable, tipEnabled, text, onClick}) => {
    const [disabledState, setDisabledState] = React.useState(disabled || false)

    const btnEnabledClasses = className ? BUTTON_CLASS_RED + " " + className : BUTTON_CLASS_RED

    React.useEffect(() => {
        setDisabledState(disabled || false);
    }, [disabled]);

    return (
        <Tooltip title={disabledState ? tipDisable : tipEnabled} disableHoverListener={true}>
            <span>
            <Button
                ref={ref ? ref : null}
                className={disabledState ? BUTTON_CLASS_RED_DISABLED : btnEnabledClasses}
                disabled={disabledState}
                onClick={onClick}>
                {text}
            </Button>
            </span>
        </Tooltip>
    );
};

export default EleosButton;