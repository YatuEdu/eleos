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
import OtherBenificiary 
                from '@/lib/client/model/OtherBenificiary';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import AssetDistribution, {AssetDistributionTiming}
                from '@/lib/client/model/AssetDistribution';
import EleosRole, { EleosRoleId } from '@/lib/client/model/EleosRole';
import { green } from '@mui/material/colors';

interface Distribution {
    [key: string]: number; // Maps heir ID to their percentage
}

interface AssetDistributionProps {
    heirs: EleosRole[];
    asset: EleosAsset;
    timing: AssetDistributionTiming,
    onVlidation: (distribution: AssetDistribution) => void;
}

const AssetDistributionForm: React.FC<AssetDistributionProps> = ({ heirs, asset, timing, onVlidation}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || !ref.current.marritalStatus)  {
        throw Error('Eleos is not initialized')  
    }

    let totalShare = asset.totalShareForTiming(timing)
    const [distributionSum, setDistributionSum] = useState<number|undefined>(totalShare)

      
    // @ts-ignore
    const basicShare = Math.floor(totalShare / heirs.length);
     // @ts-ignore
    let remainder = totalShare %  heirs.length;
    const [distribution, setDistribution] = useState<Distribution>(() => {
        const initialDistribution: Distribution = {};
        let assetDistribution: AssetDistribution | undefined = asset.getDistributionForTiming(timing)
        if (!assetDistribution) {
            assetDistribution = new AssetDistribution()
            heirs.forEach(heir => {
                const heirPct = basicShare + (remainder > 0 ? 1 : 0)
                initialDistribution[heir.display] = heirPct
                // @ts-ignore
                assetDistribution.addDistribution(heir.display, heirPct)
                remainder--;
            })
        } else {
            Array.from(assetDistribution.distributionsList).forEach(([key, value]) => {
                initialDistribution[key] = value
            })
        }
        onVlidation(assetDistribution)
        return initialDistribution;
    })
    

    const addNewHeir = (person: EleosRole) => {
        let newHeir = null
        if (person instanceof OtherBenificiary) {
            newHeir = person as OtherBenificiary
        } else {
            throw new Error('Not a hier')
        }
        setDistribution(prev => {
            const dist = {...prev, [newHeir.display]: 0}
            return dist
        })
    }

    const handlePercentageChange = (id: string, value: string) => {
        const percentage = parseInt(value, 10);
        if (!isNaN(percentage) && percentage >= 1 && percentage <= 100) {
            setDistribution(prev => {
                const dist = {...prev, [id]: percentage}
                setDistributionSum(Object.values(dist).reduce((acc, dist) => acc + dist, 0))
                return dist
            })
        }
    }

    return (
        <div>
            <EleosLabel text={`Asset distribution for [${asset.name}].  Shares to distribute: ${totalShare}%. `} />
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
                    <EleosLabel text="Total sum" />
                </div>
                <div className="col-span-3 flex float-left">
                    <span style={{ color: distributionSum === totalShare ? 'green' : 'red', padding: '8px' }}>
                        {distributionSum}
                    </span>
                </div>
            </div>
    
            <div className="grid grid-cols-6 gap-0">
                <div className="col-span-3 text-right mt-2 mr-4">
                    <AddPersonModal
                        buttonText={'Add a new heir'}
                        role={EleosRoleId.other_benificiary}
                        existingPeople={ref.current.findPeopleByRole(EleosRoleId.other_benificiary).map(r => r.person)}
                        needDob={true} 
                        onSave={addNewHeir} />
                    </div>
            </div>
        </div>
    );
};

export default AssetDistributionForm
