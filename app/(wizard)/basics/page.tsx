'use client'

import EleosButton from "@/components/client/atoms/EleosButton"
import EleosInput from "@/components/client/atoms/EleosInput"
import EleosInputBase from "@/components/client/atoms/EleosInputBase"
import EleosLabel from "@/components/client/atoms/EleosLabel"
import { useState } from "react"

const NAME_EMAIL = 'email'
const NAME_FIRSTNAME = 'firstname'
const NAME_MIDDLENAME = 'middlename'
const NAME_LASTNAME = 'lastname'
const NAME_SUFFIX = 'suffix'
const INVALID_EMAIL = 'invalid email'

export default function Page() {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [suffix, setSuffix] = useState('')
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(false)

    const onchange = (name:string, value: string) => {
        console.log({ name, value })
        let isValidNow = false
        switch(name) {
            case NAME_EMAIL:
                isValidNow = value !== '' && value !== INVALID_EMAIL && firstName !== '' && lastName !== ''
                setEmail(value)
                break
            case NAME_FIRSTNAME:
                isValidNow = value !== '' && email !== '' && email !== INVALID_EMAIL && lastName !== ''
                setFirstName(value)
                break
            case NAME_MIDDLENAME:
                setMiddleName(value)
                break
            case NAME_LASTNAME:
                isValidNow = value !== '' && email !== '' && email !== INVALID_EMAIL && firstName !== ''
                setLastName(value)
                break
            case NAME_SUFFIX:
                setSuffix(value)
                break
        }
    
        console.log('is valid', isValidNow ? 'yes' : 'no')
        setValid(isValidNow)
    }

    const validateEmail = (email: string) => {
        if (!email) {
            return false
        }
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
            return false
        }   
        return true
    };

    return (
        <main>
            <div>
                <h1 style={{ fontWeight: 'bold', fontSize: 'larger' }}>Collecting basic information</h1>
                <EleosLabel text="Your email" />
                <EleosInputBase value='' mustHave={true} name={NAME_EMAIL} onTextEntered={value => onchange(NAME_EMAIL, value)} />
                <EleosLabel text="First Name" />
                <EleosInputBase value='' mustHave={true} name={NAME_FIRSTNAME} onTextEntered={value => onchange(NAME_FIRSTNAME, value)} />
                <EleosLabel text="Middle Name" />
                <EleosInputBase value='' mustHave={false}  name={NAME_MIDDLENAME} onTextEntered={value => onchange(NAME_MIDDLENAME, value)} />
                <EleosLabel text="Last Name" />
                <EleosInputBase value='' mustHave={true} name={NAME_LASTNAME} onTextEntered={value => onchange(NAME_LASTNAME, value)} />
                <EleosLabel text="Suffix" />
                <EleosInputBase value='' mustHave={false} name={NAME_SUFFIX} onTextEntered={value => onchange(NAME_SUFFIX, value)} />
                <div className="mt-1">
                    <EleosButton
                        disabled={!valid}
                        text="Save and Continue" 
                        onClick={() => console.log({ firstName, middleName, lastName, suffix, email })} />
                </div>
            </div>
        </main>
    )
}
