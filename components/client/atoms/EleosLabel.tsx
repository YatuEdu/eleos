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
            <label className="font-smibold">{text}</label>
            <span style={{ color: '#FF7F50', marginLeft: 2 }}>{invalidMessage}</span>
        </div>
    );
};

export default EleosLabel;