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
import { Autocomplete, TextField } 
                from "@mui/material"
import EleosAutoComplete from "../atoms/EleosAutoComplete"

const NAME_EMAIL = 'email'
const NAME_STATE = 'state'

const BasicInfo: React.FC = () => {
    const {ref} = useElos() ?? {};

    // initialize the form with the current values saved earlier
    const {firstName, middleName, lastName, suffix, email, residenceState} = (ref && ref.current && ref.current.principal) ? ref.current.principal 
        : {firstName: '', middleName: '', lastName: '', suffix: '', email: '', residenceState: null}

    const [invalidEmail, setInvalidEmail] = useState(email ? '' : WARNING_REQUIRED)
    const [invalidState, setInvalidState] = useState(residenceState ? '' : WARNING_REQUIRED)

    const [firstName2, setFirstName] = useState(firstName)
    const [middleName2, setMiddleName] = useState(middleName)
    const [lastName2, setLastName] = useState(lastName)
    const [suffix2, setSuffix] = useState(suffix)
    const [state, setState] = useState(residenceState ? residenceState.name : '')
    const [email2, setEmail] = useState(email)
    const [valid, setValid] = useState(email && firstName && lastName ? true : false)
    const [validName, setValidName] = useState(firstName && lastName ? true : false)
    const {nextStep} = useWizard()

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
        setValid(isValid && !!email2)
    }

    const onEmailChange = (value: string, validCode: number) => {
        setEmail(value)
        setValid(validCode === 1 && validName)
        if (validCode === 0) {
            setInvalidEmail(WARNING_REQUIRED)
        } else if (validCode === -1) {
            setInvalidEmail(WARNING_INVALID)
        } else {
            setInvalidEmail('')
        }  
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

        // @ts-ignore
        const mystate: EleosState = allEleosStates.find(s => s.name === state) 
        if (!mystate) {
            console.error('Invalid state')
            return
        }
        
        // initialize eleose object
        // @ts-ignore
        ref.current.init(firstName2, middleName2, lastName2, suffix2, email2, mystate)
        ref.current.nextStep()
        console.log('principal set', ref.current.principal)
        nextStep()
        console.log('eleos', ref.current.principal?.email, ref.current.principal?.firstName, ref.current.principal?.lastName)
    }
 
    return (
        <>
        <div className="mb-8">
            <h1 style={{ fontSize: '2rem', color: 'inherit' }}>Enter your basic information</h1>
        </div>
        <main style={{ position: 'relative' }}>
            <div className="grid grid-cols-2 gap-1">
                    <div>
                        <EleosLabel text="Select the state you live in" invalidMessage={invalidState} />
                        <EleosAutoComplete
                            selectedOption={state}
                            onOptionSelect={onStateSelection}
                            options={allEleosStates.map(s => s.name)}
                        />
                    </div>
                <div>
                    <EleosLabel text="Your email" invalidMessage={invalidEmail} />
                    <EleosInputBase 
                        value={email2} 
                        mustHave={true} 
                        name={NAME_EMAIL} 
                        regEx={REGEX_EMAIL} 
                        onTextEntered={(value, validCode) => onEmailChange(value, validCode)} />
                </div>
            </div>
            <EleosName 
                firstNameInput={firstName2}
                middleNameInput={middleName2}
                lastNameInput={lastName2}
                suffixInput={suffix2}
                onNameChange={onNameChange}
            />
            <div className="mt-1" >
                <EleosButton
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
