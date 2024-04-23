'use client'

import EleosButton 
                from "@/components/client/atoms/EleosButton"
import EleosInputBase 
                from "@/components/client/atoms/EleosInputBase"
import EleosInputEmail 
                from "@/components/client/atoms/EleosInputEmail"
import EleosLabel 
                from "@/components/client/atoms/EleosLabel"
import Eleos 
                from "@/lib/client/model/Eleos"
import { EleosState, allEleosStates } 
                from "@/lib/client/model/EleosState"
import { useElos } 
                from "@/lib/providers/EleosAppProvider"
import { useState } 
                from "react"
import { useWizard } 
                from '@/lib/providers/WizardProvider';

const NAME_EMAIL = 'email'
const NAME_FIRSTNAME = 'firstname'
const NAME_MIDDLENAME = 'middlename'
const NAME_LASTNAME = 'lastname'
const NAME_SUFFIX = 'suffix'

const BasicInfo: React.FC = () => {
    const {ref} = useElos() ?? {};

    // initialize the form with the current values saved earlier
    const {firstName, middleName, lastName, suffix, email} = (ref && ref.current && ref.current.principal) ? ref.current.principal 
        : {firstName: '', middleName: '', lastName: '', suffix: '', email: ''}

    const [firstName2, setFirstName] = useState(firstName)
    const [middleName2, setMiddleName] = useState(middleName)
    const [lastName2, setLastName] = useState(lastName)
    const [suffix2, setSuffix] = useState(suffix)
    const [state, setState] = useState('Washington')
    const [email2, setEmail] = useState(email)
    const [emailVlid, setEmailValid] = useState(email ? true : false)
    const [valid, setValid] = useState(email ? true : false)
   
    const {currentStep, nextStep} = useWizard()

    if (ref && ref.current && ref.current.principal) {
        console.log('principal', ref.current.principal)
    } else {
        console.log('principal', null)
    }

    const onchange = (name:string, value: string, isValid: boolean) => {
        console.log({ name, value })
        let isValidNow = false
        switch(name) {
            case NAME_EMAIL:
                isValidNow = isValid && firstName2 !== '' && lastName2 !== ''
                setEmail(value)
                setEmailValid(isValid)
                break
            case NAME_FIRSTNAME:
                isValidNow = isValid && emailVlid && lastName2 !== ''
                setFirstName(value)
                break
            case NAME_MIDDLENAME:
                isValidNow = isValid
                setMiddleName(value)
                break
            case NAME_LASTNAME:
                isValidNow = isValid && emailVlid && firstName2 !== ''
                setLastName(value)
                break
            case NAME_SUFFIX:
                isValidNow = isValid
                setSuffix(value)
                break
        }
    
        //console.log('is valid', isValidNow ? 'yes' : 'no')
        setValid(isValidNow)
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
            <h1 style={{ fontSize: '2rem', color: 'white' }}>Enter your basic information</h1>
        </div>
        <main style={{ backgroundColor: 'pink', position: 'relative' }}>
            <div>
                <EleosLabel text="Your email" />
                <EleosInputEmail value={email2} mustHave={true} name={NAME_EMAIL} onTextEntered={(value, isValid) => onchange(NAME_EMAIL, value, isValid)} />
                <EleosLabel text="First Name" />
                <EleosInputBase value={firstName2} mustHave={true} name={NAME_FIRSTNAME} onTextEntered={(value, isValid) => onchange(NAME_FIRSTNAME, value, isValid)} />
                <EleosLabel text="Middle Name" />
                <EleosInputBase value={middleName2} mustHave={false}  name={NAME_MIDDLENAME} onTextEntered={(value, isValid) => onchange(NAME_MIDDLENAME, value, isValid)} />
                <EleosLabel text="Last Name" />
                <EleosInputBase value={lastName2} mustHave={true} name={NAME_LASTNAME} onTextEntered={(value, isValid) => onchange(NAME_LASTNAME, value, isValid)} />
                <EleosLabel text="Suffix" />
                <EleosInputBase value={suffix2} mustHave={false} name={NAME_SUFFIX} onTextEntered={(value, isValid) => onchange(NAME_SUFFIX, value, isValid)} />
            </div>
            <div className="mt-1" style={{ position: 'absolute', bottom: '0', right: '0' }}>
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
