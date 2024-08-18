import React, { useEffect, useRef, useState } 
                from 'react';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import EleosName 
                from '../functional/EleosName';
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';
import RadioButtonGroup 
                from '../atoms/EleosRadioGroup';
import { EleosMaritalStatus, } 
                from '@/lib/client/model/EleosDataTypes';
import EleosTitle 
                from '../atoms/EleosTitle';
import { excludeSetOptionForRadio } 
                from '@/lib/client/utilies/UIHelper';

const RADIO_GROUP_TITLE = '';
const maritalOptions = [
    { value: EleosMaritalStatus.married, label: EleosMaritalStatus.married },
    { value: EleosMaritalStatus.divorced, label: EleosMaritalStatus.divorced },
    { value: EleosMaritalStatus.single, label: EleosMaritalStatus.single },
    { value: EleosMaritalStatus.widowed, label: EleosMaritalStatus.widowed },
]

const MarriageInfo: React.FC = () => {
    const {ref} = useElos() ?? {};

    if (!ref || !ref.current)  {
        throw Error('Eleos is not initialized')  
    }
    const {spouse} = ref.current
    const [maritalSatus, setMaritalSatus] = useState(ref.current.marritalStatus)
    const [spouseFirstName, setSpouseFirstName] = useState(spouse ? spouse.person.firstName : '')
    const [sposeMiddleName, setSposeMiddleName] = useState(spouse ? spouse.person.middleName : '')
    const [sposeLastName, setSpouseLastName] = useState(spouse ? spouse.person.lastName : '')
    const [spouseSuffix, setSpouseSuffix] = useState(spouse ? spouse.person.suffix : '')
    const [valid, setValid] = useState(testValidness(spouseFirstName, sposeLastName, maritalSatus))
    const [firstNameElement, setFirstNameElement] = useState<HTMLElement|null>(null)    

    const {setStep} = useWizard()

    const handleMarriageStatusChange = (status: string) => {
        const isMarried = status === EleosMaritalStatus.married
        if (isMarried && EleosMaritalStatus.married !== status) { 
            throw Error('Marriage status cannot be changed once selected.')
        }

        setMaritalSatus(status as EleosMaritalStatus)

        // clear the spouse info if uncheck
        if (!isMarried) {
            setSpouseFirstName('')
            setSposeMiddleName('')
            setSpouseLastName('')
            setSpouseSuffix('')
            setValid(true)
        } else {
            //focusOnDomElement(FIRST_NAME_ELEMENT_ID)
            setValid(testValidness(spouseFirstName, sposeLastName, status as EleosMaritalStatus))
        }
    }

    function testValidness(firstName: string, lastName: string, maritalSatus: EleosMaritalStatus | undefined) {
        const isValid = maritalSatus === undefined ? false :
                        maritalSatus === EleosMaritalStatus.married ? firstName && lastName : !firstName && !lastName
        //console.log(`testValidness: ${isValid}, ${maritalSatus}, ${firstName}, ${lastName}`)
        return isValid
    }

    const onSpouseNameChange = (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => {
        //console.log({ firstName, middleName, lastName, suffix, isValid })
        setSpouseFirstName(firstName)
        setSposeMiddleName(middleName)
        setSpouseLastName(lastName)
        setSpouseSuffix(suffix)
        setValid(testValidness(firstName, lastName, maritalSatus))
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

        if (!maritalSatus) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        if (!valid) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        // spouse already added, update if needed
        if (spouse) {
            const result = ref.current.updateSpouse(spouseFirstName, sposeMiddleName, sposeLastName, spouseSuffix, maritalSatus)
            if (!result.succeeded) {
                alert(result.error)  
                return
            }
        } else {
            // add the spouse and go to the next step
            if (maritalSatus === EleosMaritalStatus.married) {
                const result = ref.current.addSpouse(spouseFirstName, sposeMiddleName, sposeLastName, spouseSuffix, maritalSatus)
                if (!result.succeeded) {
                    alert(result.error)
                    return;
                }
            } else {
                ref.current.marritalStatus = maritalSatus
            }   
        }
         
        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    } 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '90%' }}>
             <div className="mb-8 ml-4">
                <h1 style={{ fontSize: '2rem', color: 'inherit' }}>Your marriage status</h1>
            </div>
            <div style={{ margin: 20 }}>
                <RadioButtonGroup
                    title={RADIO_GROUP_TITLE}
                    options={maritalOptions}
                    disabledOptions={excludeSetOptionForRadio(maritalOptions, maritalSatus)}
                    value={maritalSatus ? maritalSatus : ''}
                    onChange={handleMarriageStatusChange}
                    direction='row'
                />
            </div>
            {maritalSatus === EleosMaritalStatus.married && <div>
                <EleosTitle text='Spouse info' />
                <EleosName 
                    id='spouse_name'
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
                    type='wizard'
                    className="mt-2"
                    disabled={false}
                    text=" < Back" 
                    onClick={onPrev}
                    tipDisable="Enter all the required info and then submit" 
                    tipEnabled="Click to save and continue" />
            } rightChild={
                <EleosButton
                    type='wizard'
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