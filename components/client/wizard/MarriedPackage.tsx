import React, { useState } 
                from 'react';
import EleosInputBase 
                from '@/components/client//atoms/EleosInputBase';
import EleosButton 
                from '@/components/client//atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import EleosPhoneInput 
                from '@/components/client/atoms/ElesoPhoneInput';

const NAME_NAME = 'name';

const MarriedPackage: React.FC = () => {
    const [isMarried, setIsMarried] = useState(false);
    const [spouseName, setSpouseName] = useState('');
    const [valid, setValid] = useState(false)
    const {ref} = useElos() ?? {};
    const {setStep} = useWizard()

    const handleMarriageStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMarried(event.target.checked);
    };

    const handleSpouseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpouseName(event.target.value);
    };

    const onchange = (name:string, value: string, isValid: boolean) => {
        console.log({ name, value })
        let spouseName = value
        let isValidNow = false
        switch(name) {
            case NAME_NAME:
                isValidNow = isMarried && spouseName !== ''
                setSpouseName(value)
                break
        }
    
        setValid(isValidNow)
    }

    /**
     * Submit the form and goes to the seconds page
     */
    const onPrev = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
        // go back to the previous step
        const step = ref.current.prevStep()
        step && setStep(step)
    }

    const onNext = () => {  
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
        
        // go to the next step
        const step = ref.current.nextStep()
        setStep(step)
    }

    return (
        <div>
           
            <label>
                Are you married?
                <input type="checkbox" checked={isMarried} onChange={handleMarriageStatusChange} />
            </label>

            {isMarried && (
                <label>
                    Spouse Name:
                    <EleosInputBase value={spouseName} mustHave={true} name='name'
                     onTextEntered={(value, validCode) => onchange(NAME_NAME, value, validCode === 1)} />
             
                </label>
            )}

            <div className="mt-1">
                    <EleosButton
                        type='wizard'
                        disabled={false}
                        text=" < Back" 
                        onClick={onPrev}
                        tipDisable="Enter all the required info and then submit" 
                        tipEnabled="Click to save and continue" />
                    <EleosButton
                    type='wizard'
                        disabled={!valid}
                        text="Save and Continue >" 
                        onClick={onNext}
                        tipDisable="Enter all the required info and then submit" 
                        tipEnabled="Click to save and continue" />
                </div>
        </div>
    );
};

export default MarriedPackage;