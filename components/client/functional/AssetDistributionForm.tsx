import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';
import { EleosAssetOwnerShipType } 
                from '@/lib/client/model/EleosAssetOwnerShipType';
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import React, { useState } 
                from 'react';
import EleosLabel 
                from '../atoms/EleosLabel';
import AddPersonModal 
                from './dialog/AddPersonModal';
import { AssetDistributionTiming, EleosRole } 
                from '@/lib/client/model/EleosDataTypes';
import OtherBenificiary 
                from '@/lib/client/model/OtherBenificiary';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import AssetDistribution 
                from '@/lib/client/model/AssetDistribution';

interface Distribution {
    [key: string]: number; // Maps heir ID to their percentage
}

interface AssetDistributionProps {
    heirs: EleosPerson[];
    asset: EleosAsset;
    timing: AssetDistributionTiming,
    onVlidation: (distribution: AssetDistribution) => void;
}

const AssetDistributionForm: React.FC<AssetDistributionProps> = ({ heirs, asset, timing, onVlidation}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || !ref.current.marritalStatus)  {
        throw Error('Eleos is not initialized')  
    }

    let totalShare = undefined
    if (asset.ownership ===  EleosAssetOwnerShipType.joint) {
        totalShare = timing === AssetDistributionTiming.principalDiceased ? asset.principalPercentage :
                     timing === AssetDistributionTiming.spouseDeceased ? asset.spousePercentage : 100
    } else {
        totalShare = 100
    }
      
    // @ts-ignore
    const basicShare = Math.floor(totalShare / heirs.length);
     // @ts-ignore
    let remainder = totalShare %  heirs.length;
    const [distribution, setDistribution] = useState<Distribution>(() => {
        const initialDistribution: Distribution = {};
        const assetDistribution = new AssetDistribution()
        heirs.forEach(heir => {
            const heirPct = basicShare + (remainder > 0 ? 1 : 0)
            initialDistribution[heir.id] = heirPct
            assetDistribution.addDistribution(heir, heirPct)
            remainder--;
        })
        onVlidation(assetDistribution)
        return initialDistribution;
    })

    const addNewHeir = (person: EleosPerson) => {
        let newHeir = null
        if (person instanceof OtherBenificiary) {
            newHeir = person as OtherBenificiary
        } else {
            throw new Error('Not a hier')
        }
        setDistribution(prev => ({
            ...prev,
            [newHeir.id]: 0
        }))
    }

    const handlePercentageChange = (id: string, value: string) => {
        const percentage = parseInt(value, 10);
        if (!isNaN(percentage) && percentage >= 1 && percentage <= 100) {
            setDistribution(prev => ({
                ...prev,
                [id]: percentage
            }))
            console.log(distribution)
        }
    };

    return (
        <div>
            <EleosLabel text={`Asset distribution for [${asset.name}].  Shares to distribute: ${totalShare}%`} />
            {Object.entries(distribution).map(([key, value]) => (
                <div key={key} className="grid grid-cols-6 gap-0">
                    <div className="col-span-3 text-right mt-2 mr-4">
                        <EleosLabel text= {key} />
                    </div>
                    <div className="col-span-3 flex float-left">
                        <input 
                            className='text-black'
                            type="number"
                            min="1"
                            max="100"
                            value={value}
                            onChange={(e) => handlePercentageChange(key, e.target.value)}
                            onBlur={(e) => handlePercentageChange(key, e.target.value)}
                        />
                         <span className='font-bold text-center mt-2'> %</span>
                    </div>
                </div>
            ))}
            <div className="grid grid-cols-6 gap-0">
                <div className="col-span-3 text-right mt-2 mr-4">
                    <AddPersonModal
                        buttonText={'Add a new heir'}
                        role={EleosRole.other_benificiary}
                        existingPeople={ref.current.findPeopleByRole(EleosRole.other_benificiary)}
                        needDob={true} 
                        onSave={addNewHeir} />
                    </div>
            </div>
        </div>
    );
};

export default AssetDistributionForm
