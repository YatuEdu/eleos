import React, { use, useEffect, useState } 
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
import { REGEX_BIRTH_YEAR, REGEX_EMAIL, WARNING_INVALID, WARNING_REQUIRED } 
                from '@/lib/common/constant/StringConst';
import { checkBirthYear } 
                from '@/lib/common/constant/IntegerConst';
import { ELEOS_RELATIONSHIP_TYPE_HELPER, EleosRelationshipType } 
                from '@/lib/client/model/EleosRelationshipType';
import EleosSelect 
                from '../../atoms/EleosSelect';
import EleosRole 
                from '@/lib/client/model/EleosRole';
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import EleosChild 
                from '@/lib/client/model/EleosChild';
import EleosGuardian 
                from '@/lib/client/model/EleosGuardian';
import OtherBenificiary 
                from '@/lib/client/model/OtherBenificiary';
import ChildrenGuardian from '../../wizard/ChildrenGuaddian';
import { EleosRoleId } 
                from '@/lib/client/model/EleosRole';
import { autoCompleteEmail } from '@/lib/common/utilities/StringUtil';
import { ELEOS_BTN_ID, FIRST_NAME_INPUT_ID, ELEOS_NAME_ID, focusOnDomElement, INPUT_ID } 
                from '@/lib/client/utilies/UIHelper';
import EmailOrPhoneInput 
                from '../EmailOrPhoneInput';
import EmailOrPhone 
                from '@/lib/client/model/EmailOrPhone';
import EleosEexecutor 
                from '@/lib/client/model/EleosEexcutor';
import { EmailOrPhoneRequirementType } 
                from '@/lib/client/model/EleosDataTypes';
import { StaticStypes } 
                from '@/lib/client/styles/globalStyles';
import Eleos from '@/lib/client/model/Eleos';


type ModifyChildProps = {
    open: boolean
    close: () => void
    existingPerson: EleosChild | null
    onSave: (newRole: EleosChild) => void
};

const NAME_DOB = 'dob'
const NAME_EMAIL = 'email'
const NAME_PHONE = 'phone'

const ModifyChild: React.FC<ModifyChildProps> = ({ open, close, existingPerson, onSave }) => {
    const id = existingPerson ?   existingPerson.id : 0
    // console.log('existingPerson', existingPerson)
    const [firstName, setFirstName] = useState(existingPerson ? existingPerson.person.firstName : '')
    const [lastName, setLastName] = useState(existingPerson ? existingPerson.person.lastName : '')
    const [midtName, setMidName] = useState(existingPerson ? existingPerson.person.middleName : '')
    const [suffix, setSuffix] = useState(existingPerson ? existingPerson.person.suffix : '')
    // @ts-ignore
    const [birthYear, setBirthYear] = useState(existingPerson && existingPerson.birthYear ? existingPerson.birthYear.toString() : '')
    const [relationShip, setRelationShip] = useState(existingPerson ? existingPerson.person.relationship : '')
    const [invalidDob, setInvalidDob] = useState('')
    const [valid, setValid] = useState(true)
    const titleText = 'Update a child' 

    useEffect(() => {
        if (existingPerson) {
            setFirstName(existingPerson.person.firstName)
            setMidName(existingPerson.person.middleName)
            setLastName(existingPerson.person.lastName)
            setSuffix(existingPerson.person.suffix)
            setBirthYear(existingPerson.birthYear.toString())
            setRelationShip(existingPerson.person.relationship)
        }
    }, [existingPerson])
        
    const relationSelection = ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForChildren() 

    function setValidBasedOnState() {
        return (birthYear ) && firstName && lastName && relationShip ? true : false
    }

    const handleRelationShipChange = (value: string) => {
        const newValid = firstName && lastName && value ? true : false
        setRelationShip(value)
        setValid(newValid)

    }

    const handleClose = () => {
        close()
    }
     
    const handleSave = () => {
        if (!existingPerson) {
            throw Error('Existing person must be set')
        }

        existingPerson.birthYear = parseInt(birthYear)
        existingPerson.person.firstName = firstName
        existingPerson.person.middleName = midtName
        existingPerson.person.lastName = lastName
        existingPerson.person.suffix = suffix
        existingPerson.person.relationship = relationShip as EleosRelationshipType
        close()
    }

    const onOptionalFieldChange = (name: string, value: string, isValid: boolean) => {
        if (name === NAME_DOB) {
            setBirthYear(value)
            if (value) {
               isValid = checkBirthYear(value)
               setInvalidDob(isValid ? '' : WARNING_INVALID)
            } else {
                setInvalidDob(WARNING_REQUIRED)
            }
        } 
        setValid(isValid )
    }

    const onChildNameChange = (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => {
        setFirstName(firstName)
        setMidName(middleName)
        setLastName(lastName)
        setSuffix(suffix)
        setValid(valid)
     }

    return (
        <div>
            <Dialog open={open} 
                    onClose={handleClose} 
                    PaperProps={{ style: { 
                        backgroundColor: 'white', 
                        color: 'black', 
                        width: '500px', // Set fixed width
                        height: 'auto', 
                    }}}>
                <DialogTitle sx={{ backgroundColor: StaticStypes.DIALOG_TITLE_COLOR, marginBottom: '8px',  fontWeight: 800}}>
                    {titleText}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <EleosName
                            id={id ? id + ELEOS_NAME_ID : ELEOS_NAME_ID}
                            firstNameInput={firstName}
                            middleNameInput={midtName}
                            lastNameInput={lastName}
                            suffixInput={suffix}
                            onNameChange={onChildNameChange}
                        /> 
                        <div className='ml-4 mr-4'>
                            <EleosLabel text="Relationship"/>
                            <EleosSelect name={'RELATIONSHIP'} 
                                        options={relationSelection}
                                        onChange={(selectedOption) => handleRelationShipChange(selectedOption ? selectedOption.value : '')}
                                        value={{label:relationShip, value: relationShip}} />
                        </div>
                        <div className='ml-4 mr-4'>
                            <EleosLabel text="Birth Year" invalidMessage={invalidDob} />
                            <EleosInputBase
                                value={birthYear} 
                                mustHave={true} 
                                name={NAME_DOB} 
                                onTextEntered={(value, vliadCode) => onOptionalFieldChange(NAME_DOB, value, vliadCode === 1)} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <EleosButton
                        type='delete'
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

export default ModifyChild;
