'use client'

import AddChildren 
                from '@/components/client/wizard/AddChildren';
import AssetDistributionQuestion 
                from '@/components/client/wizard/AssetDistributionQuestion';
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
import { EleosAppProvider, useElos } 
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
            <Card className="p-4 mt-4" style={{ backgroundColor: '#36454F', color: '#FFD700', width: '80%', height: 'auto', overflow: 'auto'}}>
                <div>
                    { (currentStep === WizardStep.BASIC_INFO) && (<BasicInfo />) }
                    { (currentStep === WizardStep.MARRIAGE_INFO) && (<MarriageInfo />) }
                    { (currentStep === WizardStep.ADD_CHILDREN) && (<AddChildren />) }
                    { (currentStep === WizardStep.CHILDREN_GUARDIAN) && (<ChildrenGuardian />) }
                    { (currentStep === WizardStep.ASSET_DISTRIBUTION_QUESTIONS) && (<AssetDistributionQuestion />)}
                    { (currentStep === WizardStep.MARRIED_PACKAGE) && (<MarriedPackage />) }
                    { (currentStep === WizardStep.COMPLETE_AND_PAYMENT) && (<CompleteAndPayment />) }
                </div>
            </Card>
          
        </>
    )
}
