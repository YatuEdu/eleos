import React, { useState } 
                from 'react';
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import Eleos from '@/lib/client/model/Eleos';
import { EleosAssetType } from '@/lib/client/model/EleosAssetType';
import EleosPerson from '@/lib/client/model/EleosPerson';
import RadioButtonGroup from '../atoms/EleosRadioGroup';
import { AssetDistributionMethods } from '@/lib/client/model/AssetDistribution';
import AssetDistributionForm from '../functional/AssetDistributionForm';
import { EleosAsset } from '@/lib/client/model/EleosAsset';
import EleosLabel from '../atoms/EleosLabel';

interface AssetDistributionConfig {
    deceased: EleosPerson;
    survived: EleosPerson | null;
    assets: EleosAsset[];
    isCommunityState: boolean;
}

const EleosAssetDistributionUponDeceased: React.FC<AssetDistributionConfig> = ({deceased, survived, assets,isCommunityState}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal) {
        throw Error('Eleos is not initialized for this page')  
    }
    if (!assets.length) {
        throw Error('No asset is found')
    }
    const {setStep} = useWizard()
    const [valid, setValid] = useState(true)
    const [distribution, setDistribution] = useState<string>('');
    const [heirs, setHeirs] = useState<EleosPerson[]>(ref.current.children)
    const [showAddHeirs, setShowAddHeirs] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>(100);
    const [assetDistributionMethods, setAssetDistributionMethods] = useState<string>('');
    const isCommunityProperty = ref.current.principal.residenceState.isCommSate
    let title = survived ? `If ${deceased.display} is deseased and is survived by ${survived.display}, how is ${deceased.display}'s portion of the family assets distributed?` :
        `If ${deceased.display} is deseased, how is ${deceased.display}'s portion of the family assets distributed?`


    const handleDistributionNethodChange = (value: string) => {
        setAssetDistributionMethods(value)
        setShowAddHeirs(value === AssetDistributionMethods.amongOtherHeirs);
    }

    const addHeir = () => {
        alert('add heir: tbd')
    }
   
    const distributionOptions = [
        { label: `All to ${ref.current.principal.display}`, value: AssetDistributionMethods.allToSpouse },
        { label: 'Among other heirs', value: AssetDistributionMethods.amongOtherHeirs }
    ]

     /**
     * Submit the form and goes to the seconds page
     */
     const onPrev = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
        // go back to the previous step
        const step = ref.current.prevStep()
        setStep(step)
    }
       
    const onNext = () => {  
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

         // move to the next step
         const step = ref.current.nextStep()
         setStep(step)
    }

    return (
        <div>
            <h2>{title}</h2>
            {survived !== null && (
            <div style={{ margin: 20 }}>
                <RadioButtonGroup
                    title=''
                    options={distributionOptions}
                    value={assetDistributionMethods}
                    onChange={handleDistributionNethodChange}
                    direction='column'
                />
            </div>)
            }

            {showAddHeirs && (
                <div>
                    <EleosLabel text='Select heirs to add:' />
                    {heirs.length > 0 && assets.length > 0 && (
                        <div>
                            {assets.map((asset, index) => (
                            <AssetDistributionForm
                                key={index}
                                heirs={heirs}
                                asset={asset}
                                onBlur={(distribution) => console.log('distribution:', distribution)}
                            />
                            ))}
                        </div>
                    )}
                       
                    {percentage < 100 &&  (
                        <button onClick={() => addHeir()}>
                            + new person as hari
                        </button>
                    )}
                  
                </div>
            )}
       
         <EleosWizardButtonLayout leftChild={
            <EleosButton
                type='wizard'
                className="mt-2"
                disabled={false}
                text=" < Back" 
                onClick={onPrev}
                tipDisable="Enter all the required info and then submit" 
                tipEnabled="Click to save and continue" />
        } rightChild={
            <EleosButton
                type='wizard'
                className="mt-2"
                disabled={!valid}
                text="Save and Continue >" 
                onClick={onNext}
                tipDisable="Enter all the required info and then submit" 
                tipEnabled="Click to save and continue" />
        } />
         </div>
    );
};

export default EleosAssetDistributionUponDeceased
