import React, { useState } from 'react';
import EleosLabel from '../atoms/EleosLabel';
import EleosInputBase from '../atoms/EleosInputBase';
import { REGEX_NAME } from '@/lib/common/constant/StringConst';

interface EleosNameProps {
    firstNameInput: string;
    middleNameInput?: string;
    lastNameInput: string;
    suffixInput?: string;
    onNameChange: (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => void;
}

const NAME_FIRSTNAME = 'firstname'
const NAME_MIDDLENAME = 'middlename'
const NAME_LASTNAME = 'lastname'
const NAME_SUFFIX = 'suffix'

const EleosName: React.FC<EleosNameProps> = ({firstNameInput, middleNameInput, lastNameInput, suffixInput, onNameChange}) => {
    const [suffix, setSuffix] = useState(suffixInput ?? '');
    const [lastName, setLastName] = useState(lastNameInput);
    const [middleName, setMiddleName] = useState(middleNameInput ?? '');
    const [firstName, setFirstName] = useState(firstNameInput);
    const [valid, setValid] = useState<boolean>((lastNameInput && firstNameInput) ? true : false)

    /**
     * Set name value and check if the form is valid
     * 
     * @param name 
     * @param value 
     * @param isValid 
     */
    const onchange = (name:string, value: string, isValid: boolean) => {
        console.log({ name, value, isValid})
        let isValidNow = false
        switch(name) {
            case NAME_FIRSTNAME:
                isValidNow = isValid && !!lastName
                setFirstName(value)
                onNameChange(value, middleName, lastName, suffix, isValidNow)
                break
            case NAME_MIDDLENAME:
                isValidNow = isValid && valid
                setMiddleName(value)
                onNameChange(firstName, value, lastName, suffix, isValidNow)
                break
            case NAME_LASTNAME:
                isValidNow = isValid && !!firstName
                setLastName(value)
                onNameChange(firstName, middleName, value, suffix, isValidNow)
                break
            case NAME_SUFFIX:
                isValidNow = isValid && valid
                setSuffix(value)
                onNameChange(firstName, middleName, lastName, value, isValidNow)
                break
        }
    
        setValid(isValidNow)
    }

    return (
        <div className="grid grid-cols-2 gap-1">
            <div>
                <EleosLabel text="First Name" />
                <EleosInputBase 
                    value={firstName} 
                    mustHave={true} 
                    name={NAME_FIRSTNAME} 
                    regEx={REGEX_NAME} 
                    onTextEntered={(value, isValid) => onchange(NAME_FIRSTNAME, value, isValid)} />
            </div>
            <div>
                <EleosLabel text="Middle Name" />
                <EleosInputBase 
                    value={middleName} 
                    mustHave={false}  
                    name={NAME_MIDDLENAME} 
                    onTextEntered={(value, isValid) => onchange(NAME_MIDDLENAME, value, isValid)} />
            </div>
            <div>
                <EleosLabel text="Last Name" />
                <EleosInputBase
                    value={lastName} 
                    mustHave={true} 
                    name={NAME_LASTNAME}
                    regEx={REGEX_NAME} 
                    onTextEntered={(value, isValid) => onchange(NAME_LASTNAME, value, isValid)} />
            </div>
            <div>
                <EleosLabel text="Suffix" />
                <EleosInputBase 
                    value={suffix} 
                    mustHave={false} 
                    name={NAME_SUFFIX} 
                    onTextEntered={(value, isValid) => onchange(NAME_SUFFIX, value, isValid)} />
            </div>
        </div>
    );
};

export default EleosName;