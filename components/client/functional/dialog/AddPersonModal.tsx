import React, { useEffect, useState } 
                from 'react';
import Dialog 
                from '@mui/material/Dialog';
import DialogTitle 
                from '@mui/material/DialogTitle';
import DialogContent 
                from '@mui/material/DialogContent';
import DialogActions 
                from '@mui/material/DialogActions';
import Button 
                from '@mui/material/Button';
import EleosName 
                from '../EleosName';
import EleosButton 
                from '../../atoms/EleosButton';
import EleosInputBase 
                from '../../atoms/EleosInputBase';
import EleosLabel 
                from '../../atoms/EleosLabel';
import { REGEX_BIRTH_YEAR, REGEX_EMAIL, WARNING_INVALID, WARNING_REQUIRED } from '@/lib/common/constant/StringConst';
import { checkBirthYear } from '@/lib/common/constant/IntegerConst';

type AddPersonModalProps = {
    buttonText: string,
    needDob?: boolean,
    needEmail?: boolean,
    onSave: (firstName: string, middleName: string, lastName: string, suffix: string, birthYear?: string, email?: string) => void
};

const NAME_DOB = 'dob'
const NAME_EMAIL = 'email'

const AddPersonModal: React.FC<AddPersonModalProps> = ({ buttonText, needDob, needEmail, onSave }) => {
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [midtName, setMidName] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [email, setEmail] = useState('')
    const [suffix, setSuffix] = useState('')
    const [valid, setValid] = useState(setValidBasedOnState())
    const [invalidEmail, setInvalidEmail] = useState((needEmail && email || !needEmail) ? '' : WARNING_REQUIRED)
    const [invalidDob, setInvalidDob] = useState((needDob && birthYear || !needDob) ? '' : WARNING_REQUIRED)
    
    /**
     * Reset the form when the dialog is closed
     */
    useEffect(() => {   
        setBirthYear('')
        setEmail('')
        setFirstName('')
        setLastName('')
        setMidName('')
        setSuffix('')
        setValid(false)
    }, [open])

    function setValidBasedOnState() {
        return (needDob && birthYear || !needDob) && (needEmail && email || !needEmail) && firstName && lastName
    }

    function setValidBasedOnMustHaveState() {
        return firstName && lastName
    }

    function setValidBasedOnOptionalState() {
        return (needDob && birthYear || !needDob) && (needEmail && email || !needEmail)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        onSave(firstName, midtName, lastName, suffix, birthYear, email)
        setOpen(false);
    };

    const onOptionalFieldChange = (name: string, value: string, isValid: boolean) => {
        if (name === NAME_DOB) {
            setBirthYear(value)
            if (value) {
               isValid = checkBirthYear(value)
               setInvalidDob(isValid ? '' : WARNING_INVALID)
            } else {
                setInvalidDob(WARNING_REQUIRED)
            }
        } else if (name === NAME_EMAIL) {
            setEmail(value)
            if (value) {
                isValid = new RegExp(REGEX_EMAIL).test(value)
                setInvalidEmail(isValid ? '' : WARNING_INVALID)
            } else {
                setInvalidEmail(   WARNING_REQUIRED)
            }
        }
        setValid(isValid && setValidBasedOnMustHaveState())
    }

    const onChildNameChange = (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => {
        setFirstName(firstName)
        setMidName(middleName)
        setLastName(lastName)
        setSuffix(suffix)
        setValid(setValidBasedOnOptionalState() && valid)
     }

    return (
        <div>
             <EleosButton
                type='add'
                className="mb-2 float-right"
                disabled={false}
                text={buttonText} 
                onClick={handleClickOpen}
            />
            <Dialog open={open} 
                    onClose={handleClose} 
                    PaperProps={{ style: { backgroundColor: '#3B6978', color: '#FFD700', } }}>
                <DialogTitle>Enter Your Name</DialogTitle>
                <DialogContent>
                <EleosName
                    firstNameInput={''}
                    middleNameInput={''}
                    lastNameInput={''}
                    suffixInput={''}
                    onNameChange={onChildNameChange}
                /> 
                {needDob && <div className="ml-2 mr-2">
                <EleosLabel text="Birth Year" invalidMessage={invalidDob} />
                <EleosInputBase
                    value={birthYear} 
                    mustHave={true} 
                    name={NAME_DOB} 
                    onTextEntered={(value, vliadCode) => onOptionalFieldChange(NAME_DOB, value, vliadCode === 1)} />
                </div>
                }
                 {needEmail && <>
                <EleosLabel text="Email" invalidMessage={invalidEmail} />
                <EleosInputBase
                    value={email} 
                    mustHave={true} 
                    regEx={REGEX_EMAIL} 
                    name={NAME_EMAIL} 
                    onTextEntered={(value, vliadCode) => onOptionalFieldChange(NAME_EMAIL, value, vliadCode === 1)} />
                </>
                }
                             
                </DialogContent>
                <DialogActions>
                    <EleosButton
                        type='wizard'
                        className="mr-1"
                        disabled={false}
                        text="Cancel"
                        onClick={handleClose}
                        tipDisable="Enter all the required info and then submit"
                        tipEnabled="Click to save and continue" />
                  <EleosButton
                        type='wizard'
                        className="mr-6"
                        disabled={!valid}
                        text="Save"
                        onClick={handleSave}
                        tipDisable="Enter all the required info and then submit"
                        tipEnabled="Click to save and continue" />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPersonModal;
