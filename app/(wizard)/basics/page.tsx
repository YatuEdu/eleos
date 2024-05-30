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


export default function Page() {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current)  {
        throw Error('Eleos is not initialized')  
    }
    const {currentStep} = useWizard()

    return (
        <>
            <Card className="p-4 mt-4 bg-white text-black" style={{  width: '80%', height: 'auto', overflow: 'auto'}}>
                <div>
                    { (currentStep === WizardStep.BASIC_INFO) && (
                        <EleosWizardParent leftChild={<BasicInfo />} rightChild={<EleosHelpPane helpTextEnIds={[HelpTextId.EmailUsage]}/>} />
                    ) }
                     { (currentStep === WizardStep.ADD_EXECUTOR) && (
                        <EleosWizardParent leftChild={<AddExecutor />}  rightChild={<EleosHelpPane helpTextEnIds={[HelpTextId.Eexcutor,]}/>} />
                    ) }
                    { (currentStep === WizardStep.MARRIAGE_INFO) && (
                        <EleosWizardParent leftChild={<MarriageInfo />}  rightChild={<EleosHelpPane helpTextEnIds={[HelpTextId.Marriage, HelpTextId.Marriage2]}/>} />
                    ) }
                    { (currentStep === WizardStep.ADD_CHILDREN) && (
                        <EleosWizardParent leftChild={<AddChildren />} rightChild={<EleosHelpPane helpTextEnIds={[HelpTextId.Childrens]}/>} />
                    ) }
                    { (currentStep === WizardStep.CHILDREN_GUARDIAN) && (
                        <EleosWizardParent leftChild={<ChildrenGuardian />}  rightChild={<EleosHelpPane helpTextEnIds={[HelpTextId.Guardians]}/>} />
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
