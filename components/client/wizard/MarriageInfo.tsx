import React, { useState } 
                from 'react';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import EleosName 
                from '../functional/EleosName';
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import Checkbox from 
                '@mui/material/Checkbox';
import FormControlLabel 
                from '@mui/material/FormControlLabel';
import EleosWizardButtonLayout from '../atoms/EleosWizardButtonLayout';

const NAME_NAME = 'name';

const MarriageInfo: React.FC = () => {
    const {ref} = useElos() ?? {};
    const {spouse} = ref && ref.current ? ref.current : {spouse: null};
    const [isMarried, setIsMarried] = useState(!!spouse);

    const [spouseFirstName, setSpouseFirstName] = useState(spouse ? spouse.firstName : '')
    const [sposeMiddleName, setSposeMiddleName] = useState(spouse ? spouse.middleName : '')
    const [sposeLastName, setSpouseLastName] = useState(spouse ? spouse.lastName : '')
    const [spouseSuffix, setSpouseSuffix] = useState(spouse ? spouse.suffix : '')
    const [valid, setValid] = useState(testValidness(spouseFirstName, sposeLastName, isMarried))
  
    if (ref && ref.current && ref.current.principal) {
        console.log('principal', ref.current.principal)
    } else {
        console.log('principal', null)
    }
    
    const {setStep} = useWizard()

    const handleMarriageStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMarried(event.target.checked);

        // clear the spouse info if uncheck
        if (!event.target.checked) {
            setSpouseFirstName('')
            setSposeMiddleName('')
            setSpouseLastName('')
            setSpouseSuffix('')
            setValid(true)
        } else {
            setValid(testValidness(spouseFirstName, sposeLastName, event.target.checked))
        }
    };

    function testValidness(firstName: string, lastName: string, isMarried: boolean) {
        return isMarried ? firstName && lastName : true
    }

    const onSpouseNameChange = (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => {
        console.log({ firstName, middleName, lastName, suffix, isValid })
        setSpouseFirstName(firstName)
        setSposeMiddleName(middleName)
        setSpouseLastName(lastName)
        setSpouseSuffix(suffix)
        setValid(testValidness(firstName, lastName, isMarried))
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
        setStep(step)
    }
       
    const onNext = () => {  
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

        if (!valid) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        // go to the next step
        if (!isMarried) {
            ref.current.setSpouse(null)
        } else {
            const result = ref.current.setSpouse(new EleosPerson(spouseFirstName, sposeMiddleName, sposeLastName, spouseSuffix))
            if (!result.succeeded) {
                alert(result.error)
                return;
            }
        }    
         
        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    } 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '90%' }}>
             <div className="mb-8">
                <h1 style={{ fontSize: '2rem', color: 'inherit' }}>Enter your marriage status</h1>
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isMarried}
                        onChange={handleMarriageStatusChange}
                        name="checkedB"
                        className={`
                            text-yellow-500
                            ${isMarried ? 'bg-gray-200 rounded-md' : ''}
                            hover:bg-gray-300
                            ml-2
                        `}
                    />
                }
                label="Are you currently married?"
            />

            {isMarried && <div>
                <div className="mb-4">
                    <h1 style={{ fontSize: '1.5rem', color: 'inherit' }}>Enter the name of your spouse</h1>
                </div>
                <EleosName 
                    firstNameInput={spouseFirstName}
                    middleNameInput={sposeMiddleName}
                    lastNameInput={sposeLastName}
                    suffixInput={spouseSuffix}
                    onNameChange={onSpouseNameChange}
                />     
            </div>
            }

            <EleosWizardButtonLayout leftChild={
                <EleosButton
                    className="mt-2"
                    disabled={false}
                    text=" < Back" 
                    onClick={onPrev}
                    tipDisable="Enter all the required info and then submit" 
                    tipEnabled="Click to save and continue" />
            } rightChild={
                    <EleosButton
                        className="mt-2"
                        disabled={!valid}
                        text="Save and Continue >" 
                        onClick={onNext}
                        tipDisable="Enter all the required info and then submit" 
                        tipEnabled="Click to save and continue" />
            } />
        </div>
    )
}

export default MarriageInfo;