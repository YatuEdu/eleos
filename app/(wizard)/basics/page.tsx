'use client'

import AddChildren from '@/components/client/wizard/AddChildren';
import BasicInfo 
                from '@/components/client/wizard/BasicInfo'
import ChildrenGuardian from '@/components/client/wizard/ChildrenGuaddian';
import MarriageInfo 
                from '@/components/client/wizard/MarriageInfo';
import MarriedPackage 
                from '@/components/client/wizard/MarriedPackage';
import { EleosAppProvider, useElos } 
                from '@/lib/providers/EleosAppProvider'
import { useWizard } 
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
                    { (currentStep === 0) && (<BasicInfo />) }
                    { (currentStep === 1) && (<MarriageInfo />) }
                    { (currentStep === 2) && (<AddChildren />) }
                    { (currentStep === 3) && (<ChildrenGuardian />) }
                    { (currentStep === 4) && (<MarriedPackage />) }
                    { (currentStep === 5) && (<BasicInfo />) }
                </div>
            </Card>
          
        </>
    )
}
