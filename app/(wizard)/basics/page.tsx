'use client'

import BasicInfo 
                from '@/components/client/wizard/BasicInfo'
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
            <Card className="p-4" style={{ backgroundColor: 'pink', width: '80%', height: '32rem', overflow: 'auto'}}>
                <div>
                    { (currentStep === 0) && (<BasicInfo />) }
                    { (currentStep === 1) && (<MarriageInfo />) }
                    { (currentStep === 2) && (<MarriedPackage />) }
                </div>
            </Card>
          
        </>
    )
}
