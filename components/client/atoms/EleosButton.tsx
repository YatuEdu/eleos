import React 
                from 'react';
import Button 
                from '@mui/material/Button';
import { Tooltip } 
                from '@mui/material';
import { BUTTON_CLASS_BLUE, BUTTON_CLASS_GREEN, BUTTON_CLASS_DISABLED } 
                from '@/lib/common/constant/TailwindClasses';

type EleosButtonProps = {
    ref?: React.RefObject<HTMLButtonElement>
    text: string,
    type: 'wizard' | 'add' | 'delete'
    className?: string
    disabled?: boolean
    tipDisable?: string
    tipEnabled?: string
    id?: string
    onClick: () => void
};

const EleosButton: React.FC<EleosButtonProps> = ({ref, type, className, disabled, tipDisable, tipEnabled, id, text, onClick}) => {
    const [disabledState, setDisabledState] = React.useState(disabled || false)

    let btnClass = type === 'wizard' ? BUTTON_CLASS_GREEN : 
                   type === 'add' ?  BUTTON_CLASS_BLUE : BUTTON_CLASS_GREEN
    const btnEnabledClasses = className ? btnClass + " " + className : btnClass
    const btnDisabledClasses = className ? BUTTON_CLASS_DISABLED + " " + className : BUTTON_CLASS_DISABLED

    React.useEffect(() => {
        setDisabledState(disabled || false);
    }, [disabled]);

    return (
        <Tooltip title={disabledState ? tipDisable : tipEnabled} disableHoverListener={true}>
            <span>
            <Button
                id={id ? id + '_btn': ''}
                ref={ref ? ref : null}
                className={disabledState ? btnDisabledClasses : btnEnabledClasses}
                disabled={disabledState}
                onClick={onClick}>
                {text}
            </Button>
            </span>
        </Tooltip>
    );
};

export default EleosButton;