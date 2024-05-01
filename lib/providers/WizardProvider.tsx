'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WizardData {
    name?: string;
}

export enum WizardStep {
    BASIC_INFO = 1,
    MARRIAGE_INFO = 2,
    ADD_CHILDREN = 3,
    CHILDREN_GUARDIAN = 4,
    MARRIED_PACKAGE = 5,
    ASSET_DISTRIBUTION_QUESTIONS = 6,
    COMPLETE_AND_PAYMENT = 100,
}

interface WizardContextType {
    currentStep: WizardStep;
    wizardData: WizardData;
    updateWizardData: (data: Partial<WizardData>) => void;
    setStep: (step: WizardStep) => void;
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
    const [currentStep, setCurrentStep] = useState<number>(WizardStep.BASIC_INFO);
    const [wizardData, setWizardData] = useState<WizardData>({});
    
    const updateWizardData = (data: Partial<WizardData>) => {
        setWizardData(prev => ({ ...prev, ...data }));
    }

    const setStep = (step: WizardStep) => setCurrentStep(step);

    return (
        <WizardContext.Provider value={{ currentStep, wizardData, updateWizardData, setStep}}>
            {children}
        </WizardContext.Provider>
    );
};
