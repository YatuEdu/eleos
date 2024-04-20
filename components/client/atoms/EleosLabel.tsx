import React from 'react';

interface EleosLabelProps {
    text: string;
}

const EleosLabel: React.FC<EleosLabelProps> = ({ text }) => {
    return (
        <div>
            <label className="font-smibold">{text}</label>
        </div>
    );
};

export default EleosLabel;