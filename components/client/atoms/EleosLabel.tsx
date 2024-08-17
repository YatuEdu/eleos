import { ClassNames } from '@emotion/react';
import React from 'react';
import { Typography } from '@mui/material';

interface EleosLabelProps {
    text: string;
    invalidMessage?: string;
    classNames?: string;
    isOptional?: boolean;
}

const EleosLabel: React.FC<EleosLabelProps> = ({classNames, text, invalidMessage, isOptional }) => {
    return (
        <div className={`classNames flex items-center`}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: isOptional ? 400 : 600,
                    color: isOptional ? 'gray' : 'black',
                }}
            >
            {text}
        </Typography>
        {invalidMessage && <small className='text-red-600 ml-1'>{invalidMessage}</small>}
        </div>
    );
};

export default EleosLabel;