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
    ADD_EXECUTOR = 5,
    ADD_ASSET = 6,
    ASSET_DISTRIBUTION_QUESTIONS_WHEN_PRINCIPAL_GOES = 7,
    ASSET_DISTRIBUTION_QUESTIONS_WHEN_SPOUSE_GOES = 8,
    ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO = 9,
    WILL_SUMMARY = 10,
    PAYMENT = 100,
    COMPLETION = 101,
}

/**
 * Progress steps for the progress bar, which corresponds to the wizard steps
 */
export enum ProgressSteps {
    BASIC_INFO = 'Basic Info Collection',
    MARRIAGE_INFO = 'Marriage Status',
    CHILDREN = 'Children',                      // include add children and children guardian
    EXECUTORS = 'Executors',
    ASSET_DISTRIBUTION = 'Asset Distribution',  // include add asset, asset distribution questions when principal goes, when spouse goes, when both go
    WILL_SUMMARY = 'Review and Summary',
    PAYMENT = 'Payment',
    COMPLETION = 'Completion',
}

/**
 * Maps between wizard steps and progress steps
 */
export const WizardStepToProgressStep = [
    {
        wizardStep: WizardStep.BASIC_INFO,
        progress:  ProgressSteps.BASIC_INFO,
        progressInx: 0
    },
    {
        wizardStep: WizardStep.MARRIAGE_INFO,
        progress:  ProgressSteps.MARRIAGE_INFO,
        progressInx: 1
    },
    {
        wizardStep: WizardStep.ADD_CHILDREN,
        progress:  ProgressSteps.CHILDREN,
        progressInx: 2
    },
    {
        wizardStep: WizardStep.CHILDREN_GUARDIAN,
        progress:  ProgressSteps.CHILDREN,
        progressInx: 2
    },
    {
        wizardStep: WizardStep.ADD_EXECUTOR,
        progress:  ProgressSteps.EXECUTORS,
        progressInx: 3
    },
    {
        wizardStep: WizardStep.ADD_ASSET,
        progress:  ProgressSteps.ASSET_DISTRIBUTION,
        progressInx: 4
    },
    {
        wizardStep: WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_PRINCIPAL_GOES,
        progress:  ProgressSteps.ASSET_DISTRIBUTION,
        progressInx: 4
    },
    {
        wizardStep: WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_SPOUSE_GOES,
        progress:  ProgressSteps.ASSET_DISTRIBUTION,
        progressInx: 4
    },
    {
        wizardStep: WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO,
        progress:  ProgressSteps.ASSET_DISTRIBUTION,
        progressInx: 4
    },
    {
        wizardStep: WizardStep.WILL_SUMMARY,
        progress:  ProgressSteps.WILL_SUMMARY,
        progressInx: 5
    },
    {
        wizardStep: WizardStep.PAYMENT,
        progress:  ProgressSteps.PAYMENT,
        progressInx: 6
    },
    {
        wizardStep: WizardStep.COMPLETION,
        progress:  ProgressSteps.COMPLETION,
        progressInx: 7
    },
]

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
