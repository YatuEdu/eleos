import React, { useState } 
                from 'react';
import EleosInputBase 
                from '../atoms/EleosInputBase';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import { SP } from 'next/dist/shared/lib/utils';

const NAME_NAME = 'name';

const MarriageInfo: React.FC = () => {
    const {ref} = useElos() ?? {};
    const {spouse} = ref && ref.current ? ref.current : {spouse: ''};
    const [isMarried, setIsMarried] = useState(!!spouse);
    const [spouseName, setSpouseName] = useState(spouse ?? '');
    const [valid, setValid] = useState(false)
  
    if (ref && ref.current && ref.current.principal) {
        console.log('principal', ref.current.principal)
    } else {
        console.log('principal', null)
    }
    
    const {currentStep, nextStep, prevStep} = useWizard()
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
        console.log('current step', currentStep)
        ref.current.prevStep()
        prevStep()
    }
       
    const onNext = () => {  
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

        if (!valid) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        // go to the next step
        ref.current.spouse = spouseName
        nextStep()
    } 

    return (
        <div>
             <div className="mb-8">
                <h1 style={{ fontSize: '2rem', color: 'white' }}>Enter your marriage status</h1>
            </div>
            <label>
                Are you married?
                <input type="checkbox" checked={isMarried} onChange={handleMarriageStatusChange} />
            </label>

            {isMarried && (
                <label>
                    Spouse Name:
                    <EleosInputBase value={spouseName} mustHave={true} name='name' onTextEntered={(value, isValid) => onchange(NAME_NAME, value, isValid)} />
             
                </label>
            )}

            <div className="mt-1">
                    <EleosButton
                        className="mr-2"
                        disabled={false}
                        text=" < Back" 
                        onClick={onPrev}
                        tipDisable="Enter all the required info and then submit" 
                        tipEnabled="Click to save and continue" />
                    <EleosButton
                        disabled={!valid}
                        text="Save and Continue >" 
                        onClick={onNext}
                        tipDisable="Enter all the required info and then submit" 
                        tipEnabled="Click to save and continue" />
                </div>
        </div>
    );
};

export default MarriageInfo;