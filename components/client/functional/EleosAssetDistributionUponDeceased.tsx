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

import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import RadioButtonGroup 
                from '../atoms/EleosRadioGroup';
import AssetDistribution, { AssetDistributionMethods } 
                from '@/lib/client/model/AssetDistribution';
import AssetDistributionForm 
                from '../functional/AssetDistributionForm';
import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';
import EleosLabel 
                from '../atoms/EleosLabel';
import { AssetDistributionTiming } from '@/lib/client/model/EleosDataTypes';
import { undefined } from 'zod';

interface AssetDistributionConfig {
    deceased: EleosPerson | null;
    survived: EleosPerson | null;
    assets: EleosAsset[];
    isCommunityState: boolean;
}

interface Distribution {
    [key: string]: AssetDistribution; // Maps heir ID to their percentage
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
    //const [distribution, setDistribution] = useState<string>('');
    const [heirs, setHeirs] = useState<EleosPerson[]>(!survived ? ref.current.children : [...ref.current.children, survived])
    const [showAddHeirs, setShowAddHeirs] = useState<boolean>(survived === null);
    const [percentage, setPercentage] = useState<number>(100);
    const [assetDistributionMethods, setAssetDistributionMethods] = useState<string>('');
    const [assetDistributionMap, setAssetDistributionMap] = useState(assets.map((a) => ({ key: a.name, value: undefined })))
    const [distribution, setDistribution] = useState<Distribution>({})
    const isCommunityProperty = ref.current.principal.residenceState.isCommSate;
    const assetFinalDistributions = assets.map((a) => ({ key: a.name, value: undefined }));

    // if deceased is null, it means both are deceased
    // if survived is null, it means the deceased is unmarried
    let title = null;
    let timing: AssetDistributionTiming = AssetDistributionTiming.bothDecesed;
    if (deceased === null) {
        title = `Asset Distribution plan if ${ref.current.they} both are deceased`
    } else if (survived) {
        if (deceased === ref.current.principal) {
            timing = AssetDistributionTiming.principalDiceased
        } else {
            timing = AssetDistributionTiming.spouseDeceased
        }
        title = `If ${deceased.display} is deseased and is survived by ${survived.display}, how is ${deceased.display}'s portion of the family assets distributed?`
    } else {
        title = `If ${deceased.display} is deseased, how is ${deceased.display}'s portion of the family assets distributed?`
    }

    const setAssetDistribution = (asset: EleosAsset, dist: AssetDistribution) => {
        setDistribution({...distribution, [asset.name]: dist})
    }

    const handleDistributionNethodChange = (value: string) => {
        setAssetDistributionMethods(value)
        setShowAddHeirs(value === AssetDistributionMethods.amongOtherHeirs);
    }

    const addHeir = () => {
        alert('add heir: tbd')
    }
   
    const distributionOptions = [
        { label: `All to ${survived?.display}`, value: AssetDistributionMethods.allToSpouse },
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

        // set asset distribution for each asset
        for (const entry of Object.entries(distribution)) {
            if (entry[1].totalPercentage() !== 100) {
                alert('not 100 pct')
                return
            }
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
                    {heirs.length > 0 && assets.length > 0 && (
                        <div>
                            {assets.map((asset, index) => (
                            <AssetDistributionForm
                                key={index}
                                heirs={heirs}
                                asset={asset}
                                timing={timing}
                                onVlidation={(distribution) => setAssetDistribution(asset, distribution)}
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
