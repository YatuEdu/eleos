import { ClassNames } from '@emotion/react';
import React from 'react';

interface EleosLabelProps {
    text: string;
    invalidMessage?: string;
    classNames?: string;
}

const EleosLabel: React.FC<EleosLabelProps> = ({classNames, text, invalidMessage }) => {
    return (
        <div className={classNames}>
            <label className="font-bold">{text}</label>
            <small className='text-red-600 ml-1'>{invalidMessage}</small>
        </div>
    );
};

export default EleosLabel;