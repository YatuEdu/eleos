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



type AddPersonModalProps = {
    buttonText: string,
    role: EleosRoleId,
    existingPeople: EleosRole[],
    needDob?: boolean,
    needEmail?: boolean,
    order? : number,
    onSave: (newRole: EleosRole) => void
};

const NAME_DOB = 'dob'
const NAME_EMAIL = 'email'

const AddPersonModal: React.FC<AddPersonModalProps> = ({ buttonText, role, existingPeople, needDob, needEmail, order, onSave }) => {
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [midtName, setMidName] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [email, setEmail] = useState('')
    const [suffix, setSuffix] = useState('')
    const [relationShip, setRelationShip] = useState('')
    const [valid, setValid] = useState(setValidBasedOnState())
    const [invalidEmail, setInvalidEmail] = useState((needEmail && email || !needEmail) ? '' : WARNING_REQUIRED)
    const [invalidDob, setInvalidDob] = useState((needDob && birthYear || !needDob) ? '' : WARNING_REQUIRED)
    const [invalidRelation, setInvalidRelation] = useState(relationShip ? '' : WARNING_REQUIRED)
    const [existingPersonName, setExistingPersonName] = useState('')
    
    const titleText = role === EleosRoleId.child ? 'Add a child' :
    role === EleosRoleId.child_guardian ? 'Add a guardian' :
    role === EleosRoleId.other_benificiary ? 'Add a benificiary' :
    role === EleosRoleId.executor ? 'Add an exuctor': ''

    const relationSelection = role === EleosRoleId.child ? ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForChildren() : 
                              role === EleosRoleId.child_guardian ? ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForGuardian() :
                              role === EleosRoleId.other_benificiary ? ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForAdditionalHeirs() :
                              ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForExecutor()

    ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairs()
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
        setRelationShip('')
        setExistingPersonName('')
        setValid(false)
    }, [open])

    function setValidBasedOnState() {
        return (needDob && birthYear || !needDob) && (needEmail && email || !needEmail) && firstName && lastName && relationShip ? true : false
    }

    function setValidBasedOnMustHaveState() {
        return firstName && lastName && relationShip || existingPersonName ? true : false
    }

    function setValidBasedOnOptionalState() {
        return (needDob && birthYear || !needDob) && (needEmail && email || !needEmail) ? true : false
    }

    const handleRelationShipChange = (value: string) => {
        const newValid = (needDob && birthYear || !needDob) && (needEmail && email || !needEmail) && firstName && lastName && value ? true : false
        setRelationShip(value)
        setValid(newValid)
        setInvalidRelation(value ? '' : WARNING_REQUIRED)
    }
    
    const handleExistingPersonChange = (value: string) => {
        setExistingPersonName(value)
        setValid(!!value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const convertToRole = (personWithRole: EleosRole, role: EleosRoleId) => {
        switch(role) {
            case EleosRoleId.child:
                throw new Error('cannot convert a person to a child')
            case EleosRoleId.child_guardian:
                const child = personWithRole instanceof EleosChild ? personWithRole as EleosChild : null
                if (child) {
                    if (child.isMinor) {
                        throw new Error('A minor cannot be a guardian')
                    }
                }
                if (order === undefined) {
                    throw new Error('Order is undefined')
                }
                return new EleosGuardian(personWithRole.person, email, order)
                
            case EleosRoleId.other_benificiary:
                if (personWithRole instanceof OtherBenificiary) {
                    return personWithRole
                } else if (personWithRole instanceof EleosChild) {
                    throw new Error('A child cannot be another benificiary')
                } else {
                    return new OtherBenificiary(personWithRole.person)
                }
            case EleosRoleId.executor:
            default:
                throw new Error('Unimplemented')

        }
    }

    const createNewPerson = () => {
        let person = existingPersonName ? existingPeople.find( p => p.display === existingPersonName) : null
        if (person) {
            return convertToRole(person, role)
        }
        const relation = relationShip as EleosRelationshipType
        let newRole = null
        switch(role) {
            case EleosRoleId.child:
                newRole = EleosChild.createFromUi(firstName, midtName, lastName, suffix,  +birthYear, relation)
                break
            case EleosRoleId.child_guardian:
                if (!order) {
                    throw new Error("Order is needed for a guardian")
                }
                newRole = EleosGuardian.create(firstName, midtName, lastName, suffix, relation, email, order)
                break
            case EleosRoleId.other_benificiary:
                newRole = OtherBenificiary.create(firstName, midtName, lastName, suffix, relation)
                break
            default:
                throw new Error("Unknown role for a person")
        }
        return newRole
    }
     
    const handleSave = () => {
        const newPerson = createNewPerson()
        onSave(newPerson)
        setOpen(false)
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
        } else if (name === NAME_EMAIL) {
            setEmail(value)
            if (value) {
                isValid = new RegExp(REGEX_EMAIL).test(value)
                setInvalidEmail(isValid ? '' : WARNING_INVALID)
            } else {
                setInvalidEmail(WARNING_REQUIRED)
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
                    PaperProps={{ style: { 
                        backgroundColor: 'white', 
                        color: 'black', 
                        width: '500px', // Set fixed width
                        height: 'auto', 
                    }}}>
                <DialogTitle  sx={{ backgroundColor: '#d3d3d3', marginBottom: '8px' }}>
                    {titleText}</DialogTitle>
                <DialogContent>
                    {existingPeople.length > 0 && 
                        <div className="ml-2 mr-2">
                            <EleosLabel text="Select a person from the following:" invalidMessage={invalidDob} />
                            <EleosSelect name={'EXISTING_PEOPLE'} 
                                         options={existingPeople.map((p) => ({ label: p.display, value: p.display }))} // Fix: Wrap the object in parentheses instead of double curly braces
                                         onChange={(selectedOption) => handleExistingPersonChange(selectedOption != null ? selectedOption.value : '')} 
                                         value={{ label: existingPersonName, value: existingPersonName }} 
                            />
                        </div>
                    }
                    {existingPersonName === '' && 
                    <div>
                        <EleosName
                        firstNameInput={''}
                        middleNameInput={''}
                        lastNameInput={''}
                        suffixInput={''}
                        onNameChange={onChildNameChange}
                        /> 
                        
                        <div className='ml-2 mr-2'>
                            <EleosLabel text="Relationship" invalidMessage={invalidRelation} />
                            <EleosSelect name={'RELATIONSHIP'} 
                                        options={relationSelection}
                                        onChange={(selectedOption) => handleRelationShipChange(selectedOption ? selectedOption.value : '')}
                                        value={{label:relationShip, value: relationShip}} />
                        </div>
                        {needDob && <div className="ml-2 mr-2">
                        <EleosLabel text="Birth Year" invalidMessage={invalidDob} />
                        <EleosInputBase
                            value={birthYear} 
                            mustHave={true} 
                            name={NAME_DOB} 
                            onTextEntered={(value, vliadCode) => onOptionalFieldChange(NAME_DOB, value, vliadCode === 1)} />
                        </div>
                        }
                        </div>
                        }
                        {needEmail && 
                        <div className='ml-2 mr-2'>
                            <EleosLabel text="Email" invalidMessage={invalidEmail} />
                            <EleosInputBase
                                value={email} 
                                mustHave={true} 
                                regEx={REGEX_EMAIL} 
                                name={NAME_EMAIL} 
                                onTextEntered={(value, vliadCode) => onOptionalFieldChange(NAME_EMAIL, value, vliadCode === 1)} />
                        </div>
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
