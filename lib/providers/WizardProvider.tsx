'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WizardData {
    name?: string;
}

interface WizardContextType {
    currentStep: number;
    wizardData: WizardData;
    updateWizardData: (data: Partial<WizardData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const useWizard = (): WizardContextType => {
    const context = useContext(WizardContext);
    if (!context) throw new Error('useWizard must be used within a WizardProvider');
    return context;
};

interface Props {
    children: ReactNode;
}

export const WizardProvider: React.FC<Props> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [wizardData, setWizardData] = useState<WizardData>({});

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);
    
    const updateWizardData = (data: Partial<WizardData>) => {
        setWizardData(prev => ({ ...prev, ...data }));
    };

    return (
        <WizardContext.Provider value={{ currentStep, wizardData, updateWizardData, nextStep, prevStep }}>
            {children}
        </WizardContext.Provider>
    );
};
