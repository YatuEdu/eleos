import React, { useState } 
                from 'react';
import EleosLabel 
                from '../atoms/EleosLabel';
import EleosInputBase 
                from '../atoms/EleosInputBase';
import { REGEX_NAME, WARNING_REQUIRED } 
                from '@/lib/common/constant/StringConst';

interface EleosNameProps {
    firstNameInput: string;
    middleNameInput?: string;
    lastNameInput: string;
    suffixInput?: string;
    controlName?: string;
    id?: string;
    onNameChange: (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => void;
}

const NAME_FIRSTNAME = 'firstname'
const WARNING_FN_REQUIRED = 'first name required'
const WARNING_FN_INVALID = 'first Name invalid'
const WARNING_LN_REQUIRED = 'last name required'
const WARNING_LN_INVALID = 'last name invalid'
const NAME_MIDDLENAME = 'middlename'
const WARNING_MN_INVALID = 'middle name invalid'
const NAME_LASTNAME = 'lastname'
const NAME_SUFFIX = 'suffix'
const WARNING_SUFFIX_INVALID = 'suffix invalid'

const EleosName: React.FC<EleosNameProps> = ({firstNameInput, middleNameInput, lastNameInput, suffixInput, controlName, id, onNameChange}) => {
    const [suffix, setSuffix] = useState(suffixInput ?? '');
    const [lastName, setLastName] = useState(lastNameInput);
    const [middleName, setMiddleName] = useState(middleNameInput ?? '');
    const [firstName, setFirstName] = useState(firstNameInput);
    const [valid, setValid] = useState<boolean>((lastNameInput && firstNameInput) ? true : false)
    const [invalidName, setInvalidName] = useState(!firstNameInput ? WARNING_FN_REQUIRED : lastNameInput ? WARNING_LN_REQUIRED : '')

    /**
     * Set name value and check if the form is valid
     * 
     * @param name 
     * @param value 
     * @param isValid 
     */
    const onchange = (name:string, value: string, isValid: boolean) => {
        let isValidNow = false
        switch(name) {
            case NAME_FIRSTNAME:
                if (value && !isValid) {
                    setInvalidName(WARNING_FN_INVALID)
                } else {
                    setInvalidName(!value ? WARNING_FN_REQUIRED : !lastName ?  WARNING_LN_REQUIRED : ''  )
                }
                isValidNow = isValid && !!lastName
                setFirstName(value)
                onNameChange(value, middleName, lastName, suffix, isValidNow)
                break
          
            case NAME_LASTNAME:
                if (value && !isValid) {
                    setInvalidName(WARNING_LN_INVALID)
                } else {
                    setInvalidName(!value ? WARNING_LN_REQUIRED : !firstName ?  WARNING_FN_REQUIRED : ''  )
                }
                isValidNow = isValid && !!firstName
                setLastName(value)
                onNameChange(firstName, middleName, value, suffix, isValidNow)
                break

            case NAME_MIDDLENAME:
                if (value && !isValid) {
                    setInvalidName(WARNING_MN_INVALID)
                } else {
                    setInvalidName(!firstName ? WARNING_FN_REQUIRED : !lastName ? WARNING_LN_REQUIRED : ''  )
                }
                
                isValidNow = isValid && valid
                setMiddleName(value)
                onNameChange(firstName, value, lastName, suffix, isValidNow)
                break

            case NAME_SUFFIX:
                if (value && !isValid) {
                    setInvalidName(WARNING_SUFFIX_INVALID)
                } else {
                    setInvalidName(!firstName ? WARNING_FN_REQUIRED : !lastName ? WARNING_LN_REQUIRED : ''  )
                }
                isValidNow = isValid && valid
                setSuffix(value)
                onNameChange(firstName, middleName, lastName, value, isValidNow)
                break
        }
    
        setValid(isValidNow)
    }

    return (
        <>
        <div className="grid grid-cols-2 gap-1 ml-4 mr-4">
            <EleosLabel text="Name" invalidMessage={invalidName}/>
        </div>
        <div className="grid grid-cols-2 gap-1 ml-4 mr-4">
            
            <div>
                <EleosInputBase 
                    id={id ? id + '_firstname' : ''   }
                    placeholder='First Name'
                    value={firstName} 
                    mustHave={true} 
                    name={NAME_FIRSTNAME} 
                    regEx={REGEX_NAME} 
                    onTextEntered={(value, validCode) => onchange(NAME_FIRSTNAME, value, validCode === 1)} />
            </div>
            <div>
                <EleosInputBase
                    value={lastName} 
                    placeholder='Last Name'
                    mustHave={true} 
                    name={NAME_LASTNAME}
                    regEx={REGEX_NAME} 
                    onTextEntered={(value, validCode) => onchange(NAME_LASTNAME, value, validCode === 1)} />
            </div>
            <div>
                <EleosInputBase 
                    value={middleName} 
                    placeholder='Middle Name'
                    mustHave={false}  
                    regEx={REGEX_NAME} 
                    name={NAME_MIDDLENAME} 
                    onTextEntered={(value, validCode) => onchange(NAME_MIDDLENAME, value, validCode === 1)} />
            </div>
            <div>
                <EleosInputBase 
                    value={suffix} 
                    placeholder='Suffix'
                    mustHave={false} 
                    name={NAME_SUFFIX} 
                    regEx={REGEX_NAME}
                    onTextEntered={(value, validCode) => onchange(NAME_SUFFIX, value, validCode === 1)} />
            </div>
        </div>
        </>
    );
};

export default EleosName;