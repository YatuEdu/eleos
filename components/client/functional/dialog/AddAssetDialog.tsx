
import React, { MouseEventHandler, useReducer, useState } 
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
import EleosButton 
                from '../../atoms/EleosButton';
import EleosInputBase 
                from '../../atoms/EleosInputBase';
import EleosLabel 
                from '../../atoms/EleosLabel';
import { WARNING_REQUIRED } 
                from '@/lib/common/constant/StringConst';
import { EleosOwnershipType, EleosPropertyType, ELEOS_PROPERTY_TYPE_LIST, ELEOS_OWNERSHIP_TYPE_LIST_MARRIED, ELEOS_OWNERSHIP_TYPE_LIST_SINGLE, OWNER_SHIP_SEPARATE, } 
                from '@/lib/client/model/EleosDataTypes';
import MenuItem 
                from '@mui/material/MenuItem';
import Select 
                from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material';
import EleosSelect from '../../atoms/EleosSelect';
import { Label } from '@mui/icons-material';

type AddAssetProps = {
    buttonText: string,
    principal: string, 
    spouse?: string,
    onSave: (name: string, 
             location: string, 
             note: string, 
             type: EleosPropertyType, 
             ownerShip: EleosOwnershipType, 
             owner?: string) => void
};

type AddAssetState = {
    name: string,
    location: string,
    note: string,
    type: string,
    ownerShip: string,
    owner?: string,
    valid: boolean
}

type AddAssetAction = {
    type: string,
    value: string
}

const NAME_NAME = 'name'
const NAME_LOCATION = 'location'
const NAME_NOTE = 'note'
const NAME_TYPE = 'type'
const NAME_OWNERSHIP = 'ownership'
const NAME_OWNER = 'owner'
const NAME_RESET = 'reset'

const theme = createTheme({
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#f5f5f5', // Set your desired hover color here
                        color: '#333', // Optional: change text color on hover
                    }
                }
            }
        }
    }
});


const AddAssetDialog: React.FC<AddAssetProps> = ({buttonText, principal, spouse, onSave }) => {
    const initialState: AddAssetState = {
        name: '',
        location: '',
        note: '',
        type: '',
        ownerShip: '',
        owner: undefined,
        valid: false
    }

    const [state, dispatch] = useReducer(stateReducer, initialState)
    const [open, setOpen] = useState(false)
    const ownerShipTypes = spouse ? ELEOS_OWNERSHIP_TYPE_LIST_MARRIED : ELEOS_OWNERSHIP_TYPE_LIST_SINGLE

    const handleClickOpen = () => {
        setOpen(true);
        dispatch({type: NAME_RESET, value: ''})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        const typeObj = ELEOS_PROPERTY_TYPE_LIST.find((entry) => entry.name === state.type)
        const ownerShipObj = ownerShipTypes.find((entry) => entry.name === state.ownerShip)
    
        if (!typeObj || !ownerShipObj) {        
            //throw Error('Invalid type or ownership')
            console.error('Invalid type or ownership and type', state.ownerShip, state.type)
            return
        }

        onSave(state.name, state.location, state.note, typeObj, ownerShipObj, state.owner)
        setOpen(false);
    }

    function stateReducer(state: AddAssetState, action: AddAssetAction) {
        let newState = null
        switch (action.type) {
            case NAME_NAME:
                newState = { ...state, name: action.value }
                break
            case NAME_LOCATION:
                newState = { ...state, location: action.value }
                break
            case NAME_NOTE:
                newState = { ...state, note: action.value }
                break
            case NAME_TYPE:
                newState = { ...state, type: action.value }
                break
            case NAME_OWNERSHIP:
                newState = { ...state, ownerShip: action.value }
                break
            case NAME_OWNER:
                newState = { ...state, owner: action.value }    
                break
            case NAME_RESET:
                newState = initialState
                break
            default:
                throw new Error('Unknown action type');
        }

        return {...newState, valid: checkValid(newState)}
    }

    function checkValid(state: AddAssetState): boolean{
        if (state.name.length > 0 && state.type.length > 0 && state.ownerShip.length > 0 && 
            (state.ownerShip !== OWNER_SHIP_SEPARATE || (state.owner && state.owner.length > 0)) ) {  
            return true
        }
        return false
    }

    return (
        <div>
             <EleosButton
                className="mb-2 mr-2 float-right"
                disabled={false}
                text={buttonText} 
                onClick={handleClickOpen}
                /> 
            
            <Dialog open={open} 
                    onClose={handleClose} 
                    PaperProps={{
                        style: {
                            backgroundColor: '#3B6978', 
                            color: '#FFD700',
                            width: '500px', // Set the width of the dialog
                            height: 'auto', // Set the height of the dialog
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }
                    }} >
                <DialogTitle>Add an asset</DialogTitle>
                <DialogContent className='mr-5 parent-container overflow-visible overflow-y-hidden'>
                    <EleosLabel text="Type" />
                    <EleosSelect name={NAME_TYPE} options={ELEOS_PROPERTY_TYPE_LIST.map((entry) => { return { value: entry.name, label: entry.name } })}
                                 onChange={(selectedOption) => dispatch({type: NAME_TYPE, value: selectedOption ? selectedOption.value: ''})} 
                                 value={{label: state.type, value: state.type}} />
                    <EleosLabel text="Ownership" />
                    <EleosSelect name={NAME_OWNERSHIP} options={ownerShipTypes.map((entry) => { return { value: entry.name, label: entry.name } })}
                                 onChange={(selectedOption) => dispatch({type: NAME_OWNERSHIP, value: selectedOption ? selectedOption.value: ''})} 
                                 value={{label: state.ownerShip, value: state.ownerShip}} />
                    {state.ownerShip === OWNER_SHIP_SEPARATE && <>
                        <EleosLabel text="Owner" />
                        <EleosSelect name={NAME_OWNER} options={[principal, spouse].map((name) => { return { value: name ? name :  'NA', label: name ? name :  'NA' } })}
                                 onChange={(selectedOption) => dispatch({type: NAME_OWNER, value: selectedOption ? selectedOption.value: ''})} 
                                 value={{label: state.owner??'', value: state.owner??""}} />
                    </>
                    }  
                    <EleosLabel text="Name" />
                    <EleosInputBase
                        value={state.name} 
                        mustHave={true} 
                        name={NAME_NAME} 
                        onTextEntered={(value, vliadCode) => dispatch({type: NAME_NAME, value: value}) } />
                    <EleosLabel text="Location" />
                    <EleosInputBase
                        value={state.location} 
                        mustHave={false} 
                        name={NAME_LOCATION} 
                        onTextEntered={(value, vliadCode) => dispatch({type: NAME_LOCATION, value: value}) } />
                    <EleosLabel text="Note" />
                    <EleosInputBase
                        value={state.note} 
                        mustHave={false} 
                        name={NAME_NOTE} 
                        onTextEntered={(value, vliadCode) => dispatch({type: NAME_NOTE, value: value}) } />        
                </DialogContent>
                <DialogActions>
                    <Button style={{ backgroundColor: '#F44336', color: 'white' }} onClick={handleClose}>Cancel</Button>
                    <Button 
                        disabled={!state.valid}
                        style={{
                            backgroundColor: state.valid ? '#4CAF50' : '#AAA',
                            color: 'white'
                        }}
                        onClick={handleSave}>Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddAssetDialog
