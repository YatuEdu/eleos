
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
import EleosSelect from '../../atoms/EleosSelect';
import EleosHelpPane from '../EleosHelpPane';
import { HelpTextId } from '@/lib/client/model/EleosMisc';
import { set } from 'zod';
import { EPT_HELPER, EleosPropertyType } 
                from '@/lib/client/model/EleosPropertyType';
import { EAOT_HELPER, ELEOS_OWNERSHIP_TYPE_LIST_MARRIED, ELEOS_OWNERSHIP_TYPE_LIST_SINGLE, EleosAssetOwnerShipType } 
                from '@/lib/client/model/EleosAssetOwnerShipType';

type AddAssetProps = {
    buttonText: string,
    principal: string, 
    spouse?: string,
    onSave: (name: string, 
             location: string, 
             note: string, 
             type: EleosPropertyType, 
             ownerShip: EleosAssetOwnerShipType, 
             owner?: string) => void
};

type AddAssetState = {
    name: string,
    location: string,
    locationLabel: string,
    note: string,
    type: string,
    invalidType?: string,
    invalidOwnership?: string,
    invalidName?: string,
    invalidOwner?: string,
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
const LOCATION_LABEL_LOC = 'Location'
const LOCATION_LABEL_BANK_BRANCH = 'Bank Branch'
const LOCATION_LABEL_INS = 'Insurance Company'
const LOCATION_LABEL_BROKAGE = 'Brokage Firm'

const AddAssetDialog: React.FC<AddAssetProps> = ({buttonText, principal, spouse, onSave }) => {
    const initialState: AddAssetState = {
        type: '',
        invalidType: '',
        ownerShip: '',
        invalidOwnership: '',
        name: '',
        invalidName: '',
        invalidOwner: '',
        location: '',
        locationLabel: '',
        note: '',
        owner: undefined,
        valid: false
    }

    const [state, dispatch] = useReducer(stateReducer, initialState)
    const [open, setOpen] = useState(false)
    const ownerShipTypeLabelValuePairs = spouse ? 
                        EAOT_HELPER.getlabelValuePairsForCouples() :
                        EAOT_HELPER.getlabelValuePairsForSingle()

    const handleClickOpen = () => {
        setOpen(true);
        dispatch({type: NAME_RESET, value: ''})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        const typeValue = state.type as EleosPropertyType
        const ownerShipValue = state.ownerShip as EleosAssetOwnerShipType
    
        if (!typeValue || !ownerShipValue) {        
            //throw Error('Invalid type or ownership')
            console.error('Invalid type or ownership and type', state.ownerShip, state.type)
            return
        }

        onSave(state.name, state.location, state.note, typeValue, ownerShipValue, state.owner)
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
                newState = { ...state, type: action.value, locationLabel: setLocationLabel(action.value) }
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

        return checkValid(newState)
    }

    function setLocationLabel(name: string): string {
        if (name === EleosPropertyType.bankAccount) {
            return LOCATION_LABEL_BANK_BRANCH
        } else if (name === EleosPropertyType.lifeInsurance) {
            return LOCATION_LABEL_INS
        } else if (name === EleosPropertyType.investment  || name === EleosPropertyType.retirement) {
            return LOCATION_LABEL_BROKAGE
        } else if (name === EleosPropertyType.realEstate) {
            return LOCATION_LABEL_LOC
        } else {
            return ''
        }
    }

    function checkValid(state: AddAssetState): AddAssetState {
        let result = state
        let hasInvalid = false
        if (state.name.length === 0) {
            result = {...result, invalidName: WARNING_REQUIRED}
            hasInvalid = true
        }  else {
            result = {...result, invalidName: ''}
        }

        if (state.type.length === 0) {
            result = {...result, invalidType: WARNING_REQUIRED}
            hasInvalid = true
        } else {
            result = {...result, invalidType: ''}
        }

        if (state.ownerShip.length === 0) {
            result = {...result, invalidOwnership: WARNING_REQUIRED}
            hasInvalid = true
        } else {
            result = {...result, invalidOwnership: ''}
        }

        if (state.ownerShip === EleosAssetOwnerShipType.separate && !state.owner) {
            result = {...result, invalidOwner: WARNING_REQUIRED}
            hasInvalid = true
        } else {    
            result = {...result, invalidOwner: ''}
        }

       return {...result, valid: !hasInvalid}
    }
    // const vs = EleosPropertyTypeContainer.valuesWithLabels('')
    // console.log('vs:', vs)
    return (
        <div>
             <EleosButton
                type='add'
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
                            width: '600px', // Set the width of the dialog
                            height: 'auto', // Set the height of the dialog
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }
                    }} >
                <DialogTitle>Add an asset</DialogTitle>
                <DialogContent className='grid grid-cols-12 gap-2 pr-3'>
                    <div className='col-span-7'>
                        <EleosLabel text="Type" invalidMessage={state.invalidType} />
                        <EleosSelect name={NAME_TYPE} options={EPT_HELPER.getlabelValuePairs()}
                                    onChange={(selectedOption) => dispatch({type: NAME_TYPE, value: selectedOption ? selectedOption.value: ''})} 
                                    value={{label: state.type, value: state.type}} />
                        <EleosLabel text="Ownership" invalidMessage={state.invalidOwnership}/>
                        <EleosSelect name={NAME_OWNERSHIP} options={ownerShipTypeLabelValuePairs}
                                    onChange={(selectedOption) => dispatch({type: NAME_OWNERSHIP, value: selectedOption ? selectedOption.value: ''})} 
                                    value={{label: state.ownerShip, value: state.ownerShip}} />
                        {state.ownerShip === EleosAssetOwnerShipType.separate && <>
                            <EleosLabel text="Owner" invalidMessage={state.invalidOwner}/>
                            <EleosSelect name={NAME_OWNER} options={[principal, spouse].map((name) => { return { value: name ? name :  'NA', label: name ? name :  'NA' } })}
                                    onChange={(selectedOption) => dispatch({type: NAME_OWNER, value: selectedOption ? selectedOption.value: ''})} 
                                    value={{label: state.owner??'', value: state.owner??""}} />
                        </>
                        }  
                        <EleosLabel text="Name" invalidMessage={state.invalidName}/>
                        <EleosInputBase
                            value={state.name} 
                            mustHave={true} 
                            name={NAME_NAME} 
                            onTextEntered={(value, vliadCode) => dispatch({type: NAME_NAME, value: value}) } />
                        {state.locationLabel !== '' && 
                        <> 
                            <EleosLabel text={state.locationLabel} />
                            <EleosInputBase
                                value={state.location} 
                                mustHave={false} 
                                name={NAME_LOCATION} 
                                onTextEntered={(value, vliadCode) => dispatch({type: NAME_LOCATION, value: value}) } />
                        </>
                        }
                        <EleosLabel text="Note" />
                        <EleosInputBase
                            value={state.note} 
                            mustHave={false} 
                            name={NAME_NOTE} 
                            onTextEntered={(value, vliadCode) => dispatch({type: NAME_NOTE, value: value}) } />    
                    </div>
                    <div className='col-span-5'>
                        <EleosHelpPane helpTextEnIds={[HelpTextId.EmailUsage]} />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button style={{ backgroundColor: '#F44336', color: 'white' }} onClick={handleClose}>Cancel</Button>
                    <Button 
                        disabled={!state.valid}
                        style={{
                            backgroundColor: state.valid ? '#4CAF50' : '#AAA',
                            color: 'white',
                            marginRight: '4px'
                        }}
                        onClick={handleSave}>Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddAssetDialog
