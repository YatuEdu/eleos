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
import EleosName 
                from '../EleosName';
import EleosButton 
                from '../../atoms/EleosButton';
import EleosLabel 
                from '../../atoms/EleosLabel';
import EleosRelationshipTypeHelper, { ELEOS_RELATIONSHIP_TYPE_HELPER, EleosRelationshipType } 
                from '@/lib/client/model/EleosRelationshipType';
import EleosSelect 
                from '../../atoms/EleosSelect';
import EleosGuardian 
                from '@/lib/client/model/EleosGuardian';
import { ELEOS_BTN_ID, FIRST_NAME_INPUT_ID, ELEOS_NAME_ID, focusOnDomElement, INPUT_ID } 
                from '@/lib/client/utilies/UIHelper';
import EmailOrPhoneInput 
                from '../EmailOrPhoneInput'
import EmailOrPhone 
                from '@/lib/client/model/EmailOrPhone'
import { EmailOrPhoneRequirementType } 
                from '@/lib/client/model/EleosDataTypes'
import { StaticStypes } 
                from '@/lib/client/styles/globalStyles'
import EleosEexecutor from '@/lib/client/model/EleosEexcutor';

type ModifyExecutorProps = {
    open: boolean
    close: () => void
    existingPerson: EleosEexecutor | null
    onSave: (newRole: EleosEexecutor) => void
};

const NAME_DOB = 'dob'

const ModifyExecutor: React.FC<ModifyExecutorProps> = ({ open, close, existingPerson, onSave }) => {
    const id = existingPerson ?   existingPerson.order : 0
    // console.log('existingPerson', existingPerson)
    const [firstName, setFirstName] = useState(existingPerson ? existingPerson.person.firstName : '')
    const [lastName, setLastName] = useState(existingPerson ? existingPerson.person.lastName : '')
    const [midtName, setMidName] = useState(existingPerson ? existingPerson.person.middleName : '')
    const [suffix, setSuffix] = useState(existingPerson ? existingPerson.person.suffix : '')
    const [relationShip, setRelationShip] = useState(existingPerson ? existingPerson.person.relationship : '')
    const [emailOrPhone, setEmailOrPhone] = useState(existingPerson ? existingPerson.person.emailOrPhone: undefined)
    const [valid, setValid] = useState(true)
    const titleText = 'Update an executor' 

    useEffect(() => {
        if (existingPerson) {
            setFirstName(existingPerson.person.firstName)
            setMidName(existingPerson.person.middleName)
            setLastName(existingPerson.person.lastName)
            setSuffix(existingPerson.person.suffix)
            setRelationShip(existingPerson.person.relationship)
        }
    }, [existingPerson])
        
    const relationSelection = ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForExecutor() 

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

        existingPerson.person.emailOrPhone = emailOrPhone
        existingPerson.person.firstName = firstName
        existingPerson.person.middleName = midtName
        existingPerson.person.lastName = lastName
        existingPerson.person.suffix = suffix
        existingPerson.person.relationship = relationShip as EleosRelationshipType
        close()
    }

    const onEmailOrPhoneCahnged = (emailOrPhoneInpuy: EmailOrPhone, validCode: number) => {
        setEmailOrPhone(emailOrPhoneInpuy)
        const newValid = firstName && lastName && (validCode === 1)  ? true : false
        setValid(newValid)
    }

    const onNameChange = (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => {
        setFirstName(firstName)
        setMidName(middleName)
        setLastName(lastName)
        setSuffix(suffix)
        setValid(firstName && lastName && isValid ? true : false)
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
                            disabled={EleosRelationshipTypeHelper.isChild(relationShip as EleosRelationshipType)}
                            id={id ? id + ELEOS_NAME_ID : ELEOS_NAME_ID}
                            firstNameInput={firstName}
                            middleNameInput={midtName}
                            lastNameInput={lastName}
                            suffixInput={suffix}
                            onNameChange={onNameChange}
                        /> 
                        <div className='ml-4 mr-4'>
                            <EleosLabel text="Relationship"/>
                            <EleosSelect name={'RELATIONSHIP'} 
                                        disabled={EleosRelationshipTypeHelper.isChild(relationShip as EleosRelationshipType)}
                                        options={relationSelection}
                                        onChange={(selectedOption) => handleRelationShipChange(selectedOption ? selectedOption.value : '')}
                                        value={{label:relationShip, value: relationShip}} />
                        </div>
                        <div className='ml-4 mr-4'>
                                <EmailOrPhoneInput emailOrPhone={emailOrPhone } 
                                    onChanged={onEmailOrPhoneCahnged} 
                                    requirement={EmailOrPhoneRequirementType.optional} />
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

export default ModifyExecutor;
