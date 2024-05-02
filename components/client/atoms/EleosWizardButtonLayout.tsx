import React from 'react';

interface EleosWizardButtonLayoutProps {
    leftChild: React.ReactNode;  // Accepts React nodes as children
    rightChild: React.ReactNode;
}

const EleosWizardButtonLayout: React.FC<EleosWizardButtonLayoutProps> = ({ leftChild, rightChild }) => {
    return (
        <div className="grid grid-cols-5 gap-2">
            <div className="col-span-5 flex justify-between">
                <div className="ml-2">{leftChild}</div>
                <div className="mr-2">{rightChild}</div>
            </div>
        </div>
    )
}

export default EleosWizardButtonLayout