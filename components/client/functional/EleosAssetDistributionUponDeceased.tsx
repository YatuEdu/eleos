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
import AssetDistribution, { AssetDistributionMethod, AssetDistributionTiming } 
                from '@/lib/client/model/AssetDistribution';
import AssetDistributionForm 
                from '../functional/AssetDistributionForm';
import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';
import { undefined } from 'zod';
import EleosRole from '@/lib/client/model/EleosRole';

interface AssetDistributionConfig {
    deceased: EleosRole | null;
    survived: EleosRole | null;
    assets: EleosAsset[];
    isCommunityState: boolean;
}

interface Distribution {
    [key: string]: AssetDistribution; // Maps heir ID to their percentage
}

const EleosAssetDistributionUponDeceased: React.FC<AssetDistributionConfig> = ({deceased, survived, assets, isCommunityState}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal) {
        throw Error('Eleos is not initialized for this page')  
    }
    if (!assets.length) {
        throw Error('No asset is found')
    }
    const {setStep} = useWizard()
   
    
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

    //const [distribution, setDistribution] = useState<string>('');
    const [heirs, setHeirs] = useState<EleosRole[]>(!survived ? ref.current.children : [...ref.current.children, survived])
    const [showAddHeirs, setShowAddHeirs] = useState<boolean>(survived === null || ref.current.getAssetDistributionMethod(timing) === AssetDistributionMethod.amongOtherHeirs);
    const [assetDistributionMethod, setAssetDistributionMethod] = useState(ref.current.getAssetDistributionMethod(timing) ?? AssetDistributionMethod.allToSpouse);
    const isValid = assetDistributionMethod === AssetDistributionMethod.allToSpouse || false;
    const [valid, setValid] = useState(isValid);
    const [distribution, setDistribution] = useState<Distribution>({})

    const getAssetByName = (name: string) => {
        return assets.find(a => a.name === name)
    }

    const setAssetDistribution = (asset: EleosAsset, dist: AssetDistribution) => {
        const newDist =  {...distribution, [asset.name]: dist}
        setDistribution(newDist)
        // check if the total percentage doe each asset is correct
        const inbalance = Object.entries(newDist).find(entry => {
            const asset = getAssetByName(entry[0])
            if (!asset) {
                throw Error(`Asset '${entry[0]} 'not found`)
            }
            console.log('asset total share for this timing', asset.totalShareForTiming(timing), entry[1].totalPercentage)
            return asset.totalShareForTiming(timing) !== entry[1].totalPercentage
        })
        console.log('inbalance', inbalance)
        setValid(!inbalance)
   }

    

    const handleDistributionMethodChange = (value: string) => {
        if (!ref || !ref.current || !ref.current.principal) {
            throw Error('Eleos is not initialized for this page')  
        }
        setAssetDistributionMethod(value as AssetDistributionMethod)
        setShowAddHeirs(value === AssetDistributionMethod.amongOtherHeirs);
        ref.current.setAssetDistributionMethod(timing, value as AssetDistributionMethod)
    }
   
    const distributionOptions = [
        { label: `All to ${survived?.display}`, value: AssetDistributionMethod.allToSpouse },
        { label: 'Among other heirs', value: AssetDistributionMethod.amongOtherHeirs }
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
            const asset = getAssetByName(entry[0])
            if (!asset) {
                throw Error(`Asset '${entry[0]} 'not found`)
            }
            if (entry[1].totalPercentage !== asset.totalShareForTiming(timing)) {
                throw Error(`Invalid distribution for asset '${entry[0]}': total percentage is not correct`)
            }
            asset.distribut(timing, entry[1])
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
                    value={assetDistributionMethod}
                    onChange={handleDistributionMethodChange}
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
