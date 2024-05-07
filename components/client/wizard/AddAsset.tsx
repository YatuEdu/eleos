import React, { useState } 
                from 'react';
import AddAssetDialog 
                from '@/components/client/functional/dialog/AddAssetDialog';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';
import EleosButton 
                from '../atoms/EleosButton';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import { EleosAssetOwnerShipTypeId, EleosPropertyTypeId, } 
                from '@/lib/client/model/EleosDataTypes';
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';
import EleosEntity 
                from "@/lib/client/model/EleosEntity"
import { Label, Note } from '@mui/icons-material';
import EleosItemTable from '../functional/EleosItemTable';
import HouseIcon from '@mui/icons-material/House';
import AccountBalanceIcon 
                from '@mui/icons-material/AccountBalance'
import AttachMoney from '@mui/icons-material/AttachMoney';
import HealthAndSafety from '@mui/icons-material/HealthAndSafety';
import BeachAccess from '@mui/icons-material/BeachAccess';
import TrendingUp  from '@mui/icons-material/TrendingUp';
import BusinessCenter  from '@mui/icons-material/BusinessCenter';
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck';

const AddAsset: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }
    const {setStep} = useWizard()
    const [showDialog, setShowDialog] = useState(false);
    const [assetList, setAssetList] = useState<EleosEntity[]>(ref.current.assets);

    /**
     * A new asset item is added and we need to save it to Elsoe
     * @param name 
     * @param location 
     * @param note 
     * @param type 
     * @param ownership 
     * @param owner 
     */
    const handleAddAsset = (name: string, location: string, 
                            note: string, type: EleosPropertyTypeId, 
                            ownership: EleosAssetOwnerShipTypeId, owner: string | undefined) => {
        if (!ref || !ref.current || !ref.current.principal)  {
            throw Error('Eleos is not initialized')  
        }
        console.log('AddAsset:', name, 'location=', location, 'note=', note, 'type=', type, 'ownership=', ownership, 'owner=', owner)

        // Attempt to find the owner and add the asset to Eleos
        let ownerFound: EleosPerson|undefined = owner ? ref.current.getPrincipalOrSpouseByName(owner) : undefined
        const asset = new EleosAsset(name, location, note, type, ownership, ownerFound)
        const result = ref.current.addEleosAsset(asset)
        if (result.succeeded) {
            setAssetList([...ref.current.assets])
        } else {
            alert(result.error)
            return
        }
        setShowDialog(false);
    };

    /**
     * Submit the form and goes to the seconds page
     */
    const onPrev = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
       
        const step = ref.current.prevStep()
        step && setStep(step)
    }
       
    const onNext = () => {  
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    } 

    const onDeleteAsset = (index: number) => {
    }

    const getIconByAssetId = (id: EleosPropertyTypeId): {icon: React.JSX.Element, toolTip: string} => {
        return  id === EleosPropertyTypeId.realEstate ? {icon: <HouseIcon />, toolTip: EleosPropertyTypeId.realEstate} : 
                id === EleosPropertyTypeId.cash ? {icon: <AttachMoney />, toolTip: EleosPropertyTypeId.cash} :
                id === EleosPropertyTypeId.lifeInsurance ? {icon:<HealthAndSafety />, toolTip: EleosPropertyTypeId.lifeInsurance } :
                id === EleosPropertyTypeId.bankAccount ? {icon: <AccountBalanceIcon />, toolTip: EleosPropertyTypeId.bankAccount} :
                id === EleosPropertyTypeId.retirement ? {icon: <BeachAccess />, toolTip: EleosPropertyTypeId.retirement} :
                id === EleosPropertyTypeId.business ? {icon: <BusinessCenter />, toolTip: EleosPropertyTypeId.business} :
                id === EleosPropertyTypeId.investment ? {icon: <TrendingUp  />, toolTip: EleosPropertyTypeId.investment} : 
                {icon: <PlaylistAddCheck />, toolTip: EleosPropertyTypeId.other};
    }

    return (
        <>
            <div className="flex items-center space-x-2 ml-3">
                <AddAssetDialog
                    principal={ref.current.principal.display}
                    spouse={ref.current.spouse?.display}
                    buttonText="Add a new asset"
                    onSave={handleAddAsset}
                />
            </div>
            <div className="mt-4 mr-3 ml-3">
                <EleosItemTable
                    rows={ref.current.assets.map((a) => {
                        const icon = getIconByAssetId(a.type.id)
                        return { 
                            Name: a.name, 
                            Type: icon.icon,
                            ToolTip: icon.toolTip, // Fix: Corrected the property name to 'ToolTip'
                            OwnershipType: a.ownership.name, 
                            Location: a.location || '', 
                            Note: a.note || '',
                            Action: <div className='mt-0'><EleosButton type='delete'
                                                            className=' mt-1' 
                                                            text="Delete" onClick={() => onDeleteAsset(0)} /></div>
                        }
                    })}
                    columns={[
                        { label: 'Name', type: 'text' },
                        { label: 'Type', type: 'icon',},
                        { label: 'OwnershipType', type: 'text' },
                        { label: 'Location', type: 'text' },
                        { label: 'Note', type: 'editable' },
                        { label: 'Action', type: 'button' },
                    ]}
                />
            </div>
            <EleosWizardButtonLayout
                leftChild={
                    <EleosButton
                        type='wizard'
                        className="mr-1 mt-2 ml-2"
                        disabled={false}
                        text=" < Back"
                        onClick={onPrev}
                        tipDisable="Enter all the required info and then submit"
                        tipEnabled="Click to save and continue"
                    />
                }
                rightChild={
                    <EleosButton
                        type='wizard'
                        className="mt-2 mr-2"
                        disabled={false}
                        text="Save and Continue >"
                        onClick={onNext}
                        tipDisable="Enter all the required info and then submit"
                        tipEnabled="Click to save and continue"
                    />
                }
            />
        </>
    );
};

export default AddAsset;