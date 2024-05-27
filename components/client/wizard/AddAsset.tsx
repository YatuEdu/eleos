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
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';
import EleosEntity 
                from "@/lib/client/model/EleosEntity"
import EleosItemTable 
                from '../functional/EleosItemTable';
import { EleosPropertyTypIconAndToolTip, EleosAssetType} 
                from '@/lib/client/model/EleosAssetType';
import HouseIcon 
                from '@mui/icons-material/House';
import AccountBalanceIcon 
                from '@mui/icons-material/AccountBalance'
import AttachMoney 
                from '@mui/icons-material/AttachMoney';
import HealthAndSafety 
                from '@mui/icons-material/HealthAndSafety';
import BeachAccess 
                from '@mui/icons-material/BeachAccess';
import TrendingUp  
                from '@mui/icons-material/TrendingUp';
import BusinessCenter  
                from '@mui/icons-material/BusinessCenter';
import PlaylistAddCheck 
                from '@mui/icons-material/PlaylistAddCheck';
import DirectionsCar 
                from '@mui/icons-material/DirectionsCar';
import EleosLabel 
                from '../atoms/EleosLabel';
import { StaticStypes } 
                from '@/lib/client/styles/globalStyles';
import { EleosAssetOwnerShipType } 
                from '@/lib/client/model/EleosAssetOwnerShipType';
import EleosRole 
                from '@/lib/client/model/EleosRole';
import RadioButtonGroup 
                from '../atoms/EleosRadioGroup';
import { EleosAssetDistributionGrandScheme } from '@/lib/client/model/EleosDataTypes';

const AddAsset: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }
    const RADIO_GROUP_TITLE = 'Asset Distribution Scheme'
    const options = ref.current.helpText.getEnumLables(EleosAssetDistributionGrandScheme, 'EleosAssetDistributionGrandScheme')

    const {setStep} = useWizard()
    const [showDialog, setShowDialog] = useState(false);
    const [assetList, setAssetList] = useState<EleosEntity[]>(ref.current.assets);
    const [assetDistributionGrandScheme, setAssetDistributionGrandScheme] = useState(ref.current.assetDistributionGrandScheme)
    const [valid, setValid] = useState(ref.current.assets.length > 0 || ref.current.assetDistributionGrandScheme === EleosAssetDistributionGrandScheme.simple)

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
                            note: string, type: EleosAssetType, 
                            ownership: EleosAssetOwnerShipType, 
                            principalPercentage?: number,
                            owner?: string | undefined) => {
        if (!ref || !ref.current || !ref.current.principal)  {
            throw Error('Eleos is not initialized')  
        }
    
        // Attempt to find the owner and add the asset to Eleos
        let ownerFound: EleosRole | undefined = owner ? ref.current.getPrincipalOrSpouseByName(owner) : undefined
        const asset = new EleosAsset(name, location, note, type, ownership, principalPercentage, ownerFound?.display)
        const result = ref.current.addEleosAsset(asset)
        if (result.succeeded) {
            setAssetList([...ref.current.assets])
        } else {
            alert(result.error)
            return
        }
        setShowDialog(false);
    }

    const onAssetDistributionGrandSchemeChange = (value: string) => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
        console.log('onAssetDistributionGrandSchemeChange:', value)
        setAssetDistributionGrandScheme(+value as EleosAssetDistributionGrandScheme)
        ref.current.assetDistributionGrandScheme = +value as EleosAssetDistributionGrandScheme
        setValid(assetList.length > 0 || +value === EleosAssetDistributionGrandScheme.simple)
    }

    const getAssetDistributionGrandSchemeText = (): string => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
        if (!assetDistributionGrandScheme) {
            return ''
        }
    
        return options[assetDistributionGrandScheme].value
    }
        
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

    const onUpdateAsset = (name: string) => {
        console.log('onDeleteAsset:', name)
    }

    const getIconByAssetType = (type: EleosAssetType): EleosPropertyTypIconAndToolTip => {
        // Add a return statement at the end of the function
        switch (type) {
            case EleosAssetType.realEstate:
                return {icon: <HouseIcon style={StaticStypes.TABLE_BK_COLOR} />, toolTip: EleosAssetType.realEstate}

            case EleosAssetType.bankAccount:
                return {icon: <AccountBalanceIcon style={StaticStypes.TABLE_BK_COLOR} />, toolTip: EleosAssetType.bankAccount}

            case EleosAssetType.investment:
                return {icon: <TrendingUp style={StaticStypes.TABLE_BK_COLOR}/>, toolTip: EleosAssetType.investment}

            case EleosAssetType.retirement:
                return {icon: <BeachAccess style={StaticStypes.TABLE_BK_COLOR}/>, toolTip: EleosAssetType.retirement}

            case EleosAssetType.lifeInsurance:
                return {icon:<HealthAndSafety style={StaticStypes.TABLE_BK_COLOR}/>, toolTip: EleosAssetType.lifeInsurance}

            case EleosAssetType.business:
                return {icon: <BusinessCenter style={StaticStypes.TABLE_BK_COLOR}/>, toolTip: EleosAssetType.business}

            case EleosAssetType.cash:
                return {icon: <AttachMoney style={StaticStypes.TABLE_BK_COLOR} />, toolTip: EleosAssetType.cash}

            case EleosAssetType.vehicles:
                return {icon: <DirectionsCar style={StaticStypes.TABLE_BK_COLOR} />, toolTip: EleosAssetType.vehicles}

            default:
                return {icon: <PlaylistAddCheck style={{ color: '#FFD700' }}/>, toolTip: EleosAssetType.other}
        }
    }


    return (
        <>
            <div style={{ margin: 20 }}>
                <RadioButtonGroup
                    title={RADIO_GROUP_TITLE}
                    options={options}
                    disabledOptions={[]}
                    value={assetDistributionGrandScheme+''}
                    onChange={onAssetDistributionGrandSchemeChange}
                    direction='row'
                />
            </div>
            {assetDistributionGrandScheme === EleosAssetDistributionGrandScheme.complex &&
                <div className="flex items-center space-x-2 ml-3">
                    <AddAssetDialog
                        principal={ref.current.principal.display}
                        spouse={ref.current.spouse?.display}
                        buttonText="Add a new asset"
                        onSave={handleAddAsset}
                    />
                </div>
            }
            {assetList.length > 0 && 
             <div className="mt-4 mr-3 ml-3 mb-2">
                <EleosLabel classNames='mb-2 mt-0'  text={`${ref.current.possessivePronouns} Assets`} />
                <EleosItemTable
                    rows={ref.current.assets.map((a) => {
                        const icon = getIconByAssetType(a.type)
                        return { 
                            Name: a.name, 
                            Type: icon.icon,
                            ToolTip: icon.toolTip,
                            OwnershipType: a.ownership, 
                            Location: a.location || '', 
                            Note: a.note || '',
                            Action: <div className='mt-0'>
                                        <EleosButton type='delete'
                                                    className=' mt-1' 
                                                    text="update" onClick={() => onUpdateAsset(a.name)} /></div>
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
            </div> }
            <EleosWizardButtonLayout
                leftChild={
                    <EleosButton
                        type='wizard'
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
                        disabled={!valid}
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