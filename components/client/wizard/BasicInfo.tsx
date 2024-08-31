'use client'

import EleosButton 
                from "@/components/client/atoms/EleosButton"
import EleosInputBase 
                from "@/components/client/atoms/EleosInputBase"
import EleosLabel 
                from "@/components/client/atoms/EleosLabel"
import { EleosState, allEleosStates } 
                from "@/lib/client/model/EleosState"
import { useElos } 
                from "@/lib/providers/EleosAppProvider"
import { useRef, useState } 
                from "react"
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import { REGEX_EMAIL, WARNING_INVALID, WARNING_REQUIRED } 
                from "@/lib/common/constant/StringConst"
import EleosName 
                from "../functional/EleosName"
import EleosAutoComplete 
                from "../atoms/EleosAutoComplete"
import { EleosHelpTips } 
                from "../functional/EleosHelpTips"
import { HelpTextId } 
                from "@/lib/client/model/EleosMisc"
import EleosPrincipal 
                from "@/lib/client/model/EleosPrincipal"
import EleosTitle from "../atoms/EleosTitle"
import { autoCompleteEmail } from "@/lib/common/utilities/StringUtil"
import EmailOrPhoneInput from "../functional/EmailOrPhoneInput"
import EmailOrPhone from "@/lib/client/model/EmailOrPhone"
import { EmailOrPhoneRequirementType } from "@/lib/client/model/EleosDataTypes"

const NAME_EMAIL = 'email'
const NAME_STATE = 'state'

const BasicInfo: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current)  {
        throw Error('Eleos is not initialized')  
    }

    const existingPrincipal = ref.current.principal as EleosPrincipal

    // initialize the form with the current values saved earlier
    const {firstName, middleName, lastName, suffix} = existingPrincipal ? existingPrincipal.person
        : {firstName: '', middleName: '', lastName: '', suffix: ''}
    const residenceState = existingPrincipal ? existingPrincipal.residenceState : null
    const emailOrPhone = existingPrincipal ? existingPrincipal.person.emailOrPhone : undefined
    const [invalidState, setInvalidState] = useState(residenceState ? '' : WARNING_REQUIRED)
    const [firstName2, setFirstName] = useState(firstName)
    const [middleName2, setMiddleName] = useState(middleName)
    const [lastName2, setLastName] = useState(lastName)
    const [suffix2, setSuffix] = useState(suffix)
    const [state, setState] = useState(residenceState ? residenceState.name : '')
    const [emailOrPhone2, setEailOrPhone] = useState(emailOrPhone)
    const [valid, setValid] = useState(emailOrPhone?.hasEither && firstName && lastName ? true : false)
    const [validName, setValidName] = useState(firstName && lastName ? true : false)
    const {setStep} = useWizard()
    const submitRef = useRef<HTMLButtonElement | null>(null)

    const checkValid = () => {
       if (valid) {
        submitRef.current?.focus()
       }
    }

    const onEmailOrPhoneCahnged = (emailOrPhone: EmailOrPhone) => {
        setEailOrPhone(emailOrPhone)
        setValid(validName && !!state && emailOrPhone.hasEither)
        checkValid()
    }

    const onStateSelection = (value: string) => {
        setState(value)
        value !== '' ?  setInvalidState('') : WARNING_REQUIRED
    }

    const onNameChange = (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => {
        console.log({ firstName, middleName, lastName, suffix, isValid })
        setFirstName(firstName)
        setMiddleName(middleName)
        setLastName(lastName)
        setSuffix(suffix)
        setValidName(isValid)
        setValid(isValid && emailOrPhone2?.hasEither && state ? true : false)
        checkValid()
    }

    /**
     * Submit the form and goes to the seconds page
     */
    const onSubmit = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

        if (!valid) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        if (!emailOrPhone2) {
            throw Error('Invalid email or phone: IMPOSSIBLE')  
        }

        // @ts-ignore
        const mystate: EleosState = allEleosStates.find(s => s.name === state) 
        if (!mystate) {
            console.error('Invalid state')
            return
        }
        
        // initialize eleose object with the current values
        const result = ref.current.init(firstName2, middleName2, lastName2, suffix2, emailOrPhone2, mystate)
        if (!result.succeeded) {
            alert(result.error)
            return
        }

        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    }
 
    return (
        <>
        <EleosTitle text="Basic Information" />
        <main style={{ position: 'relative' }}>
            <div className="ml-4 mr-4 mb-8">
                <EleosLabel text="The state you live in" invalidMessage={invalidState} />
                <div className="bg-light-gray border border-gray-300 shadow-3d mb-4 -p-2">
                    <EleosAutoComplete
                        selectedOption={state}
                        onOptionSelect={onStateSelection}
                        options={allEleosStates.map(s => s.name)}
                    />
                </div>
                <EmailOrPhoneInput emailOrPhone={emailOrPhone2} onChanged={onEmailOrPhoneCahnged} requirement={EmailOrPhoneRequirementType.requireEither} />
            </div>
            <div className="grid grid-cols-2 gap-1 ml-2">
                
            </div>
            <EleosName 
                firstNameInput={firstName2}
                middleNameInput={middleName2}
                lastNameInput={lastName2}
                suffixInput={suffix2}
                onNameChange={onNameChange}
            />
            <div className="mt-2 ml-2" >
                <EleosButton
                    type='wizard'
                    ref={submitRef}
                    disabled={!valid}
                    text="Save and Continue" 
                    onClick={onSubmit}
                    tipDisable="Enter all the required info and then submit" 
                    tipEnabled="Click to save and continue" />
            </div>
        </main>
        </>
    )
}

export default BasicInfo
