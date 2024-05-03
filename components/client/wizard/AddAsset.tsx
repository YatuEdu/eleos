import React, { useState } 
                from 'react';
import AddAssetDialog 
                from '@/components/client/functional/dialog/AddAssetDialog';
import EleosLabel 
                from '../atoms/EleosLabel';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';
import EleosButton 
                from '../atoms/EleosButton';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import EleosNamesList 
                from '../functional/EleosNameList';
import { EleosOwnershipType, EleosPropertyType } from '@/lib/client/model/EleosDataTypes';
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';
import EleosEntity 
                from "@/lib/client/model/EleosEntity"

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
                            note: string, type: EleosPropertyType, 
                            ownership: EleosOwnershipType, owner: string | undefined) => {
        if (!ref || !ref.current || !ref.current.principal)  {
            throw Error('Eleos is not initialized')  
        }
     
        console.log('AddAsset:', name, 'location=', location, 'note=', note, 'type=', type, 'ownership=', ownership, 'owner=', owner)

        // Attempt to find the owner and add the asset to Eleos
        let ownerFound: EleosPerson|undefined = owner ? ref.current.getPrincipalOrSpouseByName(owner) : undefined
        const asset = new EleosAsset(name, location, note, type, ownership, ownerFound)
        const result = ref.current.addEleosAsset(asset)
        if (result.succeeded) {
            setAssetList(prevAssetList => {
                // for some reason it is called twice, so do not add if repetative item found
                if (prevAssetList.find(a => a.id === asset.id)) {
                    return prevAssetList
                }
                return [...prevAssetList, asset]
            })
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

    return (<>
        <div className="flex items-center space-x-2">
           <EleosLabel text='Add asset' />
           <AddAssetDialog  principal={ref.current.principal.display} 
                            spouse={ref.current.spouse?.display} 
                            buttonText="Add a new asset" 
                            onSave={handleAddAsset} />
        </div>
        <div className="mt-4">
            <EleosNamesList entities={assetList} onDelete={onDeleteAsset} />
        </div>
         <EleosWizardButtonLayout leftChild={
            <EleosButton
                 className="mr-1 mt-2"
                 disabled={false}
                 text=" < Back" 
                 onClick={onPrev}
                 tipDisable="Enter all the required info and then submit" 
                 tipEnabled="Click to save and continue" />
        } rightChild={
            <EleosButton
                className="mt-2"
                disabled={false}
                text="Save and Continue >" 
                onClick={onNext}
                tipDisable="Enter all the required info and then submit" 
                tipEnabled="Click to save and continue" />
        } />
    </>
    )
};

export default AddAsset;