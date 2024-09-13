import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';
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
import EleosPerson from '@/lib/client/model/EleosPerson';
import EleosTitle from '../atoms/EleosTitle';

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
    const [addedHeirs, setAddedHeirs] = useState<OtherBenificiary[]>([])
      
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
    
    function createAssetDistribution(currentDistribution: Distribution) {
        const assetDistribution = new AssetDistribution()
        Object.entries(currentDistribution).forEach(([key, value]) => {
            assetDistribution.addDistribution(key, value)
        })
        onVlidation(assetDistribution)
        return assetDistribution
    }

    const addNewHeir = (person: EleosPerson) => {
        if (!ref || !ref.current || !ref.current.principal || !ref.current.marritalStatus)  {
            throw Error('Eleos is not initialized')  
        }

        if (person.hasRole(EleosRoleId.other_benificiary)) {
            if (addedHeirs.find(heir => heir.display === person.display) !== undefined) {
                alert('This heir already exists')
                return;
            }

            const newRole = person.getRole(EleosRoleId.other_benificiary) as OtherBenificiary
            ref.current.addOtherBenificiaries([newRole])
            setAddedHeirs([...addedHeirs, newRole])
        } else {
            throw new Error('Not a valid benificiary')
        }

        setDistribution(prev => {
            const dist = {...prev, [person.display]: 0}
            createAssetDistribution(dist)
            return dist
        })
    }

    /**
     * Potiantial heirs that can be added, who are people that qualify to be added as heirs and have not been added yet
     * 
     * @returns 
     */
    const addPotentialHeir = (): EleosPerson[] => {
        if (!ref || !ref.current || !ref.current.principal || !ref.current.marritalStatus)  {
            throw Error('Eleos is not initialized')  
        }
       return ref.current.potentialHeirs
                        //.filter(heir => !addedHeirs.find(added => added.display === heir.display))
                        .filter(heir => !Object.keys(distribution).includes(heir.display))
    }

    const handlePercentageChange = (id: string, value: string) => {
        const percentage = parseInt(value, 10);

        if (!isNaN(percentage) && percentage >= 1 && percentage <= 100) {
            console.log('id:pct', id, percentage)
            setDistribution(prev => {
                const dist = {...prev, [id]: percentage}
                setDistributionSum(Object.values(dist).reduce((acc, dist) => acc + dist, 0))
                createAssetDistribution(dist)
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
                        existingPeople={addPotentialHeir()}
                        onSave={addNewHeir} />
                    </div>
            </div>
        </div>
    )
}

export default AssetDistributionForm
