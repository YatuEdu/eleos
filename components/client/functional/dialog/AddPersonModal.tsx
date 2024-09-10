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


type AddPersonModalProps = {
    buttonText: string,
    role: EleosRoleId,
    existingPeople: EleosPerson[],
    existingPerson?: EleosPerson,
    order? : number,
    id?: string,
    onSave: (newRole: EleosPerson) => void
};

const NAME_DOB = 'dob'
const NAME_EMAIL = 'email'
const NAME_PHONE = 'phone'

const AddPersonModal: React.FC<AddPersonModalProps> = ({ buttonText, role, existingPeople, existingPerson, order, id, onSave }) => {
    const [open, setOpen] = useState(false)
    // console.log('existingPerson', existingPerson)
    const [firstName, setFirstName] = useState(existingPerson ? existingPerson.firstName : '')
    const [lastName, setLastName] = useState(existingPerson ? existingPerson.lastName : '')
    const [midtName, setMidName] = useState(existingPerson ? existingPerson.middleName : '')
    // @ts-ignore
    const [birthYear, setBirthYear] = useState(existingPerson && existingPerson.birthYear ? existingPerson.birthYear.toString() : '')
    const [emailOrPhone, setEmailOrPhone] = useState(existingPerson ? existingPerson.emailOrPhone : undefined)
    const [suffix, setSuffix] = useState(existingPerson ? existingPerson.suffix : '')
    const [relationShip, setRelationShip] = useState(existingPerson ? existingPerson.relationship : '')
    const [needDob, setNeedDob] = useState(role === EleosRoleId.child)
    const [needEmailOrPhone, setNeedEmailOrPhone] = useState(role === EleosRoleId.child_guardian || role === EleosRoleId.executor)
    const [invalidEmailOrPhone, setInvalidEmailOrPhone] = useState((needEmailOrPhone && emailOrPhone || !emailOrPhone) ? '' : WARNING_REQUIRED)
    const [invalidDob, setInvalidDob] = useState((needDob && birthYear || !needDob) ? '' : WARNING_REQUIRED)
    const [invalidRelation, setInvalidRelation] = useState(relationShip ? '' : WARNING_REQUIRED)
    const [existingPersonName, setExistingPersonName] = useState('')
    const [valid, setValid] = useState(setValidBasedOnState())
    const titleText = role === EleosRoleId.child ? existingPerson ? 'Update a child' : 'Add a child' :
    role === EleosRoleId.child_guardian ? existingPerson ? 'Update a guardian' : 'Add a guardian' :
    role === EleosRoleId.other_benificiary ? 'Add a benificiary' :
    role === EleosRoleId.executor ? 'Add an exuctor (must be 18 or older)': ''

    const relationSelection = role === EleosRoleId.child ? ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForChildren() : 
                              role === EleosRoleId.child_guardian ? ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForGuardian() :
                              role === EleosRoleId.other_benificiary ? ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForAdditionalHeirs() :
                              role === EleosRoleId.executor ?  ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairsForExecutor() : []

    ELEOS_RELATIONSHIP_TYPE_HELPER.getlabelValuePairs()
    /**
     * Reset the form when the dialog is closed
     */
    useEffect(() => {   
        if (!existingPerson) {
            setBirthYear('')
            setEmailOrPhone(undefined)
            setFirstName('')
            setLastName('')
            setMidName('')
            setSuffix('')
            setRelationShip('')
            setExistingPersonName('')
            setValid(false)
        }
    }, [open])

    function setValidBasedOnState() {
        return (needDob && birthYear || !needDob) && (needEmailOrPhone && emailOrPhone || !needEmailOrPhone) && firstName && lastName && relationShip ? true : false
    }

    function setValidBasedOnMustHaveState() {
        return firstName && lastName && relationShip || existingPersonName ? true : false
    }

    function setValidBasedOnOptionalState() {
        return (needDob && birthYear || !needDob) && (needEmailOrPhone && emailOrPhone || !needEmailOrPhone) ? true : false
    }

    const handleRelationShipChange = (value: string) => {
        const newValid = (needDob && birthYear || !needDob) && (needEmailOrPhone && emailOrPhone || !needEmailOrPhone) && firstName && lastName && value ? true : false
        setRelationShip(value)
        setValid(newValid)
        setInvalidRelation(value ? '' : WARNING_REQUIRED)
        // for son or daughter needs biorh year
        if (value === 'Son' || value === 'Daughter') {
            setNeedDob(true)
            setInvalidDob(birthYear ? '' : WARNING_REQUIRED)
            setValid(birthYear ? true : false)
        } else {
            setNeedDob(false)
            setInvalidDob('')
        }
    }
    
    const handleExistingPersonChange = (value: string) => {
        let existingPerson = existingPeople.find( p => p.display === value) 
        if (!existingPerson) {
            throw new Error('Existing person is not found, impossible scenario!')
        }
        setEmailOrPhone(existingPerson.emailOrPhone)
        setExistingPersonName(value)
        setValid(!!value)
    }

    const handleClickOpen = () => {
        setOpen(true);
        if (id ) {
            focusOnDomElement(id + ELEOS_NAME_ID + FIRST_NAME_INPUT_ID + INPUT_ID)
        }
        
    };

    const handleClose = () => {
        setOpen(false);
    }

    const convertToRole = (personWithRole: EleosPerson, role: EleosRoleId) => {
        switch(role) {
            case EleosRoleId.child:
                throw new Error('cannot convert a person to a child')
            case EleosRoleId.child_guardian:
                const child = personWithRole.isChild ? personWithRole.toChild : null
                if (child) {
                    if (child.isMinor) {
                        throw new Error('A minor cannot be a guardian')
                    }
                }
                if (order === undefined) {
                    throw new Error('Order is undefined')
                }
                return new EleosGuardian(personWithRole, emailOrPhone as EmailOrPhone, order).person
                
            case EleosRoleId.other_benificiary:
                if (personWithRole.isOtherBenificiary) {
                    return personWithRole
                } else if (personWithRole.isChild) {
                    throw new Error('A child cannot be another benificiary')
                } else {
                    return new OtherBenificiary(personWithRole).person
                }
            case EleosRoleId.executor:
                if (personWithRole.isExecutor) {
                    return personWithRole
                } else if (personWithRole.isChildAndMinor) {
                    throw new Error('A MINOR child cannot be an executor')
                } else {
                    if (order === undefined) {
                        throw new Error('Order is undefined')
                    }
                    return EleosEexecutor.createFromUiFromExistingPerson(personWithRole, order).person
                }
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
                newRole = EleosGuardian.create(firstName, midtName, lastName, suffix, relation, emailOrPhone, order)
                break
            case EleosRoleId.other_benificiary:
                newRole = OtherBenificiary.create(firstName, midtName, lastName, suffix, relation)
                break
            case EleosRoleId.executor:
                if (!order) {
                    throw new Error("Order is needed for a guardian")
                }
                newRole = EleosEexecutor.createFromUi(firstName, midtName, lastName, suffix, emailOrPhone, order, relation, undefined)
                break
            default:
                throw new Error("Unknown role for a person")
        }
        return newRole ? newRole.person : undefined
    }
     
    const handleSave = () => {
        let newPerson = existingPerson
        if (newPerson) {
            newPerson = createNewPerson()
            if (newPerson instanceof EleosChild && existingPerson instanceof EleosChild) {
                newPerson.childId = existingPerson.childId
            } else if (newPerson instanceof EleosGuardian && existingPerson instanceof EleosGuardian) {
                newPerson.order = existingPerson.order
            }
        } else {
            newPerson = createNewPerson()
        }

        newPerson && onSave(newPerson)
        setOpen(false)
    }

    const onEmailOrPhoneCahnged = (emailOrPhone: EmailOrPhone, validCode: number) => {
        setEmailOrPhone(emailOrPhone)
        const newValid = (needDob && birthYear || !needDob) && (firstName && lastName || existingPersonName) && (validCode === 1)  ? true : false
        setValid(newValid)
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
                id={id ? id + ELEOS_BTN_ID : ''}
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
                <DialogTitle sx={{ backgroundColor: StaticStypes.DIALOG_TITLE_COLOR, marginBottom: '8px',  fontWeight: 800}}>
                    {titleText}
                </DialogTitle>
                <DialogContent>
                    {existingPeople.length > 0 && 
                        <div className="ml-4 mr-4">
                            <EleosLabel text="Select a person from the following:" invalidMessage={invalidDob} />
                            <EleosSelect name={'EXISTING_PEOPLE'} 
                                         options={existingPeople.map((p) => ({ label: p.display, value: p.display }))} // Fix: Wrap the object in parentheses instead of double curly braces
                                         onChange={(selectedOption) => handleExistingPersonChange(selectedOption != null ? selectedOption.value : '')} 
                                         value={{ label: existingPersonName, value: existingPersonName }} 
                            />
                        </div>
                    }
                    {existingPersonName === '' && (!existingPerson || role === EleosRoleId.child) && 
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
                            <EleosLabel text="Relationship" invalidMessage={invalidRelation} />
                            <EleosSelect name={'RELATIONSHIP'} 
                                        options={relationSelection}
                                        onChange={(selectedOption) => handleRelationShipChange(selectedOption ? selectedOption.value : '')}
                                        value={{label:relationShip, value: relationShip}} />
                        </div>
                        {needDob && <div className="ml-4 mr-4">
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
                        { needEmailOrPhone &&
                            <div className='ml-4 mr-4'>
                                <EmailOrPhoneInput emailOrPhone={undefined } onChanged={onEmailOrPhoneCahnged} requirement={EmailOrPhoneRequirementType.optional} />
                            </div>
                            
                        }
                       
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

export default AddPersonModal;
