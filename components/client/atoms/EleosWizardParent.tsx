import React from 'react';

interface GridParentComponentProps {
    leftChild: React.ReactNode;  // Accepts React nodes as children
    rightChild: React.ReactNode;
}

const EleosWizardParent: React.FC<GridParentComponentProps> = ({ leftChild, rightChild }) => {
    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 border border-gray-600 rounded-md shadow-md">{leftChild}</div>  {/* This takes up 60% (3/5 columns) */}
            <div className="col-span-4 border border-gray-600 rounded-md shadow-md">{rightChild}</div> {/* This takes up 40% (2/5 columns) */}
        </div>
    );
};

export default EleosWizardParent;
