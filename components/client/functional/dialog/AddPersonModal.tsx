import React, { useState } 
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
import { REGEX_BIRTH_YEAR } from '@/lib/common/constant/StringConst';

type AddPersonModalProps = {
    buttonText: string,
    needDob?: boolean,
    onSave: (firstName: string, middleName: string, lastName: string, suffix: string, birthYear?: string) => void
};

                
const AddPersonModal: React.FC<AddPersonModalProps> = ({ buttonText, needDob, onSave }) => {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [midtName, setMidName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [suffix, setSuffix] = useState('');
    const [valid, setValid] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        onSave(firstName, midtName, lastName, suffix, birthYear)
        setOpen(false);
    };

    const oDobChange = (name: string, dob: string, isValid: boolean) => {
        setBirthYear(dob)
     }

    const onChildNameChange = (firstName: string, middleName: string, lastName: string, suffix: string, isValid: boolean) => {
        setFirstName(firstName)
        setMidName(middleName)
        setLastName(lastName)
        setSuffix(suffix)
        setValid(isValid)
     }

    return (
        <div>
             <EleosButton
                className="mb-2"
                disabled={false}
                text={buttonText} 
                onClick={handleClickOpen}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Your Name</DialogTitle>
                <DialogContent>
                <EleosName
                    firstNameInput={''}
                    middleNameInput={''}
                    lastNameInput={''}
                    suffixInput={''}
                    onNameChange={onChildNameChange}
                /> 
                {needDob && <>
                <EleosLabel text="Birth Year" />
                <EleosInputBase
                    value={birthYear} 
                    mustHave={true} 
                    regEx={REGEX_BIRTH_YEAR} 
                    name={'dob'} 
                    onTextEntered={(value, isValid) => oDobChange("", value, isValid)} />
                </>
                }
                             
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        disabled={!valid}
                        onClick={handleSave}>Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPersonModal;
