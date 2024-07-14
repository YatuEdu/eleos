'use client'

import EleosWizardParent 
                from '@/components/client/atoms/EleosWizardParent';
import EleosHelpPane 
                from '@/components/client/functional/EleosHelpPane';
import AddAsset 
                from '@/components/client/wizard/AddAsset';
import AddChildren 
                from '@/components/client/wizard/AddChildren';
import AddExecutor from '@/components/client/wizard/AddExecutor';
import AssetDistributionIfBothGoes 
                from '@/components/client/wizard/AssetDistributionIfBothGo';
import AssetDistributionIfPrincipalGoes 
                from '@/components/client/wizard/AssetDistributionIfPrincipalGoes';
import AssetDistributionIfSpouseGoes 
                from '@/components/client/wizard/AssetDistributionIfSpouseGoes';
import BasicInfo 
                from '@/components/client/wizard/BasicInfo'
import ChildrenGuardian 
                from '@/components/client/wizard/ChildrenGuaddian';
import CompleteAndPayment 
                from '@/components/client/wizard/CompleteAndPayment';
import MarriageInfo 
                from '@/components/client/wizard/MarriageInfo';
import MarriedPackage 
                from '@/components/client/wizard/MarriedPackage';
import { HelpTextId } 
                from '@/lib/client/model/EleosMisc';
import { useElos } 
                from '@/lib/providers/EleosAppProvider'
import { useWizard, WizardStep } 
                from '@/lib/providers/WizardProvider';
import { Card } from '@mui/material';
import { useEffect } from 'react';


export default function Page() {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current)  {
        throw Error('Eleos is not initialized')  
    }
    const {currentStep, setHelpTextIds} = useWizard()

    useEffect(() => {
        switch (currentStep) {  
            case WizardStep.BASIC_INFO:
                setHelpTextIds([HelpTextId.EmailUsage])
                break;
            case WizardStep.ADD_EXECUTOR:
                setHelpTextIds([HelpTextId.Eexcutor])
                break;
            case WizardStep.MARRIAGE_INFO:
                setHelpTextIds([HelpTextId.Marriage, HelpTextId.Marriage2])
                break;
            case WizardStep.ADD_CHILDREN:
                setHelpTextIds([HelpTextId.Childrens])
                break;
            case WizardStep.CHILDREN_GUARDIAN:
                setHelpTextIds([HelpTextId.Guardians])
                break;
            default:
                break;
        }
    }, [currentStep])  

    return (
        <>
            <Card className="p-4 mt-4 bg-white text-black" style={{  width: '80%', height: 'auto', overflow: 'auto'}}>
                <div>
                    { (currentStep === WizardStep.BASIC_INFO) && (
                        <EleosWizardParent leftChild={<BasicInfo />} rightChild={<EleosHelpPane />} />
                    ) }
                     { (currentStep === WizardStep.ADD_EXECUTOR) && (
                        <EleosWizardParent leftChild={<AddExecutor />}  rightChild={<EleosHelpPane />} />
                    ) }
                    { (currentStep === WizardStep.MARRIAGE_INFO) && (
                        <EleosWizardParent leftChild={<MarriageInfo />}  rightChild={<EleosHelpPane />} />
                    ) }
                    { (currentStep === WizardStep.ADD_CHILDREN) && (
                        <EleosWizardParent leftChild={<AddChildren />} rightChild={<EleosHelpPane />} />
                    ) }
                    { (currentStep === WizardStep.CHILDREN_GUARDIAN) && (
                        <EleosWizardParent leftChild={<ChildrenGuardian />}  rightChild={<EleosHelpPane />} />
                    ) }
                     { (currentStep === WizardStep.ADD_ASSET) && (
                        <EleosWizardParent leftChild={<AddAsset />} rightChild={<div><p>will add asset help text here</p></div>} />
                    ) }
                    { (currentStep === WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_PRINCIPAL_GOES) && (
                        <EleosWizardParent leftChild={<AssetDistributionIfPrincipalGoes />} rightChild={<div><p>will add help text here</p></div>} />
                    ) }
                    { (currentStep === WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_SPOUSE_GOES) && (
                        <EleosWizardParent leftChild={<AssetDistributionIfSpouseGoes />} rightChild={<div><p>will add help text here</p></div>} />
                    )}
                    { (currentStep === WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO) && (
                        <EleosWizardParent leftChild={<AssetDistributionIfBothGoes />} rightChild={<div><p>will add help text here</p></div>} />
                    )}
                    { (currentStep === WizardStep.MARRIED_PACKAGE) && (
                        <EleosWizardParent leftChild={<MarriedPackage />} rightChild={<div><p>will add help text here</p></div>} />
                    )}
                    { (currentStep === WizardStep.COMPLETE_AND_PAYMENT) && (
                        <EleosWizardParent leftChild={<CompleteAndPayment />} rightChild={<div><p>will add help text here</p></div>} />
                    )}
                </div>
            </Card>
          
        </>
    )
}
