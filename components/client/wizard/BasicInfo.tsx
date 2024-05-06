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
    const {setStep} = useWizard()
    const submitRef = useRef<HTMLButtonElement | null>(null)

    const checkValid = () => {
       if (valid) {
        submitRef.current?.focus()
       }
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
        setValid(isValid && !!email2)
        checkValid()
    }

    const onEmailChange = (value: string, validCode: number) => {
        let newEmail = value;

        // Check if the user has entered '@' and provide a suggestion if not already present
        if (value.includes('@')) {
            validCode = 1
            if (value.endsWith('@g')) {
                newEmail = value + 'mail.com';
            } else if (value.endsWith('@h')) {
                newEmail = value + 'otmail.com';
            } else if (value.endsWith('@y')) {
                newEmail = value + 'ahoo.com';
            } else if (value.endsWith('@a')) {
                newEmail = value + 'ol.com';
            } else if (value.endsWith('@q')) {
                newEmail = value + 'q.com';
            } else if (value.endsWith('@i')) {
                newEmail = value + 'cloud.com';
            } else if (value.endsWith('@o')) {
                newEmail = value + 'utlook.com';
            }   else {
                validCode = -1
            }
        }

        console.log({ value, validCode, newEmail })
        setEmail(newEmail);
        setValid(validCode === 1 && validName)
        if (validCode === 0) {
            setInvalidEmail(WARNING_REQUIRED)
        } else if (validCode === -1) {
            setInvalidEmail(WARNING_INVALID)
        } else {
            setInvalidEmail('')
        } 
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

        // @ts-ignore
        const mystate: EleosState = allEleosStates.find(s => s.name === state) 
        if (!mystate) {
            console.error('Invalid state')
            return
        }
        
        // initialize eleose object with the current values
        ref.current.init(firstName2, middleName2, lastName2, suffix2, email2, mystate)
        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    }
 
    return (
        <>
        <div className="mb-8 flex items-center">
            <h1 style={{ fontSize: '2rem', color: 'inherit', marginRight: '1rem', display: 'inline-block' }}>Enter your basic information</h1>
        </div>
        <main style={{ position: 'relative' }}>
            <div className="grid grid-cols-2 gap-1 ml-2">
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
