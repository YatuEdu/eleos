import React from 'react';

interface EleosLabelProps {
    text: string;
    invalidMessage?: string;
}

const EleosLabel: React.FC<EleosLabelProps> = ({ text, invalidMessage }) => {
    return (
        <div>
            <label className="font-smibold">{text}</label>
            <span style={{ color: '#FF7F50', marginLeft: 2 }}>{invalidMessage}</span>
        </div>
    );
};

export default EleosLabel;