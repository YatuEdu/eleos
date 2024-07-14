'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WizardData {
    name?: string;
}

export enum WizardStep {
    BASIC_INFO = 1,
    ADD_EXECUTOR = 2,
    MARRIAGE_INFO = 3,
    ADD_CHILDREN = 4,
    CHILDREN_GUARDIAN = 5,
    MARRIED_PACKAGE = 6,
    ADD_ASSET = 7,
    ASSET_DISTRIBUTION_QUESTIONS_WHEN_PRINCIPAL_GOES = 8,
    ASSET_DISTRIBUTION_QUESTIONS_WHEN_SPOUSE_GOES = 9,
    ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO = 10,
    COMPLETE_AND_PAYMENT = 100,
}

interface WizardContextType {
    currentStep: WizardStep;
    currentHelpTextIds: number[];
    wizardData: WizardData;
    updateWizardData: (data: Partial<WizardData>) => void;
    setStep: (step: WizardStep) => void;
    setHelpTextIds: (ids: number[]) => void;
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
    const [currentStep, setStep] = useState<number>(WizardStep.BASIC_INFO);
    const [currentHelpTextIds, setHelpTextIds] = useState<number[]>([]);
    const [wizardData, setWizardData] = useState<WizardData>({});
    
    const updateWizardData = (data: Partial<WizardData>) => {
        setWizardData(prev => ({ ...prev, ...data }));
    }

    //const setStep = (step: WizardStep) => setCurrentStep(step);
    //const setHelpTextIds = (ids: number[]) => setCurrentHelpTextIds(ids);

    return (
        <WizardContext.Provider value={{ currentStep, currentHelpTextIds, wizardData, updateWizardData, setStep, setHelpTextIds}}>
            {children}
        </WizardContext.Provider>
    );
};
